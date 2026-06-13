"use server";

import { cookies, headers } from "next/headers";

import { err, ok } from "@/utils/error";

import { authService } from "@/server/containers/auth.container";

const signupUserAction = async (user: unknown) => {
  const reqHeaders = await headers();
  const meta = {
    ipAddress: reqHeaders.get("X-Forwarded-For")?.split(",")[0].trim() ?? null,
    userAgent: reqHeaders.get("User-Agent"),
  };

  const [error, session] = await authService.signup(user, meta);

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  });

  return ok(null);
};

const loginUserAction = async (user: unknown) => {
  const reqHeaders = await headers();
  const meta = {
    ipAddress: reqHeaders.get("X-Forwarded-For")?.split(",")[0].trim() ?? null,
    userAgent: reqHeaders.get("User-Agent"),
  };

  const [error, session] = await authService.login(user, meta);

  if (!error) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires: expiresAt,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    return ok(null);
  }

  const reason = error.reason;
  return err({ reason });
};

const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("session")?.value;

  if (!rawSession) return err({ reason: "SESSION_MISSING" });

  const [error] = await authService.logout(rawSession);
  cookieStore.delete("session");

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  return ok(null);
};

const isUsernameExist = async (username: string) => {
  const [error, flag] = await authService.isUsernameExist(username);

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  return ok(flag);
};

const isEmailExist = async (email: string) => {
  const [error, flag] = await authService.isEmailExist(email);

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  return ok(flag);
};

export {
  signupUserAction,
  logoutUserAction,
  loginUserAction,
  isUsernameExist,
  isEmailExist,
};
