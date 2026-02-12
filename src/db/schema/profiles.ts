import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const profilesTable = pgTable("profiles", {
  createdAt: timestamp().defaultNow().notNull(),
  firstName: varchar({ length: 50 }),
  id: uuid().defaultRandom().primaryKey(),
  lastName: varchar({ length: 50 }),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  username: varchar({ length: 60 }).notNull().unique(),
});

export { profilesTable };
