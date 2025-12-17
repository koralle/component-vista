---
title: "Multi Session | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/multi-session"
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

# Multi Session

Copy MarkdownOpen in

The multi-session plugin allows users to maintain multiple active sessions across different accounts in the same browser. This plugin is useful for applications that require users to switch between multiple accounts without logging out.

## [Installation](https://www.better-auth.com/docs/plugins/multi-session.html#installation)

### [Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/multi-session.html#add-the-plugin-to-your-auth-config)

auth.ts

```
import { betterAuth } from "better-auth"
import { multiSession } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        multiSession(),
    ]
})
```

### [Add the client Plugin](https://www.better-auth.com/docs/plugins/multi-session.html#add-the-client-plugin)

Add the client plugin and Specify where the user should be redirected if they need to verify 2nd factor

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { multiSessionClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        multiSessionClient()
    ]
})
```

## [Usage](https://www.better-auth.com/docs/plugins/multi-session.html#usage)

Whenever a user logs in, the plugin will add additional cookie to the browser. This cookie will be used to maintain multiple sessions across different accounts.

### [List all device sessions](https://www.better-auth.com/docs/plugins/multi-session.html#list-all-device-sessions)

To list all active sessions for the current user, you can call the `listDeviceSessions` method.

ClientServer

GET

/multi-session/list-device-sessions

```
const { data, error } = await authClient.multiSession.listDeviceSessions();
```

GET

/multi-session/list-device-sessions

```
const data = await auth.api.listDeviceSessions({    // This endpoint requires session cookies.    headers: await headers(),});
```

### [Set active session](https://www.better-auth.com/docs/plugins/multi-session.html#set-active-session)

To set the active session, you can call the `setActive` method.

ClientServer

POST

/multi-session/set-active

```
const { data, error } = await authClient.multiSession.setActive({    sessionToken: "some-session-token", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `sessionToken` | The session token to set as active. | `string` |

POST

/multi-session/set-active

```
const data = await auth.api.setActiveSession({    body: {        sessionToken: "some-session-token", // required    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `sessionToken` | The session token to set as active. | `string` |

### [Revoke a session](https://www.better-auth.com/docs/plugins/multi-session.html#revoke-a-session)

To revoke a session, you can call the `revoke` method.

ClientServer

POST

/multi-session/revoke

```
const { data, error } = await authClient.multiSession.revoke({    sessionToken: "some-session-token", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `sessionToken` | The session token to revoke. | `string` |

POST

/multi-session/revoke

```
const data = await auth.api.revokeDeviceSession({    body: {        sessionToken: "some-session-token", // required    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `sessionToken` | The session token to revoke. | `string` |

### [Signout and Revoke all sessions](https://www.better-auth.com/docs/plugins/multi-session.html#signout-and-revoke-all-sessions)

When a user logs out, the plugin will revoke all active sessions for the user. You can do this by calling the existing `signOut` method, which handles revoking all sessions automatically.

## [Options](https://www.better-auth.com/docs/plugins/multi-session.html#options)

### [Max Sessions](https://www.better-auth.com/docs/plugins/multi-session.html#max-sessions)

You can specify the maximum number of sessions a user can have by passing the `maximumSessions` option to the plugin. By default, the plugin allows 5 sessions per device.

auth.ts

```
import { betterAuth } from "better-auth"
import { multiSession } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        multiSession({
            maximumSessions: 3
        })
    ]
})
```

### [Additional Fields](https://www.better-auth.com/docs/plugins/multi-session.html#additional-fields)

You can infer additional fields for the `user` and `session` schema by passing the `schema` option to both plugins.

Note that this only affects type inference and does not modify the actual database schema.
Make sure that you [extend the core schema](https://www.better-auth.com/docs/concepts/database.html#extending-core-schema) accordingly.

auth.ts

```
import { betterAuth } from "better-auth"
import { multiSession } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        multiSession({
            schema: {
                user: {
                    additionalFields: {
                        lang: {
                            type: "string",
                            required: false,
                            defaultValue: "en"
                        }
                    }
                }
            }
        })
    ]
})
```

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { multiSessionClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        multiSessionClient({
            schema: {
                user: {
                    additionalFields: {
                        lang: {
                            type: "string",
                            required: false,
                            defaultValue: "en"
                        }
                    }
                }
            }
        })
    ]
})
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/multi-session.mdx)

[Previous Page

Last Login Method](https://www.better-auth.com/docs/plugins/last-login-method.html)[Next Page

OAuth Proxy](https://www.better-auth.com/docs/plugins/oauth-proxy.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/multi-session.html#installation)[Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/multi-session.html#add-the-plugin-to-your-auth-config)[Add the client Plugin](https://www.better-auth.com/docs/plugins/multi-session.html#add-the-client-plugin)[Usage](https://www.better-auth.com/docs/plugins/multi-session.html#usage)[List all device sessions](https://www.better-auth.com/docs/plugins/multi-session.html#list-all-device-sessions)[Set active session](https://www.better-auth.com/docs/plugins/multi-session.html#set-active-session)[Revoke a session](https://www.better-auth.com/docs/plugins/multi-session.html#revoke-a-session)[Signout and Revoke all sessions](https://www.better-auth.com/docs/plugins/multi-session.html#signout-and-revoke-all-sessions)[Options](https://www.better-auth.com/docs/plugins/multi-session.html#options)[Max Sessions](https://www.better-auth.com/docs/plugins/multi-session.html#max-sessions)[Additional Fields](https://www.better-auth.com/docs/plugins/multi-session.html#additional-fields)

Ask AI
