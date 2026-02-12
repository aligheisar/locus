"use server";

import { safeParse } from "valibot";

import {
  type SignupFormType,
  signupFormSchema,
} from "@/features/signup/schemas/signup-form";

import { signupUser } from "@/services/user";

const signupUserAction = async (user: SignupFormType | unknown) => {
  const validatedData = safeParse(signupFormSchema, user);
  if (!validatedData.success) return;

  await signupUser(validatedData.output);
};

export { signupUserAction };
