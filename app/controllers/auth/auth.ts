import { redirect } from "react-router";
import { createAdminClient, createSessionClient } from "./appwriteConfig";
import type { Models } from "node-appwrite";

interface AuthState {
  getUser: (
    request: Request
  ) => Promise<Models.User<Models.Preferences> | null>;
  createSession: (formData: FormData, context: any) => Promise<Response>;
  deleteSession: () => Promise<Response>;
}

const auth: AuthState = {
  getUser: async (request?: Request) => {
    // Get cookie in different ways depending on environment
    let sessionValue;

    if (typeof document !== "undefined") {
      // Client-side - access cookies from document
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = value;
        return acc;
      }, {} as Record<string, string>);

      sessionValue = cookies["session"];
    } else if (request) {
      // Server-side - access cookies from request
      const cookieHeader = request.headers.get("Cookie") || "";
      const cookies = Object.fromEntries(
        cookieHeader.split(";").map((cookie) => {
          const [name, value] = cookie.trim().split("=");
          return [name, value];
        })
      );

      sessionValue = cookies["session"];
    }

    if (!sessionValue) {
      return null;
    }

    try {
      // Now createSessionClient can work without context
      const { account } = createSessionClient(sessionValue);
      return await account.get();
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  // Updated auth.createSession
  createSession: async (formData: FormData, context: any) => {
    const data = Object.fromEntries(formData);
    const email = String(data.email || "");
    const password = String(data.password || "");

    try {
      const { account } = createAdminClient(context);
      const session = await account.createEmailPasswordSession(email, password);

      // Create response with redirect
      const response = redirect("/");

      // Set cookie in response
      response.headers.set(
        "Set-Cookie",
        `session=${
          session.secret
        }; Path=/; HttpOnly; SameSite=Strict; Expires=${new Date(
          session.expire
        ).toUTCString()}`
      );

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Create new user

  deleteSession: async () => {
    // Note: We'll handle the session deletion in the route action
    const response = redirect("/login");

    // Clear the cookie
    response.headers.set(
      "Set-Cookie",
      "session=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    return response;
  },
};

export default auth;
