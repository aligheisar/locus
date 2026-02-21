import { AccountRepository } from "@/server/repositories/account.repository";
import { AuthRepository } from "@/server/repositories/auth.repository";
import { ProfileRepository } from "@/server/repositories/profile.repository";
import { SessionRepository } from "@/server/repositories/session.repository";
import { UserRepository } from "@/server/repositories/user.repository";
import { AuthService } from "@/server/services/auth.service";
import { PasswordService } from "@/server/services/password.service";
import { SessionService } from "@/server/services/session.service";
import { TokenService } from "@/server/services/token.service";

const authRepo = new AuthRepository();
const accountRepo = new AccountRepository();
const profileRepo = new ProfileRepository();
const userRepo = new UserRepository();
const sessionRepo = new SessionRepository();
const tokenService = new TokenService();
const sessionService = new SessionService(sessionRepo, tokenService);
const passwordService = new PasswordService();

const authService = new AuthService(
  authRepo,
  accountRepo,
  profileRepo,
  userRepo,
  sessionService,
  passwordService,
);

export { authService };
