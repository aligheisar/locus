import { db } from "@/db";
import { sessionsTable } from "@/db/schema/sessions";

const addSession = async (values: typeof sessionsTable.$inferInsert) => {
  return db
    .insert(sessionsTable)
    .values(values)
    .returning({ sessionId: sessionsTable.id });
};

export { addSession };
