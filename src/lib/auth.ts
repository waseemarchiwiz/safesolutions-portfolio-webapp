// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh every day
    cookie: {
      name: "better-auth.session_token", // must match your cookie
      secure: process.env.NODE_ENV === "production", // false in dev
      sameSite: "lax",
      path: "/",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
});
