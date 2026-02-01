import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard/provider") && role !== "PROVIDER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (path.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if ((path.startsWith("/cart") || path.startsWith("/checkout")) && role !== "USER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/cart", "/checkout"],
};