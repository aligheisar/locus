import { eq } from "drizzle-orm";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema/sessions";

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
}

export { SessionRepository };
