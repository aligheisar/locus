import { hashPassword, verifyPassword } from "@/lib/password";

import type { LoginFormType } from "@/features/login/schemas/login-form";
import type { SignupFormType } from "@/features/signup/schemas/signup-form";

import type { AccountRepository } from "@/repositories/account.repository";
import type { AuthRepository } from "@/repositories/auth.repository";
import type { ProfileRepository } from "@/repositories/profile.repository";
import type { UserRepository } from "@/repositories/user.repository";
import type { SessionService } from "@/services/session.service";

class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private accountRepo: AccountRepository,
    private profileRepo: ProfileRepository,
    private userRepo: UserRepository,
    private sessionService: SessionService,
  ) {}

  async signup(
    user: SignupFormType,
    meta: { userAgent: string | null; ipAddress: string | null },
  ) {
    const [{ userId }] = await this.userRepo.create(user.email);
    const hashedPassword = await hashPassword(user.password);
    await this.profileRepo.create(user.username, userId);
    await this.accountRepo.create(hashedPassword, userId);
    const session = await this.sessionService.create(userId, meta);

    return session;
  }

  async login(
    input: LoginFormType,
    meta: { userAgent: string | null; ipAddress: string | null },
  ) {
    const user = await this.authRepo.findUserByIdentity(input.emailOrUsername);
    if (!user || !user.password) return;

    const isValid = await verifyPassword(user.password, input.password);
    if (!isValid) return;

    const session = await this.sessionService.create(user.id, meta);

    return session;
  }

  async logout(rawSession: string) {
    const session = await this.sessionService.verify(rawSession);
    if (!session) return { error: "no-session", success: false };

    this.sessionService.revoke(session.sessionId);

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
