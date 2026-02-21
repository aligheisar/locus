"use server";

import { cookies, headers } from "next/headers";
import { safeParse } from "valibot";

import { authService } from "@/server/containers/auth.container";
import { loginFormSchema } from "@/shared/schemas/login-form";
import { signupFormSchema } from "@/shared/schemas/signup-form";

const signupUserAction = async (user: unknown) => {
  const validatedData = safeParse(signupFormSchema, user);
  if (!validatedData.success) return;

  const reqHeaders = await headers();
  const meta = {
    ipAddress: reqHeaders.get("X-Forwarded-For")?.split(",")[0].trim() ?? null,
    userAgent: reqHeaders.get("User-Agent"),
  };

  const session = await authService.signup(validatedData.output, meta);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
};

const loginUserAction = async (user: unknown) => {
  const validatedData = safeParse(loginFormSchema, user);
  if (!validatedData.success) return;

  const reqHeaders = await headers();
  const meta = {
    ipAddress: reqHeaders.get("X-Forwarded-For")?.split(",")[0].trim() ?? null,
    userAgent: reqHeaders.get("User-Agent"),
  };

  const session = await authService.login(validatedData.output, meta);
  if (!session) return;

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
};

const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("session")?.value;

  if (!rawSession) return;

  const result = await authService.logout(rawSession);

  if (result.success) {
    cookieStore.delete("session");
  }
};

const isUsernameExist = async (username: string) => {
  return await authService.isUsernameExist(username);
};

const isEmailExist = async (email: string) => {
  return await authService.isEmailExist(email);
};

export {
  signupUserAction,
  logoutUserAction,
  loginUserAction,
  isUsernameExist,
  isEmailExist,
};
