// Middleware Requirements
import { NextResponse, NextRequest } from "next/server";
// Middleware Main Function
export async function middleware(request: NextRequest) {
  const TOKEN = request.cookies.get("JWT");
  const PAGE_NAME = request.nextUrl.pathname;
  if (TOKEN === undefined) {
    if (PAGE_NAME === "/profile" || PAGE_NAME.startsWith("/backlog") === true) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (PAGE_NAME === "/login") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}
