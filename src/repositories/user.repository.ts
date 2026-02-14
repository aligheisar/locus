import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema/users";

class UserRepository {
  async create(email: string) {
    return db
      .insert(usersTable)
      .values({ email })
      .returning({ userId: usersTable.id });
  }

  async findByEmail(email: string) {
    return db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));
  }
}

export { UserRepository };
