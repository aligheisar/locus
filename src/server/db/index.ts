import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/lib/env";

const sql = postgres(env.DATABASE_URL, {
  max: 1,
});

const db = drizzle(sql, { casing: "snake_case" });

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];
type DbClient = typeof db | Tx;

export { type DbClient, db };
