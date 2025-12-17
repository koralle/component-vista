---
title: "Optimizing for Performance | Better Auth"
source_url: "https://www.better-auth.com/docs/guides/optimizing-for-performance"
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

# Optimizing for Performance

Copy MarkdownOpen in

In this guide, we’ll go over some of the ways you can optimize your application for a more performant Better Auth app.

## [Caching](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#caching)

Caching is a powerful technique that can significantly improve the performance of your Better Auth application by reducing the number of database queries and speeding up response times.

### [Cookie Cache](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#cookie-cache)

Calling your database every time `useSession` or `getSession` is invoked isn’t ideal, especially if sessions don’t change frequently. Cookie caching handles this by storing session data in a short-lived, signed cookie similar to how JWT access tokens are used with refresh tokens.

To turn on cookie caching, just set `session.cookieCache` in your auth config:

auth.ts

```
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});
```

Read more about [cookie caching](https://www.better-auth.com/docs/concepts/session-management.html#cookie-cache).

### [Framework Caching](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#framework-caching)

Here are examples of how you can do caching in different frameworks and environments:

NextRemixSolidStartReact Query

Since Next v15, we can use the `"use cache"` directive to cache the response of a server function.

```
export async function getUsers() {
    'use cache'
    const { users } = await auth.api.listUsers();
    return users
}
```

Learn more about NextJS use cache directive [here](https://nextjs.org/docs/app/api-reference/directives/use-cache).

In Remix, you can use the `cache` option in the `loader` function to cache responses on the server. Here’s an example:

```
import { json } from '@remix-run/node';

export const loader = async () => {
const { users } = await auth.api.listUsers();
return json(users, {
    headers: {
    'Cache-Control': 'max-age=3600', // Cache for 1 hour
    },
});
};
```

You can read a nice guide on Loader vs Route Cache Headers in Remix [here](https://sergiodxa.com/articles/loader-vs-route-cache-headers-in-remix).

In SolidStart, you can use the `query` function to cache data. Here’s an example:

```
const getUsers = query(
    async () => (await auth.api.listUsers()).users,
    "getUsers"
);
```

Learn more about SolidStart `query` function [here](https://docs.solidjs.com/solid-router/reference/data-apis/query).

With React Query you can use the `useQuery` hook to cache data. Here’s an example:

```
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
    const { users } = await auth.api.listUsers();
    return users;
};

export default function Users() {
    const { data: users, isLoading } = useQuery('users', fetchUsers, {
        staleTime: 1000 * 60 * 15, // Cache for 15 minutes
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

Learn more about React Query use cache directive [here](https://react-query.tanstack.com/reference/useQuery#usecache).

## [SSR Optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#ssr-optimizations)

If you're using a framework that supports server-side rendering, it's usually best to pre-fetch the user session on the server and use it as a fallback on the client.

```
const session = await auth.api.getSession({
  headers: await headers(),
});
//then pass the session to the client
```

## [Database optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#database-optimizations)

Optimizing database performance is essential to get the best out of Better Auth.

#### [Recommended fields to index](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#recommended-fields-to-index)

| Table | Fields | Plugin |
| --- | --- | --- |
| users | `email` |  |
| accounts | `userId` |  |
| sessions | `userId`, `token` |  |
| verifications | `identifier` |  |
| invitations | `email`, `organizationId` | organization |
| members | `userId`, `organizationId` | organization |
| organizations | `slug` | organization |
| passkey | `userId` | passkey |
| twoFactor | `secret` | twoFactor |

We intend to add indexing support in our schema generation tool in the future.

## [Bundle Size Optimization](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#bundle-size-optimization)

If you're using custom adapters (like Prisma, Drizzle, or MongoDB), you can reduce your bundle size by using `better-auth/minimal` instead of `better-auth`. This version excludes Kysely, which is only needed when using direct database connections.

### [Usage](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#usage)

Simply import from `better-auth/minimal` instead of `better-auth`:

PrismaDrizzleMongoDB

auth.ts

```
import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite"
  }),
});
```

auth.ts

```
import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
});
```

auth.ts

```
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
});
```

**Limitations:**

* Direct database connections are not supported (you must use an adapter)
* Built-in migrations are not supported. Use external migration tools (or use `better-auth` if you need built-in migration support)

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/guides/optimizing-for-performance.mdx)

[Previous Page

SAML SSO with Okta](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html)[Next Page

Migration](https://www.better-auth.com/docs/guides/optimizing-for-performance.html)

### On this page

[Caching](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#caching)[Cookie Cache](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#cookie-cache)[Framework Caching](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#framework-caching)[SSR Optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#ssr-optimizations)[Database optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#database-optimizations)[Recommended fields to index](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#recommended-fields-to-index)[Bundle Size Optimization](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#bundle-size-optimization)[Usage](https://www.better-auth.com/docs/guides/optimizing-for-performance.html#usage)

Ask AI
