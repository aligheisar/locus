"use server";

import { findUserByUsername } from "@/repositories/profile";

const isUsernameExist = async (username: string) => {
  const result = await findUserByUsername(username);

  if (result.length) return true;
  return false;
};

export { isUsernameExist };
