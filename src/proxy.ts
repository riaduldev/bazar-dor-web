
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  try {
    // Check the user's session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If user is not logged in
    if (!session) {
      const signInUrl = new URL("/signin", request.url);

      // Save the requested URL for redirect after login
      signInUrl.searchParams.set(
        "callbackURL",
        request.nextUrl.pathname + request.nextUrl.search
      );

      return NextResponse.redirect(signInUrl);
    }

    // User is authenticated
    return NextResponse.next();

  } catch (error) {
    console.error("Authentication Proxy Error:", error);

    // Redirect if session verification fails
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/products/:path*",
  ],
};
