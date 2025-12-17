---
title: "SvelteKit Integration | Better Auth"
source_url: "https://www.better-auth.com/docs/integrations/svelte-kit"
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

# SvelteKit Integration

Copy MarkdownOpen in

Before you start, make sure you have a Better Auth instance configured. If you haven't done that yet, check out the [installation](https://www.better-auth.com/docs/installation.html).

### [Mount the handler](https://www.better-auth.com/docs/integrations/svelte-kit.html#mount-the-handler)

We need to mount the handler to SvelteKit server hook.

hooks.server.ts

```
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
  return svelteKitHandler({ event, resolve, auth, building });
}
```

### [Populate session data in the event (`event.locals`)](https://www.better-auth.com/docs/integrations/svelte-kit.html#populate-session-data-in-the-event-eventlocals)

The `svelteKitHandler` does not automatically populate `event.locals.user` or `event.locals.session`. If you want to access the current session in your server code (e.g., in `+layout.server.ts`, actions, or endpoints), populate `event.locals` in your `handle` hook:

hooks.server.ts

```
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
  // Fetch current session from Better Auth
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  // Make session and user available on server
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  return svelteKitHandler({ event, resolve, auth, building });
}
```

### [Server Action Cookies](https://www.better-auth.com/docs/integrations/svelte-kit.html#server-action-cookies)

To ensure cookies are properly set when you call functions like `signInEmail` or `signUpEmail` in a server action, you should use the `sveltekitCookies` plugin. This plugin will automatically handle setting cookies for you in SvelteKit.

You need to add it as a plugin to your Better Auth instance.

The `getRequestEvent` function is available in SvelteKit `2.20.0` and later.
Make sure you are using a compatible version.

lib/auth.ts

```
import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  // ... your config
  plugins: [sveltekitCookies(getRequestEvent)], // make sure this is the last plugin in the array
});
```

## [Create a client](https://www.better-auth.com/docs/integrations/svelte-kit.html#create-a-client)

Create a client instance. You can name the file anything you want. Here we are creating `client.ts` file inside the `lib/` directory.

auth-client.ts

```
import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte

export const authClient = createAuthClient({
  // you can pass client configuration here
});
```

Once you have created the client, you can use it to sign up, sign in, and perform other actions.
Some of the actions are reactive. The client use [nano-store](https://github.com/nanostores/nanostores) to store the state and reflect changes when there is a change like a user signing in or out affecting the session state.

### [Example usage](https://www.better-auth.com/docs/integrations/svelte-kit.html#example-usage)

```
<script lang="ts">
  import { authClient } from "$lib/client";
  const session = authClient.useSession();
</script>
    <div>
      {#if $session.data}
        <div>
          <p>
            {$session.data.user.name}
          </p>
          <button
            on:click={async () => {
              await authClient.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      {:else}
        <button
          on:click={async () => {
            await authClient.signIn.social({
              provider: "github",
            });
          }}
        >
          Continue with GitHub
        </button>
      {/if}
    </div>
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/integrations/svelte-kit.mdx)

[Previous Page

Nuxt](https://www.better-auth.com/docs/integrations/nuxt.html)[Next Page

SolidStart](https://www.better-auth.com/docs/integrations/solid-start)

### On this page

[Mount the handler](https://www.better-auth.com/docs/integrations/svelte-kit.html#mount-the-handler)[Populate session data in the event (`event.locals`)](https://www.better-auth.com/docs/integrations/svelte-kit.html#populate-session-data-in-the-event-eventlocals)[Server Action Cookies](https://www.better-auth.com/docs/integrations/svelte-kit.html#server-action-cookies)[Create a client](https://www.better-auth.com/docs/integrations/svelte-kit.html#create-a-client)[Example usage](https://www.better-auth.com/docs/integrations/svelte-kit.html#example-usage)

Ask AI
