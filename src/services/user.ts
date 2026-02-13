import { createSession } from "@/lib/session";

import type { SignupFormType } from "@/features/signup/schemas/signup-form";

import { createAccount } from "@/repositories/account";
import { createProfile } from "@/repositories/profile";
import { createUser } from "@/repositories/user";

const signupUser = async (user: SignupFormType) => {
  const [{ userId }] = await createUser(user.email);
  await createProfile(user.username, userId);
  await createAccount(user.password, userId);
  await createSession(userId);
};

export { signupUser };
