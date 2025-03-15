import { Client, Account } from "node-appwrite";

export function createAdminClient(context: any) {

  const client = new Client()
    .setEndpoint(context.cloudflare.env.APPWRITE_ENDPOINT || "")
    .setProject(context.cloudflare.env.APPWRITE_PROJECT_ID || "")
    .setKey(context.cloudflare.env.APPWRITE_API_KEY || "");

  return {
    account: new Account(client),
  };
}

export function createSessionClient(sessionSecret: string, context?: any) {
  // For client-side, use environment variables or hardcoded values
  let endpoint = "https://cloud.appwrite.io/v1";
  let projectId = "67ce45dd00364cdff5d8";

  // If context is available (server-side), use those values
  if (context?.cloudflare?.env) {
    endpoint = context.cloudflare.env.APPWRITE_ENDPOINT || endpoint;
    projectId = context.cloudflare.env.APPWRITE_PROJECT_ID || projectId;
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  if (sessionSecret) {
    client.setSession(sessionSecret);
  }

  return {
    account: new Account(client),
  };
}
