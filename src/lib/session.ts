import { cache } from "react";
import { cookies, headers } from "next/headers";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";

import { env } from "@/lib/env";

import { addSession } from "@/repositories/session";

const encodedKey = new TextEncoder().encode(env.SESSION_SECRET);

const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (_e) {
    return null;
  }
};

const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const reqHeaders = await headers();
  const userAgent = reqHeaders.get("User-Agent");
  const ipAddress = reqHeaders.get("X-Forwarded-For");

  const [{ sessionId }] = await addSession({
    expiresAt,
    ipAddress,
    userAgent,
    userId,
  });

  const session = await encrypt({ expiresAt, sessionId });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
};

const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  if (!session || !session.sessionId) {
    return null;
  }

  return { sessionId: session.sessionId as string };
});

export { encrypt, decrypt, createSession, verifySession };
