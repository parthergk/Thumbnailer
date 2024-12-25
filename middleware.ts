import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;

  // Redirect authenticated users trying to access auth pages to /dashboard
  if (token && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Config for matching specific paths
export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard"],
};
