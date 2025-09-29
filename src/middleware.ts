// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  // ✅ Edge-safe session check (cookie presence only)
  const sessionCookie = getSessionCookie(req);

  const { pathname } = req.nextUrl;
  const dashboardRoute = pathname.startsWith("/dashboard");
  const authRoute = pathname.startsWith("/signin");

  // if not logged in
  if (!sessionCookie && dashboardRoute) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/signin";
    return NextResponse.redirect(signInUrl);
  }

  // if already logged in
  if (sessionCookie && authRoute) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
