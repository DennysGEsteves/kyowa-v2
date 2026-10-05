import { canAccessAdminPath } from "./routes/definitions";
import { AUTH_TOKEN_COOKIE_NAME } from "@/utils/auth/auth-token";
import { getPermissionFromToken } from "@/utils/auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DASHBOARD_HREF = "/admin/dashboard";

function getTokenFromRequest(request: NextRequest): string | null {
  const raw = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromRequest(request);

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const permission = getPermissionFromToken(token);
    if (!permission) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(AUTH_TOKEN_COOKIE_NAME);
      return response;
    }

    if (!canAccessAdminPath(permission, pathname)) {
      return NextResponse.redirect(new URL(DASHBOARD_HREF, request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/login" && token) {
    const permission = getPermissionFromToken(token);
    if (permission) {
      return NextResponse.redirect(new URL(DASHBOARD_HREF, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
