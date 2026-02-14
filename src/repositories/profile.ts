import { eq } from "drizzle-orm";

import { db } from "@/db";
import { profilesTable } from "@/db/schema/profiles";

const createProfile = async (username: string, userId: string) => {
  return db.insert(profilesTable).values({ userId, username });
};

const findUserByUsername = async (username: string) => {
  return db
    .select({
      id: profilesTable.id,
    })
    .from(profilesTable)
    .where(eq(profilesTable.username, username));
};

export { findUserByUsername, createProfile };
