import { integer, pgTable } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: integer().primaryKey(),
});

export { usersTable };
