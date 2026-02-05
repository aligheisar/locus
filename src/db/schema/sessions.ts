import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { usersTable } from "@/db/schema/users";

const sessionsTable = pgTable("sessions", {
  createdAt: timestamp().defaultNow().notNull(),
  expiresAt: timestamp().notNull(),
  id: uuid().defaultRandom().primaryKey(),
  token: text().notNull(),
  updatedAt: timestamp(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
});

export { sessionsTable };
