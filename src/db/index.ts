import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/lib/env";

const sql = postgres(env.DATABASE_URL, {
  max: 1,
});

const db = drizzle(sql);

export { db };
