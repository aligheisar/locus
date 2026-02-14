"use server";

import { safeParse } from "valibot";

import {
  type LoginFormType,
  loginFormSchema,
} from "@/features/login/schemas/login-form";
import {
  type SignupFormType,
  signupFormSchema,
} from "@/features/signup/schemas/signup-form";

import { loginUser } from "@/services/auth";
import { logoutUser, signupUser } from "@/services/user";

const signupUserAction = async (user: SignupFormType | unknown) => {
  const validatedData = safeParse(signupFormSchema, user);
  if (!validatedData.success) return;

  await signupUser(validatedData.output);
};

const loginUserAction = async (user: LoginFormType | unknown) => {
  const validatedData = safeParse(loginFormSchema, user);
  if (!validatedData.success) return;

  await loginUser(validatedData.output);
};

const logoutUserAction = async () => {
  await logoutUser();
};

export { signupUserAction, logoutUserAction, loginUserAction };
