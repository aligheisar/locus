import * as argon from "argon2";

class PasswordService {
  async hash(password: string) {
    return await argon.hash(password, {
      memoryCost: 2 ** 16,
      parallelism: 1,
      timeCost: 3,
      type: argon.argon2id,
    });
  }

  async verify(hash: string, password: string) {
    return argon.verify(hash, password);
  }
}

export { PasswordService };
