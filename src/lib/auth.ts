// 4. Updated auth.ts configuration
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/prisma"; // your prisma client

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "postgres"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // set to true if you want email verification
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (session will be updated if it's older than this)
  },
  // Optional: Add trusted origins if running on different ports
  trustedOrigins:
    process.env.NODE_ENV === "development"
      ? ["http://localhost:3000", "http://localhost:3001"]
      : [],
});
