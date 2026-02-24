import { safeParse } from "valibot";

import { err, ok } from "@/utils/error";

import type { AccountRepository } from "@/server/repositories/account.repository";
import type { AuthRepository } from "@/server/repositories/auth.repository";
import type { ProfileRepository } from "@/server/repositories/profile.repository";
import type { UserRepository } from "@/server/repositories/user.repository";
import type { PasswordService } from "@/server/services/password.service";
import type { SessionService } from "@/server/services/session.service";
import { loginFormSchema } from "@/shared/schemas/login-form";
import { requestMetaSchema } from "@/shared/schemas/request-meta";
import { signupFormSchema } from "@/shared/schemas/signup-form";

class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private accountRepo: AccountRepository,
    private profileRepo: ProfileRepository,
    private userRepo: UserRepository,
    private sessionService: SessionService,
    private passwordService: PasswordService,
  ) {}

  async signup(user: unknown, meta: unknown) {
    const validateUser = safeParse(signupFormSchema, user);
    if (!validateUser.success) return err({ reason: "INVALID_INPUT" });
    const validatedUser = validateUser.output;

    const validateMeta = safeParse(requestMetaSchema, meta);
    if (!validateMeta.success) return err({ reason: "INVALID_INPUT" });
    const validatedMeta = validateMeta.output;

    try {
      const [{ userId }] = await this.userRepo.create(validatedUser.email);
      const hashedPassword = await this.passwordService.hash(
        validatedUser.password,
      );
      await this.profileRepo.create(validatedUser.username, userId);
      await this.accountRepo.create(hashedPassword, userId);
      const session = await this.sessionService.create(userId, validatedMeta);

      return ok(session);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async login(inputUser: unknown, meta: unknown) {
    const validateUser = safeParse(loginFormSchema, inputUser);
    if (!validateUser.success) return err({ reason: "INVALID_INPUT" });
    const validatedUser = validateUser.output;

    const validateMeta = safeParse(requestMetaSchema, meta);
    if (!validateMeta.success) return err({ reason: "INVALID_INPUT" });
    const validatedMeta = validateMeta.output;

    try {
      const user = await this.authRepo.findUserByIdentity(
        validatedUser.emailOrUsername,
      );
      if (!user || !user.password) return err({ reason: "USER_NOT_EXIST" });

      const isValid = await this.passwordService.verify(
        user.password,
        validatedUser.password,
      );
      if (!isValid) return err({ reason: "INVALID_CREDENTIALS" });

      const session = await this.sessionService.create(user.id, validatedMeta);

      return ok(session);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async logout(rawSession: string) {
    const session = await this.sessionService.verify(rawSession);
    if (!session) return err({ reason: "INVALID_SESSION" });

    this.sessionService.revoke(session.sessionId);

    return ok(null);
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
