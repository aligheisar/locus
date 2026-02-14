"use server";

import { safeParse } from "valibot";

import { loginFormSchema } from "@/features/login/schemas/login-form";
import { signupFormSchema } from "@/features/signup/schemas/signup-form";

import { AuthService } from "@/services/auth.service";

const signupUserAction = async (user: unknown) => {
  const validatedData = safeParse(signupFormSchema, user);
  if (!validatedData.success) return;

  const authService = new AuthService();
  await authService.signup(validatedData.output);
};

const loginUserAction = async (user: unknown) => {
  const validatedData = safeParse(loginFormSchema, user);
  if (!validatedData.success) return;

  const authService = new AuthService();
  await authService.login(validatedData.output);
};

const logoutUserAction = async () => {
  const authService = new AuthService();
  await authService.logout();
};

export { signupUserAction, logoutUserAction, loginUserAction };
