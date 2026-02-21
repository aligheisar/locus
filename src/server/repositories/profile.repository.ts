import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { profilesTable } from "@/server/db/schema/profiles";

class ProfileRepository {
  async create(username: string, userId: string) {
    return db.insert(profilesTable).values({ userId, username });
  }

  async findByUsername(username: string) {
    return db
      .select({
        id: profilesTable.id,
      })
      .from(profilesTable)
      .where(eq(profilesTable.username, username));
  }
}

export { ProfileRepository };
