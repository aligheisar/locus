import { db } from "@/db";
import { accountsTable } from "@/db/schema/accounts";

class AccountRepository {
  async create(password: string, userId: string) {
    await db.insert(accountsTable).values({ password, userId });
  }
}

export { AccountRepository };
