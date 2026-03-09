import { prisma } from "@/lib/prisma";
import SignInForm from "../(client)/signin";
import { ReturnPayload } from "@/lib/types";
import SignUpForm from "../(client)/signup";

// check if there is one admin user
async function FindUserAction(): Promise<ReturnPayload> {
  try {
    const [user, total] = await Promise.all([
      prisma.user.findMany(),
      prisma.user.count(),
    ]);
    return {
      success: true,
      message: "Admin user found",
      data: user,
      total: total,
    };
  } catch (error) {
    console.error("[FindUserAction] Database error:", error);
    return {
      success: false,
      message: "Database connection failed",
      data: null,
      total: 0,
    };
  }
}

export default async function SignInPage() {
  // check if there is one admin user
  const { data: user } = await FindUserAction();
  console.log("user---", user);

  // if there is no user return signup page
  if (!user || user.length === 0) {
    return <SignUpForm />;
  }
  // return the signin form
  return <SignInForm />;
}
