import { eq } from "drizzle-orm";

import { profilesTable } from "@/server/db/schema/profiles";
import { sessionsTable } from "@/server/db/schema/sessions";
import { usersTable } from "@/server/db/schema/users";
import { db } from "@/server/db";

class UserRepository {
  async create(email: string) {
    return db
      .insert(usersTable)
      .values({ email })
      .returning({ userId: usersTable.id });
  }

  async findByEmail(email: string) {
    return db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));
  }

  async findBySessionId(sessionId: string) {
    return db
      .select({
        email: usersTable.email,
        firstName: profilesTable.firstName,
        id: usersTable.id,
        lastName: profilesTable.lastName,
        username: profilesTable.username,
      })
      .from(sessionsTable)
      .leftJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
      .leftJoin(profilesTable, eq(sessionsTable.userId, profilesTable.userId))
      .where(eq(sessionsTable.id, sessionId))
      .limit(1)
      .then((r) => r[0] ?? null);
  }
}

export { UserRepository };
