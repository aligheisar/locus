import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, verifySession } from "@/lib/session";

import type { LoginFormType } from "@/features/login/schemas/login-form";
import type { SignupFormType } from "@/features/signup/schemas/signup-form";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema/sessions";
import type { AccountRepository } from "@/repositories/account.repository";
import type { AuthRepository } from "@/repositories/auth.repository";
import type { ProfileRepository } from "@/repositories/profile.repository";
import type { UserRepository } from "@/repositories/user.repository";

class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private accountRepo: AccountRepository,
    private profileRepo: ProfileRepository,
    private userRepo: UserRepository,
  ) {}

  async signup(user: SignupFormType) {
    const [{ userId }] = await this.userRepo.create(user.email);
    const hashedPassword = await hashPassword(user.password);
    await this.profileRepo.create(user.username, userId);
    await this.accountRepo.create(hashedPassword, userId);
    await createSession(userId);
  }

  async login(input: LoginFormType) {
    const user = await this.authRepo.findUserByIdentity(input.emailOrUsername);
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

  async isUsernameExist(username: string) {
    const result = await this.profileRepo.findByUsername(username);

    if (result.length) return true;
    return false;
  }

  async isEmailExist(email: string) {
    const result = await this.userRepo.findByEmail(email);

    if (result.length) return true;
    return false;
  }
}

export { AuthService };
