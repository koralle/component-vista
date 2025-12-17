---
title: "MySQL | Better Auth"
source_url: "https://www.better-auth.com/docs/adapters/mysql"
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

# MySQL

Copy MarkdownOpen in

MySQL is a popular open-source relational database management system (RDBMS) that is widely used for building web applications and other types of software. It provides a flexible and scalable database solution that allows for efficient storage and retrieval of data.
Read more here: [MySQL](https://www.mysql.com/).

## [Example Usage](https://www.better-auth.com/docs/adapters/mysql.html#example-usage)

Make sure you have MySQL installed and configured.
Then, you can connect it straight into Better Auth.

auth.ts

```
import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
  database: createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "database",
    timezone: "Z", // Important to ensure consistent timezone values
  }),
});
```

For more information, read Kysely's documentation to the
[MySQLDialect](https://kysely-org.github.io/kysely-apidoc/classes/MysqlDialect.html).

## [Schema generation & migration](https://www.better-auth.com/docs/adapters/mysql.html#schema-generation--migration)

The [Better Auth CLI](https://www.better-auth.com/docs/concepts/cli.html) allows you to generate or migrate
your database schema based on your Better Auth configuration and plugins.

| MySQL Schema Generation | MySQL Schema Migration |
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

## [Joins (Experimental)](https://www.better-auth.com/docs/adapters/mysql.html#joins-experimental)

Database joins is useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The Kysely MySQL dialect supports joins out of the box since version `1.4.0`.

To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

auth.ts

```
export const auth = betterAuth({
  experimental: { joins: true }
});
```

It's possible that you may need to run migrations after enabling this feature.

## [Additional Information](https://www.better-auth.com/docs/adapters/mysql.html#additional-information)

MySQL is supported under the hood via the [Kysely](https://kysely.dev/) adapter, any database supported by Kysely would also be supported. ([Read more here](https://www.better-auth.com/docs/adapters/other-relational-databases.html))

If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html).

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/adapters/mysql.mdx)

[Previous Page

Other Social Providers](https://www.better-auth.com/docs/authentication/other-social-providers.html)[Next Page

SQLite](https://www.better-auth.com/docs/adapters/sqlite.html)

### On this page

[Example Usage](https://www.better-auth.com/docs/adapters/mysql.html#example-usage)[Schema generation & migration](https://www.better-auth.com/docs/adapters/mysql.html#schema-generation--migration)[Joins (Experimental)](https://www.better-auth.com/docs/adapters/mysql.html#joins-experimental)[Additional Information](https://www.better-auth.com/docs/adapters/mysql.html#additional-information)

Ask AI
