---
title: "Signup disabled | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/signup_disabled"
fetched_at: "2025-12-17T17:03:49.997163+00:00"
---



Docs

get started, concepts, and plugins

Search documentation...

Get Started

Loading...

Loading...

Loading...

Loading...

Concepts

Authentication

Databases

Integrations

Plugins

Guides

Reference

# Signup disabled

Copy MarkdownOpen in

This error occurs when you disable sign up in your oauth provider config and a user tries to sign up with that provider.

## [How to fix](https://www.better-auth.com/docs/errors/signup_disabled.html#how-to-fix)

If you're using the `disableSignUp` option with stateless mode, you will see this error. Please consider using database hooks instead to handle this case.

auth.ts

```
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";

export const auth = betterAuth({
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const isAllowedToSignUp = await isAllowedToSignUp(user, ctx); // [!code highlight] // check if the user is allowed to sign up
          if (!isAllowedToSignUp) {
            throw new APIError("BAD_REQUEST", {
              message: "Signup is disabled",
			});
          },
        },
      },
	},
  }
});
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/signup_disabled.mdx)

### On this page

[How to fix](https://www.better-auth.com/docs/errors/signup_disabled.html#how-to-fix)

Ask AI
