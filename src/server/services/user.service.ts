import { err, ok } from "@/utils/error";

import type { UserRepository } from "@/server/repositories/user.repository";

class UserService {
  constructor(private userRepo: UserRepository) {}

  async findBySessionId(sessionId: string) {
    try {
      const user = await this.userRepo.findBySessionId(sessionId);
      return ok(user);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }
}

export { UserService };
