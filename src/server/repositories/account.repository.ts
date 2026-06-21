import { accountsTable } from "@/server/db/schema/accounts";
import { type DbClient, db } from "@/server/db";

class AccountRepository {
  async create(password: string, userId: string, client: DbClient = db) {
    await client.insert(accountsTable).values({ password, userId });
  }
}

export { AccountRepository };
