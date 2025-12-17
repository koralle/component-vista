---
title: "SQLite | Better Auth"
source_url: "https://www.better-auth.com/docs/adapters/sqlite"
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

# SQLite

Copy MarkdownOpen in

SQLite is a lightweight, serverless, self-contained SQL database engine that is widely used for local data storage in applications.
Read more [here.](https://www.sqlite.org/)

## [Example Usage](https://www.better-auth.com/docs/adapters/sqlite.html#example-usage)

Better Auth supports multiple SQLite drivers. Choose the one that best fits your environment:

### [Better-SQLite3 (Recommended)](https://www.better-auth.com/docs/adapters/sqlite.html#better-sqlite3-recommended)

The most popular and stable SQLite driver for Node.js:

auth.ts

```
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("database.sqlite"),
});
```

For more information, read Kysely's documentation to the
[SqliteDialect](https://kysely-org.github.io/kysely-apidoc/classes/SqliteDialect.html).

### [Node.js Built-in SQLite (Experimental)](https://www.better-auth.com/docs/adapters/sqlite.html#nodejs-built-in-sqlite-experimental)

The `node:sqlite` module is still experimental and may change at any time. It requires Node.js 22.5.0 or later.

Starting from Node.js 22.5.0, you can use the built-in [SQLite](https://nodejs.org/api/sqlite.html) module:

auth.ts

```
import { betterAuth } from "better-auth";
import { DatabaseSync } from "node:sqlite";

export const auth = betterAuth({
  database: new DatabaseSync("database.sqlite"),
});
```

To run your application with Node.js SQLite:

```
node your-app.js
```

### [Bun Built-in SQLite](https://www.better-auth.com/docs/adapters/sqlite.html#bun-built-in-sqlite)

You can also use the built-in [SQLite](https://bun.com/docs/api/sqlite) module in Bun, which is similar to the Node.js version:

auth.ts

```
import { betterAuth } from "better-auth";
import { Database } from "bun:sqlite";
export const auth = betterAuth({
  database: new Database("database.sqlite"),
});
```

## [Schema generation & migration](https://www.better-auth.com/docs/adapters/sqlite.html#schema-generation--migration)

The [Better Auth CLI](https://www.better-auth.com/docs/concepts/cli.html) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

| SQLite Schema Generation | SQLite Schema Migration |
| --- | --- |
| ✅ Supported | ✅ Supported |

npmpnpmyarnbun

Schema Generation

```
npx @better-auth/cli@latest generate
```

npmpnpmyarnbun

Schema Migration

```
npx @better-auth/cli@latest migrate
```

## [Joins (Experimental)](https://www.better-auth.com/docs/adapters/sqlite.html#joins-experimental)

Database joins is useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The Kysely SQLite dialect supports joins out of the box since version `1.4.0`.
To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

auth.ts

```
export const auth = betterAuth({
  experimental: { joins: true }
});
```

It's possible that you may need to run migrations after enabling this feature.

## [Additional Information](https://www.better-auth.com/docs/adapters/sqlite.html#additional-information)

SQLite is supported under the hood via the [Kysely](https://kysely.dev/) adapter, any database supported by Kysely would also be supported. ([Read more here](https://www.better-auth.com/docs/adapters/other-relational-databases.html))

If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html).

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/adapters/sqlite.mdx)

[Previous Page

MySQL](https://www.better-auth.com/docs/adapters/mysql.html)[Next Page

PostgreSQL](https://www.better-auth.com/docs/adapters/postgresql.html)

### On this page

[Example Usage](https://www.better-auth.com/docs/adapters/sqlite.html#example-usage)[Better-SQLite3 (Recommended)](https://www.better-auth.com/docs/adapters/sqlite.html#better-sqlite3-recommended)[Node.js Built-in SQLite (Experimental)](https://www.better-auth.com/docs/adapters/sqlite.html#nodejs-built-in-sqlite-experimental)[Bun Built-in SQLite](https://www.better-auth.com/docs/adapters/sqlite.html#bun-built-in-sqlite)[Schema generation & migration](https://www.better-auth.com/docs/adapters/sqlite.html#schema-generation--migration)[Joins (Experimental)](https://www.better-auth.com/docs/adapters/sqlite.html#joins-experimental)[Additional Information](https://www.better-auth.com/docs/adapters/sqlite.html#additional-information)

Ask AI
