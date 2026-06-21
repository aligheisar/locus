import { eq } from "drizzle-orm";

import { profilesTable } from "@/server/db/schema/profiles";
import { sessionsTable } from "@/server/db/schema/sessions";
import { usersTable } from "@/server/db/schema/users";
import { type DbClient, db } from "@/server/db";

class UserRepository {
  async create(email: string, client: DbClient = db) {
    return client
      .insert(usersTable)
      .values({ email })
      .returning({ userId: usersTable.id });
  }

  async findByEmail(email: string, client: DbClient = db) {
    return client
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));
  }

  async findBySessionId(sessionId: string, client: DbClient = db) {
    return client
      .select({
        email: usersTable.email,
        firstName: profilesTable.firstName,
        id: usersTable.id,
        lastName: profilesTable.lastName,
        username: profilesTable.username,
      })
      .from(sessionsTable)
      .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
      .innerJoin(profilesTable, eq(sessionsTable.userId, profilesTable.userId))
      .where(eq(sessionsTable.id, sessionId))
      .limit(1)
      .then((r) => r[0] ?? null);
  }
}

export { UserRepository };
