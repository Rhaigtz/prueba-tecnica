import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isTokenValid } from "../utils/token";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("front.token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isValid = isTokenValid(token?.value as string);

  console.log(isValid);
  if (!isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/usuarios",
};
