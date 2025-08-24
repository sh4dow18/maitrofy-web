// Middleware Requirements
import { NextResponse, NextRequest } from "next/server";
import { API } from "./lib/admin";
// Middleware Main Function
export async function middleware(request: NextRequest) {
  const TOKEN = request.cookies.get("JWT");
  const PAGE_NAME = request.nextUrl.pathname;
  // Check if the page is a page that need API or is the error page
  if (
    PAGE_NAME.includes("/games") ||
    PAGE_NAME.includes("/backlog") ||
    PAGE_NAME === "/login" ||
    PAGE_NAME === "/profile" ||
    PAGE_NAME === "/error"
  ) {
    // Check if the API is up
    let apiOk = true;
    const CONTROLLER = new AbortController();
    const TIMEOUT = setTimeout(() => CONTROLLER.abort(), 5000);
    try {
      const RESPONSE = await fetch(`${API}/utils/health`, {
        method: "HEAD",
        signal: CONTROLLER.signal,
      });
      apiOk = RESPONSE.ok;
    }
    catch {
      apiOk = false;
    } finally {
      clearTimeout(TIMEOUT);
    }
    // If api is up and the current page is "Error", redirect to games page
    if (apiOk === true && PAGE_NAME === "/error") {
      return NextResponse.redirect(new URL("/games", request.url));
    }
    // If api is down and the current page is not "Error", redirect to error page
    if (apiOk === false && PAGE_NAME !== "/error") {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }
  // If JWT is undefined
  if (TOKEN === undefined) {
    // If the page is profile page or a backlog page, redirect to login page
    if (PAGE_NAME === "/profile" || PAGE_NAME.startsWith("/backlog") === true) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // If JWT is defined
  else {
    // If it is the login page, redirect to profile
    if (PAGE_NAME === "/login") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}
