// middleware.ts
import { NextRequest, NextResponse } from "next/server";

//  Set this to your actual Better Auth session cookie name
const SESSION_COOKIE_NAME = "better-auth.session_token"; // <-- change if needed

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/signin");

  // Read cookie directly (Edge-safe)
  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

  // If not logged in and hitting a protected route, redirect to /signin (keep query)
  if (!hasSession && isDashboard) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.search = search; // preserve ?next or any qs
    return NextResponse.redirect(url);
  }

  // If already logged in and visiting /signin, send to /dashboard
  if (hasSession && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Exclude static assets, API routes, favicon, and Next internals
export const config = {
  matcher: [
    // everything except:
    // - _next (assets)
    // - static files with extensions
    // - api routes (avoid interfering with auth handlers)
    // - favicon and robots
    "/((?!_next/|.*\\..*|api/|favicon.ico|robots.txt).*)",
  ],
};
