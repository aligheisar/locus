import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  createdAt: timestamp().defaultNow().notNull(),
  email: text().notNull().unique(),
  id: uuid().defaultRandom().primaryKey(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  username: text().notNull().unique(),
});

export { usersTable };
