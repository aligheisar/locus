import { and, eq, gt, isNull } from "drizzle-orm";

import { sessionsTable } from "@/server/db/schema/sessions";
import { db } from "@/server/db";

class SessionRepository {
  async create(values: typeof sessionsTable.$inferInsert) {
    return db
      .insert(sessionsTable)
      .values(values)
      .returning({ sessionId: sessionsTable.id });
  }

  async revoke(sessionId: string) {
    return db
      .update(sessionsTable)
      .set({ revokedAt: new Date() })
      .where(eq(sessionsTable.id, sessionId));
  }

  async findActiveSessions(userId: string) {
    return db
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

  async findRevokedSessions(userId: string) {
    return db
      .select()
      .from(sessionsTable)
      .where(
        and(eq(sessionsTable.userId, userId), isNull(sessionsTable.revokedAt)),
      );
  }

  async findSession(sessionId: string) {
    return db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, sessionId))
      .limit(1)
      .then((r) => r[0] ?? null);
  }
}

export { SessionRepository };
