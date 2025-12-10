import { readdirSync } from "node:fs";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

const sqliteDirPath = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
const sqliteFilePath = readdirSync(sqliteDirPath).find((file) => file.endsWith(".sqlite"));

const productionConfig = defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    databaseId: env.CLOUDFLARE_DATABASE_ID,
    token: env.CLOUDFLARE_D1_TOKEN,
  },
});

const developmentConfig = defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `${sqliteDirPath}/${sqliteFilePath}`,
  },
});

export default env.NODE_ENV === "production" ? productionConfig : developmentConfig;
