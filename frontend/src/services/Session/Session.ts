import type { User } from "@/types/user";
import { getIronSession } from "iron-session";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import "server-only";

const ttl = 60 * 60 * 8; // 8 hours

export async function getSession() {
  const cookieStore = await cookies();

  return getIronSession<{ token: string }>(cookieStore, {
    password: process.env.NEXT_PUBLIC_JWT_SECRET as string,
    cookieName: "auth",
    ttl,
    cookieOptions: {
      httpOnly: true,
      secure: false, // set this to false in local (non-HTTPS) development
      sameSite: "lax", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax
      maxAge: (ttl === 0 ? 2147483647 : ttl) - 60, // Expire cookie before the session expires.
      path: "/",
    },
  });
}

export async function saveSession(token: string) {
  const session = await getSession();
  session.token = token;
  await session.save();
}

export async function destroySession() {
  const session = await getSession();
  session.destroy();
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();

  if (!session.token) {
    return null;
  }

  const { user } = jwt.decode(session.token) as unknown as { user: User };

  return { ...user, token: session.token };
}
