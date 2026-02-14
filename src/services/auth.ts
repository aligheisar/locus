import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";

import type { LoginFormType } from "@/features/login/schemas/login-form";

import { findUserByIdentity } from "@/repositories/auth";

const loginUser = async (input: LoginFormType) => {
  const user = await findUserByIdentity(input.emailOrUsername);
  if (!user || !user.password) return;
  console.log(user);

  const isValid = await verifyPassword(user.password, input.password);

  if (!isValid) return;

  await createSession(user.id);
};

export { loginUser };
