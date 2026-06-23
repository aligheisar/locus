import { err, ok } from "@/utils/error";

import { db } from "@/server/db";
import type { AccountRepository } from "@/server/repositories/account.repository";
import type { AuthRepository } from "@/server/repositories/auth.repository";
import type { ProfileRepository } from "@/server/repositories/profile.repository";
import type { UserRepository } from "@/server/repositories/user.repository";
import type { PasswordService } from "@/server/services/password.service";
import type { SessionService } from "@/server/services/session.service";

import type { LoginFormType } from "@/shared/schemas/login-form";
import type { RequestMetaType } from "@/shared/schemas/request-meta";
import type { SignupFormType } from "@/shared/schemas/signup-form";

class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private accountRepo: AccountRepository,
    private profileRepo: ProfileRepository,
    private userRepo: UserRepository,
    private sessionService: SessionService,
    private passwordService: PasswordService,
  ) {}

  async signup(user: SignupFormType, meta: RequestMetaType) {
    try {
      return await db.transaction(async (tx) => {
        const [{ userId }] = await this.userRepo.create(user.email, tx);
        const hashedPassword = await this.passwordService.hash(user.password);
        await this.profileRepo.create(user.username, userId, tx);
        await this.accountRepo.create(hashedPassword, userId, tx);
        const [error, session] = await this.sessionService.create(
          userId,
          meta,
          tx,
        );

        if (error) {
          return tx.rollback();
        }

        return ok(session);
      });
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async login(inputUser: LoginFormType, meta: RequestMetaType) {
    try {
      return await db.transaction(async (tx) => {
        const user = await this.authRepo.findUserByIdentity(
          inputUser.emailOrUsername,
          tx,
        );
        if (!user?.password) return err({ reason: "USER_NOT_EXIST" });

        const isValid = await this.passwordService.verify(
          user.password,
          inputUser.password,
        );
        if (!isValid) return err({ reason: "INVALID_CREDENTIALS" });

        const [error, session] = await this.sessionService.create(
          user.id,
          meta,
          tx,
        );

        if (error) {
          return tx.rollback();
        }

        return ok(session);
      });
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async logout(rawSession: string) {
    const [error, session] = await this.sessionService.verify(rawSession);

    if (error) {
      const reason = error.reason;
      return err({ reason });
    }

    const [revokeError] = await this.sessionService.revoke(session.sessionId);

    if (revokeError) {
      const reason = revokeError.reason;
      return err({ reason });
    }

    return ok(null);
  }

  async isUsernameExist(username: string) {
    try {
      const result = await this.profileRepo.findByUsername(username);

      if (result.length) return ok(true);
      return ok(false);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async isEmailExist(email: string) {
    try {
      const result = await this.userRepo.findByEmail(email);

      if (result.length) return ok(true);
      return ok(false);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }
}

export { AuthService };
