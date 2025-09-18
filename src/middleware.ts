import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("middleware...");

  // access token
  const isLoggedIn = !!req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  console.log("isloggedin: ", isLoggedIn);

  // dashboard route
  const dashboardRoute = pathname.startsWith("/dashboard");
  // auth route
  const authRoute = pathname.startsWith("/signin");

  // if not logged in
  if (!isLoggedIn && dashboardRoute) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/signin";
    return NextResponse.redirect(signInUrl);
  }
  // if already logged in
  if (isLoggedIn && authRoute) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
