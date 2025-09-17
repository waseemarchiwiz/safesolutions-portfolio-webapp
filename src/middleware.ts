import { NextRequest } from "next/server";
import { useAuth } from "./app/hooks/use-auth";
import { redirect } from "next/navigation";

export function middleware(req: NextRequest) {
  console.log("middleware...");
  // dashboard route
  const dashboardRoute = req.url.startsWith("/dashboard");
  // get the auth
  // const { isLoggedIn } = useAuth();
  // if logged in
  // if (!isLoggedIn && dashboardRoute) {
  //   redirect("/signin");
  // }
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
