import { prisma } from "@/lib/prisma";
import SignInForm from "../(client)/signin";
import SignUpForm from "../(client)/signup";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function hasAdminUser(): Promise<boolean> {
  try {
    return (await prisma.user.count()) > 0;
  } catch (error) {
    console.error("[SignInPage] Database error:", error);
    return true; // fail closed: show signin on error
  }
}

export default async function SignInPage() {
  noStore();
  const adminUser = await hasAdminUser();
  return adminUser ? <SignInForm /> : <SignUpForm />;
}
