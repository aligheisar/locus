import type { AccountRepository } from "@/server/repositories/account.repository";
import type { AuthRepository } from "@/server/repositories/auth.repository";
import type { ProfileRepository } from "@/server/repositories/profile.repository";
import type { UserRepository } from "@/server/repositories/user.repository";
import type { PasswordService } from "@/server/services/password.service";
import type { SessionService } from "@/server/services/session.service";
import type { LoginFormType } from "@/shared/schemas/login-form";
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

  async signup(
    user: SignupFormType,
    meta: { userAgent: string | null; ipAddress: string | null },
  ) {
    const [{ userId }] = await this.userRepo.create(user.email);
    const hashedPassword = await this.passwordService.hash(user.password);
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

    const isValid = await this.passwordService.verify(
      user.password,
      input.password,
    );
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
