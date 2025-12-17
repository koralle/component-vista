---
title: "Prisma | Better Auth"
source_url: "https://www.better-auth.com/docs/adapters/prisma"
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

# Prisma

Copy MarkdownOpen in

Prisma ORM is an open-source database toolkit that simplifies database access and management in applications by providing a type-safe query builder and an intuitive data modeling interface.

Before getting started, make sure you have Prisma installed and configured. For more information, see [Prisma Documentation](https://www.prisma.io/docs/)

## [Example Usage](https://www.better-auth.com/docs/adapters/prisma.html#example-usage)

You can use the Prisma adapter to connect to your database as follows.

auth.ts

```
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
});
```

Starting from Prisma 7, the `output` path field is required. If you have configured a custom output path in your `schema.prisma` file (e.g., `output = "../src/generated/prisma"`), make sure to import the Prisma client from that location instead of `@prisma/client`. For more information, see [here](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client#the-location-of-prisma-client).

## [Schema generation & migration](https://www.better-auth.com/docs/adapters/prisma.html#schema-generation--migration)

The [Better Auth CLI](https://www.better-auth.com/docs/concepts/cli.html) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

| Prisma Schema Generation | Prisma Schema Migration |
| --- | --- |
| ✅ Supported | ❌ Not Supported |

npmpnpmyarnbun

Schema Generation

```
npx @better-auth/cli@latest generate
```

## [Joins (Experimental)](https://www.better-auth.com/docs/adapters/prisma.html#joins-experimental)

Database joins is useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The Prisma adapter supports joins out of the box since version `1.4.0`.
To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

auth.ts

```
export const auth = betterAuth({
  experimental: { joins: true }
});
```

Please make sure that your Prisma schema has the necessary relations defined.
If you do not see any relations in your Prisma schema, you can manually add them using the `@relation` directive
or run our latest CLI version `npx @better-auth/cli@latest generate` to generate a new Prisma schema with the relations.

## [Additional Information](https://www.better-auth.com/docs/adapters/prisma.html#additional-information)

* If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html).
* [How to use Prisma ORM with Better Auth and Next.js](https://www.prisma.io/docs/guides/betterauth-nextjs)

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/adapters/prisma.mdx)

[Previous Page

Drizzle](https://www.better-auth.com/docs/adapters/drizzle.html)[Next Page

MongoDB](https://www.better-auth.com/docs/adapters/mongo.html)

### On this page

[Example Usage](https://www.better-auth.com/docs/adapters/prisma.html#example-usage)[Schema generation & migration](https://www.better-auth.com/docs/adapters/prisma.html#schema-generation--migration)[Joins (Experimental)](https://www.better-auth.com/docs/adapters/prisma.html#joins-experimental)[Additional Information](https://www.better-auth.com/docs/adapters/prisma.html#additional-information)

Ask AI
