import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.APP_BASE_URL,
});
