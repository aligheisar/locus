import { AuthRepository } from "@/repositories/auth.repository";
import { AuthService } from "@/services/auth.service";

const authRepo = new AuthRepository();

const authService = new AuthService(authRepo);

export { authService };
