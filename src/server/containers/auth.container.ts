import { sessionService } from "@/server/containers/session.container";
import { AccountRepository } from "@/server/repositories/account.repository";
import { AuthRepository } from "@/server/repositories/auth.repository";
import { ProfileRepository } from "@/server/repositories/profile.repository";
import { UserRepository } from "@/server/repositories/user.repository";
import { AuthService } from "@/server/services/auth.service";
import { PasswordService } from "@/server/services/password.service";

const authRepo = new AuthRepository();
const accountRepo = new AccountRepository();
const profileRepo = new ProfileRepository();
const userRepo = new UserRepository();
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
