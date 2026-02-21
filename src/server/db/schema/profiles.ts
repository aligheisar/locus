import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { usersTable } from "@/server/db/schema/users";

const profilesTable = pgTable("profiles", {
  createdAt: timestamp().defaultNow().notNull(),
  firstName: varchar({ length: 50 }),
  id: uuid().defaultRandom().primaryKey(),
  lastName: varchar({ length: 50 }),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  username: varchar({ length: 60 }).notNull().unique(),
});

export { profilesTable };
