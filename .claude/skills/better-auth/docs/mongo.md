---
title: "MongoDB Adapter | Better Auth"
source_url: "https://www.better-auth.com/docs/adapters/mongo"
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

# MongoDB Adapter

Copy MarkdownOpen in

MongoDB is a popular NoSQL database that is widely used for building scalable and flexible applications. It provides a flexible schema that allows for easy data modeling and querying.

Before getting started, make sure you have MongoDB installed and configured. For more information, see [MongoDB Documentation](https://www.mongodb.com/docs/)

## [Example Usage](https://www.better-auth.com/docs/adapters/mongo.html#example-usage)

You can use the MongoDB adapter to connect to your database as follows.

auth.ts

```
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});
```

## [Schema generation & migration](https://www.better-auth.com/docs/adapters/mongo.html#schema-generation--migration)

For MongoDB, we don't need to generate or migrate the schema.

## [Joins (Experimental)](https://www.better-auth.com/docs/adapters/mongo.html#joins-experimental)

Database joins is useful when Better-Auth needs to fetch related data from multiple tables in a single query.
Endpoints like `/get-session`, `/get-full-organization` and many others benefit greatly from this feature,
seeing upwards of 2x to 3x performance improvements depending on database latency.

The MongoDB adapter supports joins out of the box since version `1.4.0`.
To enable this feature, you need to set the `experimental.joins` option to `true` in your auth configuration.

auth.ts

```
export const auth = betterAuth({
  experimental: { joins: true }
});
```

## [Additional Information](https://www.better-auth.com/docs/adapters/mongo.html#additional-information)

* If you're looking for performance improvements or tips, take a look at our guide to [performance optimizations](https://www.better-auth.com/docs/guides/optimizing-for-performance.html).

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/adapters/mongo.mdx)

[Previous Page

Prisma](https://www.better-auth.com/docs/adapters/prisma.html)[Next Page

Others](https://www.better-auth.com/docs/adapters/mongo.html)

### On this page

[Example Usage](https://www.better-auth.com/docs/adapters/mongo.html#example-usage)[Schema generation & migration](https://www.better-auth.com/docs/adapters/mongo.html#schema-generation--migration)[Joins (Experimental)](https://www.better-auth.com/docs/adapters/mongo.html#joins-experimental)[Additional Information](https://www.better-auth.com/docs/adapters/mongo.html#additional-information)

Ask AI
