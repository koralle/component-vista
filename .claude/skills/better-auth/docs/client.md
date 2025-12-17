---
title: "Client | Better Auth"
source_url: "https://www.better-auth.com/docs/concepts/client"
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

# Client

Copy MarkdownOpen in

Better Auth offers a client library compatible with popular frontend frameworks like React, Vue, Svelte, and more. This client library includes a set of functions for interacting with the Better Auth server. Each framework's client library is built on top of a core client library that is framework-agnostic, so that all methods and hooks are consistently available across all client libraries.

## [Installation](https://www.better-auth.com/docs/concepts/client.html#installation)

If you haven't already, install better-auth.

npmpnpmyarnbun

```
npm i better-auth
```

## [Create Client Instance](https://www.better-auth.com/docs/concepts/client.html#create-client-instance)

Import `createAuthClient` from the package for your framework (e.g., "better-auth/react" for React). Call the function to create your client. Pass the base URL of your auth server. If the auth server is running on the same domain as your client, you can skip this step.

If you're using a different base path other than `/api/auth`, make sure to pass the whole URL, including the path. (e.g., `http://localhost:3000/custom-path/auth`)

reactvuesveltesolidvanilla

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/client"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // The base URL of your auth server
})
```

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // The base URL of your auth server
})
```

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/vue"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // The base URL of your auth server
})
```

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/svelte"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // The base URL of your auth server
})
```

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/solid"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // The base URL of your auth server
})
```

## [Usage](https://www.better-auth.com/docs/concepts/client.html#usage)

Once you've created your client instance, you can use the client to interact with the Better Auth server. The client provides a set of functions by default and they can be extended with plugins.

**Example: Sign In**

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

await authClient.signIn.email({
    email: "test@user.com",
    password: "password1234"
})
```

### [Hooks](https://www.better-auth.com/docs/concepts/client.html#hooks)

In addition to the standard methods, the client provides hooks to easily access different reactive data. Every hook is available in the root object of the client and they all start with `use`.

**Example: useSession**

ReactVueSvelteSolid

user.tsx

```
//make sure you're using the react client
import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient()

export function User() {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()
    return (
        //...
    )
}
```

user.vue

```
<script lang="ts" setup>
import { authClient } from '@/lib/auth-client'
const session = authClient.useSession()
</script>
<template>
    <div>
        <button v-if="!session.data" @click="() => authClient.signIn.social({
            provider: 'github'
        })">
            Continue with GitHub
        </button>
        <div>
            <pre>{{ session.data }}</pre>
            <button v-if="session.data" @click="authClient.signOut()">
                Sign out
            </button>
        </div>
    </div>
</template>
```

user.svelte

```
<script lang="ts">
import { client } from "$lib/client";
const session = client.useSession();
</script>

<div
    style="display: flex; flex-direction: column; gap: 10px; border-radius: 10px; border: 1px solid #4B453F; padding: 20px; margin-top: 10px;"
>
    <div>
    {#if $session.data}
        <div>
        <p>
            {$session.data.user.name}
        </p>
        <p>
            {$session.data.user.email}
        </p>
        <button
            onclick={async () => {
            await authClient.signOut();
            }}
        >
            Signout
        </button>
        </div>
    {:else}
        <button
        onclick={async () => {
            await authClient.signIn.social({
            provider: "github",
            });
        }}
        >
        Continue with GitHub
        </button>
    {/if}
    </div>
</div>
```

user.tsx

```
import { client } from "~/lib/client";
import { Show } from 'solid-js';

export default function Home() {
    const session = client.useSession()
    return (
        <Show
            when={session()}
            fallback={<button onClick={toggle}>Log in</button>}
        >
            <button onClick={toggle}>Log out</button>
        </Show>
    );
}
```

### [Fetch Options](https://www.better-auth.com/docs/concepts/client.html#fetch-options)

The client uses a library called [better fetch](https://better-fetch.vercel.app) to make requests to the server.

Better fetch is a wrapper around the native fetch API that provides a more convenient way to make requests. It's created by the same team behind Better Auth and is designed to work seamlessly with it.

You can pass any default fetch options to the client by passing `fetchOptions` object to the `createAuthClient`.

auth-client.ts

```
import { createAuthClient } from "better-auth/client"

const authClient = createAuthClient({
    fetchOptions: {
        //any better-fetch options
    },
})
```

You can also pass fetch options to most of the client functions. Either as the second argument or as a property in the object.

auth-client.ts

```
await authClient.signIn.email({
    email: "email@email.com",
    password: "password1234",
}, {
    onSuccess(ctx) {
            //
    }
})

//or

await authClient.signIn.email({
    email: "email@email.com",
    password: "password1234",
    fetchOptions: {
        onSuccess(ctx) {
            //
        }
    },
})
```

### [Disabling Hook Rerenders](https://www.better-auth.com/docs/concepts/client.html#disabling-hook-rerenders)

Certain endpoints, upon successful response, will trigger atom signals and cause hooks like `useSession` to rerender.
This is useful for keeping your UI in sync with authentication state changes.

However, there are cases where you might want to make an endpoint call without triggering hook rerenders.
For example, when updating user preferences that don't affect the session, or when you want to manually control when hooks update.

You can disable hook rerenders for a specific endpoint call by setting `disableSignal: true` in the fetch options:

auth-client.ts

```
// As the second argument
await authClient.updateUser({
    name: "New Name"
}, {
    disableSignal: true
})

// Or within fetchOptions
await authClient.updateUser({
    name: "New Name",
    fetchOptions: {
        disableSignal: true
    }
})
```

When `disableSignal` is set to `true`, the endpoint call will complete successfully,
but hooks like `useSession` won't automatically rerender. You can manually trigger a refetch if needed:

auth-client.ts

```
const { refetch } = authClient.useSession()

await authClient.updateUser({
    name: "New Name"
}, {
    disableSignal: true,
    onSuccess() {
        // Manually refetch session if needed
        refetch()
    }
})
```

### [Handling Errors](https://www.better-auth.com/docs/concepts/client.html#handling-errors)

Most of the client functions return a response object with the following properties:

* `data`: The response data.
* `error`: The error object if there was an error.

The error object contains the following properties:

* `message`: The error message. (e.g., "Invalid email or password")
* `status`: The HTTP status code.
* `statusText`: The HTTP status text.

auth-client.ts

```
const { data, error } = await authClient.signIn.email({
    email: "email@email.com",
    password: "password1234"
})
if (error) {
    //handle error
}
```

If the action accepts a `fetchOptions` option, you can pass an `onError` callback to handle errors.

auth-client.ts

```
await authClient.signIn.email({
    email: "email@email.com",
    password: "password1234",
}, {
    onError(ctx) {
        //handle error
    }
})

//or
await authClient.signIn.email({
    email: "email@email.com",
    password: "password1234",
    fetchOptions: {
        onError(ctx) {
            //handle error
        }
    }
})
```

Hooks like `useSession` also return an error object if there was an error fetching the session. On top of that, they also return an `isPending` property to indicate if the request is still pending.

auth-client.ts

```
const { data, error, isPending } = useSession()
if (error) {
    //handle error
}
```

#### [Error Codes](https://www.better-auth.com/docs/concepts/client.html#error-codes)

The client instance contains $ERROR\_CODES object that contains all the error codes returned by the server. You can use this to handle error translations or custom error messages.

auth-client.ts

```
const authClient = createAuthClient();

type ErrorTypes = Partial<
	Record<
		keyof typeof authClient.$ERROR_CODES,
		{
			en: string;
			es: string;
		}
	>
>;

const errorCodes = {
	USER_ALREADY_EXISTS: {
		en: "user already registered",
		es: "usuario ya registrado",
	},
} satisfies ErrorTypes;

const getErrorMessage = (code: string, lang: "en" | "es") => {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes][lang];
	}
	return "";
};

const { error } = await authClient.signUp.email({
	email: "user@email.com",
	password: "password",
	name: "User",
});
if(error?.code){
    alert(getErrorMessage(error.code, "en"));
}
```

### [Plugins](https://www.better-auth.com/docs/concepts/client.html#plugins)

You can extend the client with plugins to add more functionality. Plugins can add new functions to the client or modify existing ones.

**Example: Magic Link Plugin**

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { magicLinkClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        magicLinkClient()
    ]
})
```

once you've added the plugin, you can use the new functions provided by the plugin.

auth-client.ts

```
await authClient.signIn.magicLink({
    email: "test@email.com"
})
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/concepts/client.mdx)

[Previous Page

CLI](https://www.better-auth.com/docs/concepts/cli.html)[Next Page

Cookies](https://www.better-auth.com/docs/concepts/cookies.html)

### On this page

[Installation](https://www.better-auth.com/docs/concepts/client.html#installation)[Create Client Instance](https://www.better-auth.com/docs/concepts/client.html#create-client-instance)[Usage](https://www.better-auth.com/docs/concepts/client.html#usage)[Hooks](https://www.better-auth.com/docs/concepts/client.html#hooks)[Fetch Options](https://www.better-auth.com/docs/concepts/client.html#fetch-options)[Disabling Hook Rerenders](https://www.better-auth.com/docs/concepts/client.html#disabling-hook-rerenders)[Handling Errors](https://www.better-auth.com/docs/concepts/client.html#handling-errors)[Error Codes](https://www.better-auth.com/docs/concepts/client.html#error-codes)[Plugins](https://www.better-auth.com/docs/concepts/client.html#plugins)

Ask AI
