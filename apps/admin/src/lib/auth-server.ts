import { env as cloudflareEnv } from "cloudflare:workers";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../drizzle/auth/schema";
import { authConfig } from "./auth.config";
import "@dotenvx/dotenvx/config";

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(cloudflareEnv.AUTH_DB, { schema }), { provider: "sqlite" }),

  // @ts-expect-error Cloudflare環境内の環境変数を表す
  secret: process.env.BETTER_AUTH_SECRET,
  ...authConfig,
});
