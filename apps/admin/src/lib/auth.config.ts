import type { BetterAuthOptions } from "better-auth/minimal";

export const authConfig = {
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
} as const satisfies Omit<BetterAuthOptions, "database" | "secret">;
