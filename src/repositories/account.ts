import { db } from "@/db";
import { accountsTable } from "@/db/schema/accounts";

const createAccount = async (password: string, userId: string) => {
  await db.insert(accountsTable).values({ password, userId });
};

export { createAccount };
