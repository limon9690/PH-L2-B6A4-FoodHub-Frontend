import { NextRequest, NextResponse } from "next/server";
import { userService } from "./client-service/user.service";

export async function proxy(request: NextRequest) {
    let isAuthenticated = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
  }

  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};