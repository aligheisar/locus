import { argon2id, hash, verify } from "argon2";

const hashPassword = async (password: string) => {
  return await hash(password, {
    memoryCost: 2 ** 16,
    parallelism: 1,
    timeCost: 3,
    type: argon2id,
  });
};

const verifyPassword = async (hash: string, password: string) => {
  return verify(hash, password);
};

export { hashPassword, verifyPassword };
