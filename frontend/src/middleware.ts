import { getSession } from "@/services/Session/Session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = getSession();

  // if (!(await session).token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!register|api|login|api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)",
  ],
};
