"use server";

import { findUserByEmail } from "@/repositories/user";

const isEmailExist = async (email: string) => {
  const result = await findUserByEmail(email);

  if (result.length) return true;
  return false;
};

export { isEmailExist };
