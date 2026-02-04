import { createEnv } from "@t3-oss/env-nextjs";
import * as v from "valibot";

export const env = createEnv({
  experimental__runtimeEnv: process.env,
  server: {
    DATABASE_URL: v.pipe(v.string(), v.url()),
  },
});
