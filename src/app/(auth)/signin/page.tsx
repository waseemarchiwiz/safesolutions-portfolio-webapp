import { prisma } from "@/lib/prisma";
import SignInForm from "../(client)/signin";
import SignUpForm from "../(client)/signup";

// check if there is one admin user
async function hasAdminUser(): Promise<boolean> {
  try {
    const user = await prisma.user.count();
    return user > 0;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
}

export default async function SignInPage() {
  // check if there is one admin user
  const adminUser = await hasAdminUser();
  console.log("adminUser---", adminUser);

  // if there is an admin user return signin page
  if (adminUser) {
    return <SignInForm />;
  }
  // if there is no user return signup page
  return <SignUpForm />;
}
