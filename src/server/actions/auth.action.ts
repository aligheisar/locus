"use server";

import { cookies, headers } from "next/headers";
import { safeParse } from "valibot";

import { err, ok } from "@/utils/error";

import { authService } from "@/server/containers/auth.container";

import {
  type LoginFormType,
  loginFormSchema,
} from "@/shared/schemas/login-form";
import { requestMetaSchema } from "@/shared/schemas/request-meta";
import {
  type SignupFormType,
  signupFormSchema,
} from "@/shared/schemas/signup-form";

const signupUserAction = async (user: SignupFormType) => {
  const reqHeaders = await headers();

  const meta = {
    ipAddress: reqHeaders.get("X-Forwarded-For")?.split(",")[0].trim() ?? null,
    userAgent: reqHeaders.get("User-Agent"),
  };

  const validateUser = safeParse(signupFormSchema, user);
  const validateMeta = safeParse(requestMetaSchema, meta);

  if (!validateUser.success || !validateMeta.success)
    return err({ reason: "INVALID_INPUT" });

  const validatedUser = validateUser.output;
  const validatedMeta = validateMeta.output;

  const [error, session] = await authService.signup(
    validatedUser,
    validatedMeta,
  );

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

const loginUserAction = async (user: LoginFormType) => {
  const reqHeaders = await headers();
  const meta = {
    ipAddress: reqHeaders.get("X-Forwarded-For")?.split(",")[0].trim() ?? null,
    userAgent: reqHeaders.get("User-Agent"),
  };

  const validateUser = safeParse(loginFormSchema, user);
  const validateMeta = safeParse(requestMetaSchema, meta);

  if (!validateUser.success || !validateMeta.success)
    return err({ reason: "INVALID_INPUT" });

  const validatedUser = validateUser.output;
  const validatedMeta = validateMeta.output;

  const [error, session] = await authService.login(
    validatedUser,
    validatedMeta,
  );

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

const logoutAction = async () => {
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
  isEmailExist,
  isUsernameExist,
  loginUserAction,
  logoutAction,
  signupUserAction,
};
