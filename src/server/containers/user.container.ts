import { UserRepository } from "@/server/repositories/user.repository";
import { UserService } from "@/server/services/user.service";

const userRepo = new UserRepository();

const userService = new UserService(userRepo);

export { userService };
