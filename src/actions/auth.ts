"use server";

import { safeParse } from "valibot";

import { loginFormSchema } from "@/features/login/schemas/login-form";
import { signupFormSchema } from "@/features/signup/schemas/signup-form";

import { authService } from "@/containers/auth.container";

const signupUserAction = async (user: unknown) => {
  const validatedData = safeParse(signupFormSchema, user);
  if (!validatedData.success) return;

  await authService.signup(validatedData.output);
};

const loginUserAction = async (user: unknown) => {
  const validatedData = safeParse(loginFormSchema, user);
  if (!validatedData.success) return;

  await authService.login(validatedData.output);
};

const logoutUserAction = async () => {
  await authService.logout();
};

const isUsernameExist = async (username: string) => {
  return await authService.isUsernameExist(username);
};

export { signupUserAction, logoutUserAction, loginUserAction, isUsernameExist };
