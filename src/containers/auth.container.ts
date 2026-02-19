import { AccountRepository } from "@/repositories/account.repository";
import { AuthRepository } from "@/repositories/auth.repository";
import { ProfileRepository } from "@/repositories/profile.repository";
import { SessionRepository } from "@/repositories/session.repository";
import { UserRepository } from "@/repositories/user.repository";
import { AuthService } from "@/services/auth.service";
import { PasswordService } from "@/services/password.service";
import { SessionService } from "@/services/session.service";
import { TokenService } from "@/services/token.service";

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
