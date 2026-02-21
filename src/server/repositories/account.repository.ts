import { db } from "@/server/db";
import { accountsTable } from "@/server/db/schema/accounts";

class AccountRepository {
  async create(password: string, userId: string) {
    await db.insert(accountsTable).values({ password, userId });
  }
}

export { AccountRepository };
