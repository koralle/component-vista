import * as v from "valibot";

export const envSchema = v.object({
  NODE_ENV: v.union([v.literal("development"), v.literal("production")]),
  CLOUDFLARE_ACCOUNT_ID: v.string(),
  CLOUDFLARE_DATABASE_ID: v.string(),
  CLOUDFLARE_D1_TOKEN: v.string(),
});

export type EnvSchema = v.InferOutput<typeof envSchema>;

const validateEnv = (data: unknown) => {
  const parseResult = v.safeParse(envSchema, data);

  if (!parseResult.success) {
    console.log(parseResult.issues)
    throw new Error("[validateEnv]: Failed to parse data.");
  }

  return parseResult.output;
};

export const env = validateEnv(process.env);
