import { Client, Account, ID } from "appwrite";
import * as schema from "~/database/schema";

// Create a function that initializes Appwrite with the context
export function getAppwriteClient(context: any) {
  const projectId = context.cloudflare.env.APPWRITE_PROJECT_ID;
  const client = new Client().setProject(projectId);

  return {
    client,
    account: new Account(client),
  };
}

export async function createUser(
  context: any,
  email: string,
  password: string,
  name: string
) {
  const { account } = getAppwriteClient(context);
  let appwriteUser;

  try {
    // Create user in Appwrite
    appwriteUser = await account.create(
      ID.unique(),
      email,
      password || "",
      name
    );
    console.log("User created:", appwriteUser);

    // Insert user in database
    try {
      await context.db.insert(schema.users).values({
        appwrite_id: appwriteUser.$id,
        email: appwriteUser.email,
        name: appwriteUser.name,
      });

      // TODO: Send succes modal
      // TODO: Redirect to dashboard
      return appwriteUser.name;
    } catch (dbError) {
      console.error("Error inserting user into database:", dbError);
      try {
        await account.deleteIdentity(appwriteUser.$id);
        console.log("Rolled back Appwrite user creation due to db error");
      } catch (deleteError) {
        console.error("Error deleting user from Appwrite:", deleteError);
      }
      // Re-throw the error
      throw dbError;
    }
  } catch (error) {
    console.error("Error creating user:", error);

    throw error;
  }
}

export async function login(context: any, email: string, password: string) {
  const account = getAppwriteClient(context).account;
  let appwriteUser;

  try {
    // Login user in Appwrite
    // TODO : Set session time
    appwriteUser = await account.createEmailPasswordSession(email, password);
    console.log("User logged in, session:", appwriteUser);
    return;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: "Problem with the login" + error };
  }
}
