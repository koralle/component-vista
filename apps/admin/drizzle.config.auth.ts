import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

const isProduction = env.NODE_ENV === "production";

const productionConfig = defineConfig({
  out: "./drizzle/auth/migrations",
  schema: "./drizzle/auth/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    databaseId: env.CLOUDFLARE_AUTH_D1_ID,
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    token: env.CLOUDFLARE_D1_TOKEN,
  },
});

const developmentConfig = defineConfig({
  out: "./drizzle/auth/migrations",
  schema: "./drizzle/auth/schema.ts",
  dialect: "sqlite",
});

export default isProduction ? productionConfig : developmentConfig;
