import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const accountsTable = pgTable("accounts", {
  createdAt: timestamp().defaultNow().notNull(),
  id: uuid().defaultRandom().primaryKey(),
  password: text().notNull(),
  passwordUpdatedAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export { accountsTable };
