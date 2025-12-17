---
title: "Migrating from Auth.js to Better Auth | Better Auth"
source_url: "https://www.better-auth.com/docs/guides/next-auth-migration-guide"
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

# Migrating from Auth.js to Better Auth

Copy MarkdownOpen in

## [Introduction](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#introduction)

In this guide, we'll walk through the steps to migrate a project from [Auth.js](https://authjs.dev/) (formerly [NextAuth.js](https://next-auth.js.org/)) to Better Auth. Since these projects have different design philosophies, the migration requires careful planning and work. If your current setup is working well, there's no urgent need to migrate. We continue to handle security patches and critical issues for Auth.js.

However, if you're starting a new project or facing challenges with your current setup, we strongly recommend using Better Auth. Our roadmap includes features previously exclusive to Auth.js, and we hope this will unite the ecosystem more strongly without causing fragmentation.

## [Create Better Auth Instance](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#create-better-auth-instance)

Before starting the migration process, set up Better Auth in your project. Follow the [installation guide](https://www.better-auth.com/docs/installation.html) to get started.

For example, if you use the GitHub OAuth provider, here is a comparison of the `auth.ts` file.

Auth.jsBetter Auth

```
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})
```

```
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
})
```

Now Better Auth supports stateless session management without any database. If you were using a Database adapter in Auth.js, you can refer to the [Database models](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#database-models) below to check the differences with Better Auth's core schema.

## [Create Client Instance](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#create-client-instance)

This client instance includes a set of functions for interacting with the Better Auth server instance. For more information, see [here](https://www.better-auth.com/docs/concepts/client.html).

auth-client.ts

```
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()
```

## [Update the Route Handler](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#update-the-route-handler)

Rename the `/app/api/auth/[...nextauth]` folder to `/app/api/auth/[...all]` to avoid confusion. Then, update the `route.ts` file as follows:

Auth.jsBetter Auth

```
import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers
```

```
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth)
```

## [Session Management](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#session-management)

In this section, we'll look at how to manage sessions in Better Auth compared to Auth.js. For more information, see [here](https://www.better-auth.com/docs/concepts/session-management.html).

### [Client-side](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#client-side)

#### [Sign In](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-in)

Here are the differences between Auth.js and Better Auth for signing in users. For example, with the GitHub OAuth provider:

Auth.jsBetter Auth

```
"use client"

import { signIn } from "next-auth/react"

signIn("github")
```

```
"use client"

import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.signIn.social({
  provider: "github",
})
```

#### [Sign Out](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-out)

Here are the differences between Auth.js and Better Auth when signing out users.

Auth.jsBetter Auth

```
"use client"

import { signOut } from "next-auth/react"

signOut()
```

```
"use client"

import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.signOut()
```

#### [Get Session](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#get-session)

Here are the differences between Auth.js and Better Auth for getting the current active session.

Auth.jsBetter Auth

```
"use client"

import { useSession } from "next-auth/react"

const { data, status, update } = useSession()
```

```
"use client"

import { authClient } from "@/lib/auth-client";

const { data, error, refetch, isPending, isRefetching } = authClient.useSession()
```

### [Server-side](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#server-side)

#### [Sign In](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-in-1)

Here are the differences between Auth.js and Better Auth for signing in users. For example, with the GitHub OAuth provider:

Auth.jsBetter Auth

```
import { signIn } from "@/lib/auth"

await signIn("github")
```

```
import { auth } from "@/lib/auth";

const { redirect, url } = await auth.api.signInSocial({
  body: {
    provider: "github",
  },
})
```

#### [Sign Out](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-out-1)

Here are the differences between Auth.js and Better Auth when signing out users.

Auth.jsBetter Auth

```
import { signOut } from "@/lib/auth"

await signOut()
```

```
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const { success } = await auth.api.signOut({
  headers: await headers(),
})
```

#### [Get Session](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#get-session-1)

Here are the differences between Auth.js and Better Auth for getting the current active session.

Auth.jsBetter Auth

```
import { auth } from "@/lib/auth";

const session = await auth()
```

```
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({
  headers: await headers(),
})
```

## [Protecting Resources](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#protecting-resources)

> Proxy(Middleware) is not intended for slow data fetching. While Proxy can be helpful for optimistic checks such as permission-based redirects, it should not be used as a full session management or authorization solution. - [Next.js docs](https://nextjs.org/docs/app/getting-started/proxy#use-cases)

Auth.js offers approaches using Proxy (Middleware), but we recommend handling auth checks on each page or route rather than in a Proxy or Layout. Here is a basic example of protecting resources with Better Auth.

Client-sideServer-side

app/dashboard/page.tsx

```
"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data, error, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Pending</div>;
  }
  if (!data || error) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Welcome {data.user.name}</h1>
    </div>
  );
};

export default DashboardPage;
```

app/dashboard/page.tsx

```
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
};

export default DashboardPage;
```

## [Database models](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#database-models)

Both Auth.js and Better Auth provide stateless (JWT) and database session strategies. If you were using the database session strategy in Auth.js and plan to continue using it in Better Auth, you will also need to migrate your database.

Just like Auth.js has database models, Better Auth also has a core schema. In this section, we'll compare the two and explore the differences between them.

### [User -> User](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#user---user)

Auth.jsBetter Auth

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each user |
| name | string | ? | User's chosen display name |
| email | string | ? | User's email address for communication and login |
| emailVerified | Date | ? | When the user's email was verified |
| image | string | ? | User's image url |

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each user |
| name | string | - | User's chosen display name |
| email | string | - | User's email address for communication and login |
| emailVerified | boolean | - | Whether the user's email is verified |
| image | string | ? | User's image url |
| createdAt | Date | - | Timestamp of when the user account was created |
| updatedAt | Date | - | Timestamp of the last update to the user's information |

### [Session -> Session](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#session---session)

Auth.jsBetter Auth

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each session |
| userId | string | FK | The ID of the user |
| sessionToken | string | - | The unique session token |
| expires | Date | - | The time when the session expires |

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each session |
| userId | string | FK | The ID of the user |
| token | string | - | The unique session token |
| expiresAt | Date | - | The time when the session expires |
| ipAddress | string | ? | The IP address of the device |
| userAgent | string | ? | The user agent information of the device |
| createdAt | Date | - | Timestamp of when the session was created |
| updatedAt | Date | - | Timestamp of when the session was updated |

### [Account -> Account](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#account---account)

Auth.jsBetter Auth

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each account |
| userId | string | FK | The ID of the user |
| type | string | - | Type of the account (e.g. 'oauth', 'email', 'credentials') |
| provider | string | - | Provider identifier |
| providerAccountId | string | - | Account ID from the provider |
| refresh\_token | string | ? | The refresh token of the account. Returned by the provider |
| access\_token | string | ? | The access token of the account. Returned by the provider |
| expires\_at | number | ? | The time when the access token expires |
| token\_type | string | ? | Type of the token |
| scope | string | ? | The scope of the account. Returned by the provider |
| id\_token | string | ? | The ID token returned from the provider |
| session\_state | string | ? | OAuth session state |

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each account |
| userId | string | FK | The ID of the user |
| accountId | string | - | The ID of the account as provided by the SSO or equal to userId for credential accounts |
| providerId | string | - | The ID of the provider |
| accessToken | string | ? | The access token of the account. Returned by the provider |
| refreshToken | string | ? | The refresh token of the account. Returned by the provider |
| accessTokenExpiresAt | Date | ? | The time when the access token expires |
| refreshTokenExpiresAt | Date | ? | The time when the refresh token expires |
| scope | string | ? | The scope of the account. Returned by the provider |
| idToken | string | ? | The ID token returned from the provider |
| password | string | ? | The password of the account. Mainly used for email and password authentication |
| createdAt | Date | - | Timestamp of when the account was created |
| updatedAt | Date | - | Timestamp of when the account was updated |

### [VerificationToken -> Verification](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#verificationtoken---verification)

Auth.jsBetter Auth

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| identifier | string | PK | Identifier for the verification request |
| token | string | PK | The verification token |
| expires | Date | - | The time when the verification token expires |

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each verification |
| identifier | string | - | The identifier for the verification request |
| value | string | - | The value to be verified |
| expiresAt | Date | - | The time when the verification request expires |
| createdAt | Date | - | Timestamp of when the verification request was created |
| updatedAt | Date | - | Timestamp of when the verification request was updated |

### [Comparison](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#comparison)

Table: **User**

* `name`, `email`, and `emailVerified` are required in Better Auth, while optional in Auth.js
* `emailVerified` uses a boolean in Better Auth, while Auth.js uses a timestamp
* Better Auth includes `createdAt` and `updatedAt` timestamps

Table: **Session**

* Better Auth uses `token` instead of `sessionToken`
* Better Auth uses `expiresAt` instead of `expires`
* Better Auth includes `ipAddress` and `userAgent` fields
* Better Auth includes `createdAt` and `updatedAt` timestamps

Table: **Account**

* Better Auth uses camelCase naming (e.g. `refreshToken` vs `refresh_token`)
* Better Auth includes `accountId` to distinguish between the account ID and internal ID
* Better Auth uses `providerId` instead of `provider`
* Better Auth includes `accessTokenExpiresAt` and `refreshTokenExpiresAt` for token management
* Better Auth includes `password` field to support built-in credential authentication
* Better Auth does not have a `type` field as it's determined by the `providerId`
* Better Auth removes `token_type` and `session_state` fields
* Better Auth includes `createdAt` and `updatedAt` timestamps

Table: **VerificationToken -> Verification**

* Better Auth uses `Verification` table instead of `VerificationToken`
* Better Auth uses a single `id` primary key instead of composite primary key
* Better Auth uses `value` instead of `token` to support various verification types
* Better Auth uses `expiresAt` instead of `expires`
* Better Auth includes `createdAt` and `updatedAt` timestamps

If you were using Auth.js v4, note that v5 does not introduce any breaking changes to the database schema. Optional fields like `oauth_token_secret` and `oauth_token` can be removed if you are not using them. Rarely used fields like `refresh_token_expires_in` can also be removed.

### [Customization](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#customization)

You may have extended the database models or implemented additional logic in Auth.js. Better Auth allows you to customize the core schema in a type-safe way. You can also define custom logic during the lifecycle of database operations. For more details, see [Concepts - Database](https://www.better-auth.com/docs/concepts/database.html).

## [Wrapping Up](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#wrapping-up)

Now you're ready to migrate from Auth.js to Better Auth. For a complete implementation with multiple authentication methods, check out the [Next.js Demo App](https://github.com/better-auth/better-auth/tree/canary/demo/nextjs). Better Auth offers greater flexibility and more features, so be sure to explore the [documentation](https://www.better-auth.com/docs.html) to unlock its full potential.

If you need help with migration, join our [community](https://www.better-auth.com/community.html) or reach out to [contact@better-auth.com](mailto:contact@better-auth.com).

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/guides/next-auth-migration-guide.mdx)

[Previous Page

Migration](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html)[Next Page

Auth0 Migration Guide](https://www.better-auth.com/docs/guides/auth0-migration-guide.html)

### On this page

[Introduction](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#introduction)[Create Better Auth Instance](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#create-better-auth-instance)[Create Client Instance](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#create-client-instance)[Update the Route Handler](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#update-the-route-handler)[Session Management](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#session-management)[Client-side](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#client-side)[Sign In](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-in)[Sign Out](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-out)[Get Session](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#get-session)[Server-side](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#server-side)[Sign In](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-in-1)[Sign Out](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#sign-out-1)[Get Session](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#get-session-1)[Protecting Resources](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#protecting-resources)[Database models](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#database-models)[User -> User](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#user---user)[Session -> Session](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#session---session)[Account -> Account](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#account---account)[VerificationToken -> Verification](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#verificationtoken---verification)[Comparison](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#comparison)[Customization](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#customization)[Wrapping Up](https://www.better-auth.com/docs/guides/next-auth-migration-guide.html#wrapping-up)

Ask AI
