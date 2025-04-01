import { users } from "~/database/schema";
import { eq } from "drizzle-orm";
type User = {
  id: number;
  appwrite_id: string;
  email: string;
  name: string;
  profile_photo_url?: string;
  bio?: string;
};

interface UserController {
  getUserById: (userId: number, context: any) => Promise<User | null>;
  getUserBySession: (appweriteId: string, context: any) => Promise<User | null>;
  updateUser: (
    userId: number,
    data: Partial<User>,
    context: any
  ) => Promise<User | null>;
}

const userController: UserController = {
  getUserById: async (userId, context) => {
    try {
      const user = await context.db.query.users.findFirst({
        where: eq(users.id, userId),
      });
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  getUserBySession: async (appwriteId, context) => {
    try {
      let user = await context.db.query.users.findFirst({
        where: eq(users.appwrite_id, appwriteId),
      });
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  updateUser: async (userId, data, context) => {
    try {
      // This is how updates should be done in Drizzle
      let result = await context.db
        .update(users)
        .set(data)
        .where(eq(users.id, userId));

      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  },
};

export default userController;
