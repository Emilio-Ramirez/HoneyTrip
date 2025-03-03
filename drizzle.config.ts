import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle",
  schema: "./database/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    databaseId: "d2b5ed47-742a-40b6-9665-edb765c77b02",
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    token: process.env.CLOUDFLARE_TOKEN!,
  },
} satisfies Config;
