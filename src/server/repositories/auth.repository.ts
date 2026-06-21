import { eq, or } from "drizzle-orm";

import { accountsTable } from "@/server/db/schema/accounts";
import { profilesTable } from "@/server/db/schema/profiles";
import { usersTable } from "@/server/db/schema/users";
import { db } from "@/server/db";

class AuthRepository {
  async findUserByIdentity(identifier: string) {
    return db
      .select({
        email: usersTable.email,
        id: usersTable.id,
        password: accountsTable.password,
        username: profilesTable.username,
      })
      .from(usersTable)
      .innerJoin(accountsTable, eq(usersTable.id, accountsTable.userId))
      .innerJoin(profilesTable, eq(usersTable.id, profilesTable.userId))
      .where(
        or(
          eq(usersTable.email, identifier),
          eq(profilesTable.username, identifier),
        ),
      )
      .limit(1)
      .then((r) => r[0] ?? null);
  }
}

export { AuthRepository };
