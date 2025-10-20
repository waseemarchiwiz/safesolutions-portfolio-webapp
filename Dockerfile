# syntax=docker/dockerfile:1
# Multi-stage build for Next.js application
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk update && apk upgrade && apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm i --legacy-peer-deps --ignore-scripts && \
    npm i sharp --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY next.config.ts postcss.config.mjs tsconfig.json ./
COPY components.json ./
COPY prisma ./prisma
COPY src ./src
COPY public ./public



ENV NEXT_TELEMETRY_DISABLED=1

# Build with secrets mounted securely
RUN --mount=type=secret,id=next_public_tinymce_api_url \
    --mount=type=secret,id=database_url \
    --mount=type=secret,id=better_auth_secret \
    --mount=type=secret,id=mail_from_address \
    --mount=type=secret,id=mail_from_name \
    --mount=type=secret,id=mail_host \
    --mount=type=secret,id=mail_password \
    --mount=type=secret,id=mail_port \
    --mount=type=secret,id=mail_username \
    export NEXT_PUBLIC_TINYMCE_API_URL="$(cat /run/secrets/next_public_tinymce_api_url)" && \
    export DATABASE_URL="$(cat /run/secrets/database_url)" && \
    export BETTER_AUTH_SECRET="$(cat /run/secrets/better_auth_secret)" && \
    export MAIL_FROM_ADDRESS="$(cat /run/secrets/mail_from_address)" && \
    export MAIL_FROM_NAME="$(cat /run/secrets/mail_from_name)" && \
    export MAIL_HOST="$(cat /run/secrets/mail_host)" && \
    export MAIL_PASSWORD="$(cat /run/secrets/mail_password)" && \
    export MAIL_PORT="$(cat /run/secrets/mail_port)" && \
    export MAIL_USERNAME="$(cat /run/secrets/mail_username)" && \
    npx prisma generate && \
    npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets (read-only)
COPY --from=builder --chmod=555 /app/public ./public
COPY --from=builder --chmod=555 /app/.next/standalone ./
COPY --from=builder --chmod=555 /app/.next/static ./.next/static

# Prepare writable .next/cache directory
RUN mkdir -p .next/cache && \
    chown -R nextjs:nodejs .next/cache && \
    chmod -R 755 .next/cache

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]