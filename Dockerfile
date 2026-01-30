# syntax=docker/dockerfile:1
# Multi-stage build for Next.js application
FROM node:22-alpine AS base

# --- STAGE 1: Install dependencies ---
FROM base AS deps
RUN apk update && apk upgrade && apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on your package.json
COPY package.json package-lock.json* ./
RUN npm i --legacy-peer-deps --ignore-scripts && \
    npm i sharp --legacy-peer-deps

# --- STAGE 2: Build the source code ---
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables needed AT BUILD TIME
ARG NEXT_PUBLIC_TINYMCE_API_URL
ENV NEXT_PUBLIC_TINYMCE_API_URL=$NEXT_PUBLIC_TINYMCE_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client and Build the app
RUN npx prisma generate && npm run build

# --- STAGE 3: Production Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the necessary files from builder
# Next.js standalone output includes everything needed to run the server
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set permissions for the cache
RUN mkdir -p .next/cache && \
    chown -R nextjs:nodejs .next/cache && \
    chmod -R 755 .next/cache

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
CMD ["node", "server.js"]