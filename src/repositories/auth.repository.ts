import { eq, or } from "drizzle-orm";

import { db } from "@/db";
import { accountsTable } from "@/db/schema/accounts";
import { profilesTable } from "@/db/schema/profiles";
import { usersTable } from "@/db/schema/users";

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
      .leftJoin(accountsTable, eq(usersTable.id, accountsTable.userId))
      .leftJoin(profilesTable, eq(usersTable.id, profilesTable.userId))
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
