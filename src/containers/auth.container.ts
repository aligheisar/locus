import { AccountRepository } from "@/repositories/account.repository";
import { AuthRepository } from "@/repositories/auth.repository";
import { ProfileRepository } from "@/repositories/profile.repository";
import { UserRepository } from "@/repositories/user.repository";
import { AuthService } from "@/services/auth.service";

const authRepo = new AuthRepository();
const accountRepo = new AccountRepository();
const profileRepo = new ProfileRepository();
const userRepo = new UserRepository();

const authService = new AuthService(
  authRepo,
  accountRepo,
  profileRepo,
  userRepo,
);

export { authService };
