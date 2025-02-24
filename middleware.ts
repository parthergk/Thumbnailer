import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  if (url.pathname.startsWith("/api/thumbnail") && request.method === "POST") {
    const token = await getToken({ req: request });
    
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized access. Please log in." }),
      { status: 401, headers: { "Content-Type": "application/json" } }); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/api/thumbnail"],
};
