import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if the request is for the 'save thumbnail' route (or any other protected API route)
  if (url.pathname.startsWith("/api/thumbnail") && request.method === "POST") {
    const token = await getToken({ req: request });
    
    // If no token (user is not authenticated), return an error response
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized access. Please log in." }),
      { status: 401, headers: { "Content-Type": "application/json" } });  // Redirect to login page
    }
  }

  return NextResponse.next(); // Allow the request to proceed for all other routes
}

// Config for matching specific API paths
export const config = {
  matcher: ["/sign-in", "/sign-up", "/api/thumbnail"],  // Only apply middleware to the '/api/thumbnail' route
};
