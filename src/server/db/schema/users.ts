import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  createdAt: timestamp().defaultNow().notNull(),
  email: varchar({ length: 320 }).notNull().unique(),
  emailVerifiedAt: timestamp(),
  id: uuid().defaultRandom().primaryKey(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export { usersTable };
