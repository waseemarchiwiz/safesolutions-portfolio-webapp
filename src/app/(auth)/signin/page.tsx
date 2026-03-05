import { prisma } from "@/lib/prisma";
import SignInForm from "../(client)/signin";
import { ReturnPayload } from "@/lib/types";
import SignUpForm from "../(client)/signup";

// check if there is one admin user
async function FindUserAction(): Promise<ReturnPayload> {
  try {
    // get the user
    const [user, total] = await Promise.all([
      // get the user
      prisma.user.findMany(),
      // get the user count
      prisma.user.count(),
    ]);
    // if there is no user return
    if (!user) {
      return {
        success: false,
        message: "No admin user found",
        data: null,
        total: 0,
      };
    }
    // return the user
    return {
      success: true,
      message: "Admin user found",
      data: user,
      total: total,
    };
  } catch (error) {
    // return the user
    return {
      success: false,
      message: "No admin user found",
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
