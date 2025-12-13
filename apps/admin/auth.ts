import { env as CloudflareEnv } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import { env } from "./src/env";
import { authConfig } from "./src/lib/auth.config";

const db = drizzle(CloudflareEnv.AUTH_DB);

const database = drizzleAdapter(db, {
  provider: "sqlite",
});

export const auth = betterAuth({
  database,
  secret: env.BETTER_AUTH_SECRET,
  ...authConfig,
});
