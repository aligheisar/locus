import { eq } from "drizzle-orm";

import { profilesTable } from "@/server/db/schema/profiles";
import { type DbClient, db } from "@/server/db";

class ProfileRepository {
  async create(username: string, userId: string, client: DbClient = db) {
    return client.insert(profilesTable).values({ userId, username });
  }

  async findByUsername(username: string, client: DbClient = db) {
    return client
      .select({
        id: profilesTable.id,
      })
      .from(profilesTable)
      .where(eq(profilesTable.username, username));
  }
}

export { ProfileRepository };
