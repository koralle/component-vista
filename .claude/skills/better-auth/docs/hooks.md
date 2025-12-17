---
title: "Hooks | Better Auth"
source_url: "https://www.better-auth.com/docs/concepts/hooks"
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

# Hooks

Copy MarkdownOpen in

Hooks in Better Auth let you "hook into" the lifecycle and execute custom logic. They provide a way to customize Better Auth's behavior without writing a full plugin.

We highly recommend using hooks if you need to make custom adjustments to an endpoint rather than making another endpoint outside of Better Auth.

## [Before Hooks](https://www.better-auth.com/docs/concepts/hooks.html#before-hooks)

**Before hooks** run *before* an endpoint is executed. Use them to modify requests, pre validate data, or return early.

### [Example: Enforce Email Domain Restriction](https://www.better-auth.com/docs/concepts/hooks.html#example-enforce-email-domain-restriction)

This hook ensures that users can only sign up if their email ends with `@example.com`:

auth.ts

```
import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/sign-up/email") {
                return;
            }
            if (!ctx.body?.email.endsWith("@example.com")) {
                throw new APIError("BAD_REQUEST", {
                    message: "Email must end with @example.com",
                });
            }
        }),
    },
});
```

### [Example: Modify Request Context](https://www.better-auth.com/docs/concepts/hooks.html#example-modify-request-context)

To adjust the request context before proceeding:

auth.ts

```
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name: "John Doe",
                        },
                    }
                };
            }
        }),
    },
});
```

## [After Hooks](https://www.better-auth.com/docs/concepts/hooks.html#after-hooks)

**After hooks** run *after* an endpoint is executed. Use them to modify responses.

### [Example: Send a notification to your channel when a new user is registered](https://www.better-auth.com/docs/concepts/hooks.html#example-send-a-notification-to-your-channel-when-a-new-user-is-registered)

auth.ts

```
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { sendMessage } from "@/lib/notification"

export const auth = betterAuth({
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if(ctx.path.startsWith("/sign-up")){
                const newSession = ctx.context.newSession;
                if(newSession){
                    sendMessage({
                        type: "user-register",
                        name: newSession.user.name,
                    })
                }
            }
        }),
    },
});
```

## [Ctx](https://www.better-auth.com/docs/concepts/hooks.html#ctx)

When you call `createAuthMiddleware` a `ctx` object is passed that provides a lot of useful properties. Including:

* **Path:** `ctx.path` to get the current endpoint path.
* **Body:** `ctx.body` for parsed request body (available for POST requests).
* **Headers:** `ctx.headers` to access request headers.
* **Request:** `ctx.request` to access the request object (may not exist in server-only endpoints).
* **Query Parameters:** `ctx.query` to access query parameters.
* **Context**: `ctx.context` auth related context, useful for accessing new session, auth cookies configuration, password hashing, config...

and more.

### [Request Response](https://www.better-auth.com/docs/concepts/hooks.html#request-response)

This utilities allows you to get request information and to send response from a hook.

#### [JSON Responses](https://www.better-auth.com/docs/concepts/hooks.html#json-responses)

Use `ctx.json` to send JSON responses:

```
const hook = createAuthMiddleware(async (ctx) => {
    return ctx.json({
        message: "Hello World",
    });
});
```

#### [Redirects](https://www.better-auth.com/docs/concepts/hooks.html#redirects)

Use `ctx.redirect` to redirect users:

```
import { createAuthMiddleware } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    throw ctx.redirect("/sign-up/name");
});
```

#### [Cookies](https://www.better-auth.com/docs/concepts/hooks.html#cookies)

* Set cookies: `ctx.setCookies` or `ctx.setSignedCookie`.
* Get cookies: `ctx.getCookies` or `ctx.getSignedCookie`.

Example:

```
import { createAuthMiddleware } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    ctx.setCookies("my-cookie", "value");
    await ctx.setSignedCookie("my-signed-cookie", "value", ctx.context.secret, {
        maxAge: 1000,
    });

    const cookie = ctx.getCookies("my-cookie");
    const signedCookie = await ctx.getSignedCookie("my-signed-cookie");
});
```

#### [Errors](https://www.better-auth.com/docs/concepts/hooks.html#errors)

Throw errors with `APIError` for a specific status code and message:

```
import { createAuthMiddleware, APIError } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    throw new APIError("BAD_REQUEST", {
        message: "Invalid request",
    });
});
```

### [Context](https://www.better-auth.com/docs/concepts/hooks.html#context)

The `ctx` object contains another `context` object inside that's meant to hold contexts related to auth. Including a newly created session on after hook, cookies configuration, password hasher and so on.

#### [New Session](https://www.better-auth.com/docs/concepts/hooks.html#new-session)

The newly created session after an endpoint is run. This only exist in after hook.

auth.ts

```
createAuthMiddleware(async (ctx) => {
    const newSession = ctx.context.newSession
});
```

#### [Returned](https://www.better-auth.com/docs/concepts/hooks.html#returned)

The returned value from the hook is passed to the next hook in the chain.

auth.ts

```
createAuthMiddleware(async (ctx) => {
    const returned = ctx.context.returned; //this could be a successful response or an APIError
});
```

#### [Response Headers](https://www.better-auth.com/docs/concepts/hooks.html#response-headers)

The response headers added by endpoints and hooks that run before this hook.

auth.ts

```
createAuthMiddleware(async (ctx) => {
    const responseHeaders = ctx.context.responseHeaders;
});
```

#### [Predefined Auth Cookies](https://www.better-auth.com/docs/concepts/hooks.html#predefined-auth-cookies)

Access BetterAuth’s predefined cookie properties:

auth.ts

```
createAuthMiddleware(async (ctx) => {
    const cookieName = ctx.context.authCookies.sessionToken.name;
});
```

#### [Secret](https://www.better-auth.com/docs/concepts/hooks.html#secret)

You can access the `secret` for your auth instance on `ctx.context.secret`

#### [Password](https://www.better-auth.com/docs/concepts/hooks.html#password)

The password object provider `hash` and `verify`

* `ctx.context.password.hash`: let's you hash a given password.
* `ctx.context.password.verify`: let's you verify given `password` and a `hash`.

#### [Adapter](https://www.better-auth.com/docs/concepts/hooks.html#adapter)

Adapter exposes the adapter methods used by Better Auth. Including `findOne`, `findMany`, `create`, `delete`, `update` and `updateMany`. You generally should use your actually `db` instance from your orm rather than this adapter.

#### [Internal Adapter](https://www.better-auth.com/docs/concepts/hooks.html#internal-adapter)

These are calls to your db that perform specific actions. `createUser`, `createSession`, `updateSession`...

This may be useful to use instead of using your db directly to get access to `databaseHooks`, proper `secondaryStorage` support and so on. If you're make a query similar to what exist in this internal adapter actions it's worth a look.

#### [generateId](https://www.better-auth.com/docs/concepts/hooks.html#generateid)

You can use `ctx.context.generateId` to generate Id for various reasons.

## [Reusable Hooks](https://www.better-auth.com/docs/concepts/hooks.html#reusable-hooks)

If you need to reuse a hook across multiple endpoints, consider creating a plugin. Learn more in the [Plugins Documentation](https://www.better-auth.com/docs/concepts/plugins.html).

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/concepts/hooks.mdx)

[Previous Page

Email](https://www.better-auth.com/docs/concepts/email.html)[Next Page

Plugins](https://www.better-auth.com/docs/concepts/plugins.html)

### On this page

[Before Hooks](https://www.better-auth.com/docs/concepts/hooks.html#before-hooks)[Example: Enforce Email Domain Restriction](https://www.better-auth.com/docs/concepts/hooks.html#example-enforce-email-domain-restriction)[Example: Modify Request Context](https://www.better-auth.com/docs/concepts/hooks.html#example-modify-request-context)[After Hooks](https://www.better-auth.com/docs/concepts/hooks.html#after-hooks)[Example: Send a notification to your channel when a new user is registered](https://www.better-auth.com/docs/concepts/hooks.html#example-send-a-notification-to-your-channel-when-a-new-user-is-registered)[Ctx](https://www.better-auth.com/docs/concepts/hooks.html#ctx)[Request Response](https://www.better-auth.com/docs/concepts/hooks.html#request-response)[JSON Responses](https://www.better-auth.com/docs/concepts/hooks.html#json-responses)[Redirects](https://www.better-auth.com/docs/concepts/hooks.html#redirects)[Cookies](https://www.better-auth.com/docs/concepts/hooks.html#cookies)[Errors](https://www.better-auth.com/docs/concepts/hooks.html#errors)[Context](https://www.better-auth.com/docs/concepts/hooks.html#context)[New Session](https://www.better-auth.com/docs/concepts/hooks.html#new-session)[Returned](https://www.better-auth.com/docs/concepts/hooks.html#returned)[Response Headers](https://www.better-auth.com/docs/concepts/hooks.html#response-headers)[Predefined Auth Cookies](https://www.better-auth.com/docs/concepts/hooks.html#predefined-auth-cookies)[Secret](https://www.better-auth.com/docs/concepts/hooks.html#secret)[Password](https://www.better-auth.com/docs/concepts/hooks.html#password)[Adapter](https://www.better-auth.com/docs/concepts/hooks.html#adapter)[Internal Adapter](https://www.better-auth.com/docs/concepts/hooks.html#internal-adapter)[generateId](https://www.better-auth.com/docs/concepts/hooks.html#generateid)[Reusable Hooks](https://www.better-auth.com/docs/concepts/hooks.html#reusable-hooks)

Ask AI
