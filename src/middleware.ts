// Middleware Requirements
import { NextResponse, NextRequest } from "next/server";
// Middleware Main Function
export async function middleware(request: NextRequest) {
  const TOKEN = request.cookies.get("JWT");
  const PAGE_NAME = request.nextUrl.pathname;
  if (PAGE_NAME === "/profile" && TOKEN === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (PAGE_NAME === "/login" && TOKEN !== undefined) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}
