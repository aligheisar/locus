import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, verifySession } from "@/lib/session";

import type { LoginFormType } from "@/features/login/schemas/login-form";
import type { SignupFormType } from "@/features/signup/schemas/signup-form";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema/sessions";
import { createAccount } from "@/repositories/account";
import { findUserByIdentity } from "@/repositories/auth";
import { createProfile } from "@/repositories/profile";
import { createUser } from "@/repositories/user";

class AuthService {
  async signup(user: SignupFormType) {
    const [{ userId }] = await createUser(user.email);
    const hashedPassword = await hashPassword(user.password);
    await createProfile(user.username, userId);
    await createAccount(hashedPassword, userId);
    await createSession(userId);
  }

  async login(input: LoginFormType) {
    const user = await findUserByIdentity(input.emailOrUsername);
    if (!user || !user.password) return;

    const isValid = await verifyPassword(user.password, input.password);
    if (!isValid) return;

    await createSession(user.id);
  }

  async logout() {
    const session = await verifySession();
    if (!session) return { error: "no-session", success: false };

    await db
      .update(sessionsTable)
      .set({ revokedAt: new Date() })
      .where(eq(sessionsTable.id, session.sessionId));

    const cookieStore = await cookies();
    cookieStore.delete("session");

    return { success: true };
  }
}

export { AuthService };
