import { inet, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { usersTable } from "@/db/schema/users";

const sessionsTable = pgTable("sessions", {
  createdAt: timestamp().defaultNow().notNull(),
  expiresAt: timestamp().notNull(),
  id: uuid().defaultRandom().primaryKey(),
  ipAddress: inet().notNull(),
  lastSeenAt: timestamp().notNull().defaultNow(),
  revokedAt: timestamp(),
  token: text().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  userAgent: text().notNull(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
});

export { sessionsTable };
