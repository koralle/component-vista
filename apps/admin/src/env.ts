import * as v from "valibot";

export const envSchema = v.object({
  BETTER_AUTH_SECRET: v.string(),
  CLOUDFLARE_ACCOUNT_ID: v.string(),
  CLOUDFLARE_D1_TOKEN: v.string(),
  CLOUDFLARE_AUTH_D1_ID: v.string(),
  NODE_ENV: v.union([v.literal("development"), v.literal("production")]),
});

export type EnvSchema = v.InferOutput<typeof envSchema>;

const validateEnv = (data: unknown) => {
  const result = v.safeParse(envSchema, data);

  if (result.success) {
    return result.output;
  } else {
    throw new Error("Failed to validate environment varialbles");
  }
};

export const env = validateEnv(process.env);
