import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { createSession, verifySession } from "@/lib/session";

import type { SignupFormType } from "@/features/signup/schemas/signup-form";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema/sessions";
import { createAccount } from "@/repositories/account";
import { createProfile } from "@/repositories/profile";
import { createUser } from "@/repositories/user";

const signupUser = async (user: SignupFormType) => {
  const [{ userId }] = await createUser(user.email);
  await createProfile(user.username, userId);
  await createAccount(user.password, userId);
  await createSession(userId);
};

const logoutUser = async (): Promise<
  { success: true } | { success: false; error: string }
> => {
  const session = await verifySession();
  if (!session) return { error: "no-session", success: false };

  await db
    .update(sessionsTable)
    .set({ revokedAt: new Date() })
    .where(eq(sessionsTable.id, session.sessionId));

  const cookieStore = await cookies();
  cookieStore.delete("session");

  return { success: true };
};

export { signupUser, logoutUser };
