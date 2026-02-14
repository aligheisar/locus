import { AccountRepository } from "@/repositories/account.repository";
import { AuthRepository } from "@/repositories/auth.repository";
import { AuthService } from "@/services/auth.service";

const authRepo = new AuthRepository();
const accountRepo = new AccountRepository();

const authService = new AuthService(authRepo, accountRepo);

export { authService };
