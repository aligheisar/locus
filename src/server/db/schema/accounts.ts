import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { usersTable } from "@/server/db/schema/users";

const accountsTable = pgTable("accounts", {
  createdAt: timestamp().defaultNow().notNull(),
  id: uuid().defaultRandom().primaryKey(),
  password: text().notNull(),
  passwordUpdatedAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
});

export { accountsTable };
