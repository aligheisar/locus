import { and, eq, gt, isNotNull, isNull, ne } from "drizzle-orm";

import { sessionsTable } from "@/server/db/schema/sessions";
import { type DbClient, db } from "@/server/db";

class SessionRepository {
  async create(
    values: typeof sessionsTable.$inferInsert,
    client: DbClient = db,
  ) {
    return client
      .insert(sessionsTable)
      .values(values)
      .returning({ sessionId: sessionsTable.id });
  }

  async touch(sessionId: string, client: DbClient = db) {
    return client
      .update(sessionsTable)
      .set({ lastSeenAt: new Date() })
      .where(eq(sessionsTable.id, sessionId));
  }

  async revoke(sessionId: string, userId: string, client: DbClient = db) {
    return client
      .update(sessionsTable)
      .set({ revokedAt: new Date() })
      .where(
        and(eq(sessionsTable.id, sessionId), eq(sessionsTable.userId, userId)),
      );
  }

  async findActiveSessions(userId: string, client: DbClient = db) {
    return client
      .select()
      .from(sessionsTable)
      .where(
        and(
          eq(sessionsTable.userId, userId),
          isNull(sessionsTable.revokedAt),
          gt(sessionsTable.expiresAt, new Date(Date.now())),
        ),
      );
  }

  async findRevokedSessions(userId: string, client: DbClient = db) {
    return client
      .select()
      .from(sessionsTable)
      .where(
        and(
          eq(sessionsTable.userId, userId),
          isNotNull(sessionsTable.revokedAt),
        ),
      );
  }

  async findSession(sessionId: string, client: DbClient = db) {
    return client
      .select()
      .from(sessionsTable)
      .where(
        and(
          eq(sessionsTable.id, sessionId),
          isNull(sessionsTable.revokedAt),
          gt(sessionsTable.expiresAt, new Date(Date.now())),
        ),
      )
      .limit(1)
      .then((r) => r[0] ?? null);
  }
}

export { SessionRepository };
