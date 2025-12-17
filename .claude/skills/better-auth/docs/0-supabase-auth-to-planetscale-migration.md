---
title: "Migrate from Supabase Auth to Better Auth + PlanetScale PostgreSQL"
source_url: "https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration"
fetched_at: "2025-12-17T17:03:49.997163+00:00"
---



# Migrate from Supabase Auth to Better Auth + PlanetScale PostgreSQL

This migration guide aims to guide you move your auth from Supabase Auth to Better Auth on PlanetScale PostgreSQL.

D

Dagmawi Esayas·Aug 25

[Blogs](https://www.better-auth.com/blog.html)

---

# [Supabase Auth to Better Auth + PlanetScale PostgreSQL Migration Guide](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#supabase-auth-to-better-auth--planetscale-postgresql-migration-guide)

Recently, [PlanetScale announced](https://planetscale.com/blog/planetscale-for-postgres) support for PostgreSQL. This is exciting news for developers and a big step forward for the database industry.

We’ve noticed that some users are migrating from Supabase to PlanetScale PostgreSQL, but facing challenges because they also rely on Supabase Auth. This guide will help you migrate your authentication from Supabase Auth to Better Auth on PlanetScale PostgreSQL.

## [1. Setup a PlanetScale Database](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#1-setup-a-planetscale-database)

Open the PlanetScale [dashboard](https://app.planetscale.com/)

Create a [new database](https://www.better-auth.com/blog/%5Bhttps://app.planetscale.com/new%5D(https://app.planetscale.com/new?org=better-auth))

Get your connection string (PostgreSQL URI)

```
postgresql://<username>:<password>@<host>/postgres?sslmode=verify-full
```

Save the database URL in your `.env` file for later use with Better Auth:

.env

```
DATABASE_URL =
  postgresql://<username>:<password>@<host>/postgres?sslmode=verify-full
```

This is what will be in the `database` field of our auth config

## [2. Install Better Auth](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#2-install-better-auth)

Install Better Auth

npmpnpmyarnbun

```
npm install better-auth
```

Follow and complete the basic setup
[here](https://www.better-auth.com/docs/installation.html)

Make sure to set up all required environment variables as per the docs.

## [3. Install PostgreSQL Client](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#3-install-postgresql-client)

Install the `pg` package and its types:

npmpnpmyarnbun

```
npm install pg
npm install --save-dev @types/pg
```

## [4. Generate & Migrate Better Auth Schema](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#4-generate--migrate-better-auth-schema)

Run this cli command to generate all the schema needed to setup Better Auth:

```
npx @better-auth/cli generate
```

Then run this command to apply the generated schema to your PlanetScale
database:

```
npx @better-auth/cli migrate
```

You should now have the required auth tables in PlanetScale.

### [5. Quick Check](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#5-quick-check)

Your auth config should be like this:

auth.tsauth-client.ts

```
import { Pool } from "pg";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

```
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = createAuthClient();
```

### [6. The Fun Part](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#6-the-fun-part)

Now comes the fun part. You are now all setup to move your auth from Supabase Auth to Better Auth and all you have to do is go through the instances you've used Supabase Auth client and replace it with Better Auth client. We are going to see a few examples here.

sign upsign insession

```
// Supabase Auth
await supabase.auth.signUp({
  email,
  password,
});

// Better Auth
await authClient.signUp.email({
  email,
  password,
  name: "John",
});
```

```
// Supabase
await supabase.auth.signInWithPassword({
  email,
  password,
});

// Better Auth
await authClient.signIn.email({
  email,
  password,
});
```

```
// Supabase
const { data, error } = await supabase.auth.getClaims();

// Better Auth
const { data, error } = await authClient.useSession();
```

### [7. Migrate your users from Supabase Auth](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#7-migrate-your-users-from-supabase-auth)

This migration will invalidate all active sessions. While this guide doesn't
currently cover migrating two-factor (2FA) or Row Level Security (RLS)
configurations, both should be possible with additional steps.

For a more detailed guide checkout [this
guide](https://www.better-auth.com/docs/guides/supabase-migration-guide.html) we
made.

Essentially you should be able to copy the following code into `migration.ts` and run it.

migration.ts

```
import { Pool } from "pg";
import { auth } from "./lib/auth";
import { User as SupabaseUser } from "@supabase/supabase-js";

type User = SupabaseUser & {
  is_super_admin: boolean;
  raw_user_meta_data: {
    avatar_url: string;
  };
  encrypted_password: string;
  email_confirmed_at: string;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
  identities: {
    provider: string;
    identity_data: {
      sub: string;
      email: string;
    };
    created_at: string;
    updated_at: string;
  };
};

const migrateFromSupabase = async () => {
  const ctx = await auth.$context;
  const db = ctx.options.database as Pool;
  const users = await db
    .query(
      `
			SELECT
				u.*,
				COALESCE(
					json_agg(
						i.* ORDER BY i.id
					) FILTER (WHERE i.id IS NOT NULL),
					'[]'::json
				) as identities
			FROM auth.users u
			LEFT JOIN auth.identities i ON u.id = i.user_id
			GROUP BY u.id
		`
    )
    .then((res) => res.rows as User[]);
  for (const user of users) {
    if (!user.email) {
      continue;
    }
    await ctx.adapter
      .create({
        model: "user",
        data: {
          id: user.id,
          email: user.email,
          name: user.email,
          role: user.is_super_admin ? "admin" : user.role,
          emailVerified: !!user.email_confirmed_at,
          image: user.raw_user_meta_data.avatar_url,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at),
          isAnonymous: user.is_anonymous,
        },
      })
      .catch(() => {});
    for (const identity of user.identities) {
      const existingAccounts = await ctx.internalAdapter.findAccounts(user.id);

      if (identity.provider === "email") {
        const hasCredential = existingAccounts.find(
          (account: { providerId: string }) =>
            account.providerId === "credential"
        );
        if (!hasCredential) {
          await ctx.adapter
            .create({
              model: "account",
              data: {
                userId: user.id,
                providerId: "credential",
                accountId: user.id,
                password: user.encrypted_password,
                createdAt: new Date(user.created_at),
                updatedAt: new Date(user.updated_at),
              },
            })
            .catch(() => {});
        }
      }
      const supportedProviders = Object.keys(ctx.options.socialProviders || {});
      if (supportedProviders.includes(identity.provider)) {
        const hasAccount = existingAccounts.find(
          (account: { providerId: string }) =>
            account.providerId === identity.provider
        );
        if (!hasAccount) {
          await ctx.adapter.create({
            model: "account",
            data: {
              userId: user.id,
              providerId: identity.provider,
              accountId: identity.identity_data?.sub,
              createdAt: new Date(identity.created_at ?? user.created_at),
              updatedAt: new Date(identity.updated_at ?? user.updated_at),
            },
          });
        }
      }
    }
  }
};
migrateFromSupabase();
```

Run the migration script

Terminal

```
bun migration.ts # or use node, ts-node, etc.
```

### [8. Migrate the Rest of Your Data](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#8-migrate-the-rest-of-your-data)

If you have additional user-related data in Supabase, you can use the [Supabase to PlanetScale migration tool](https://planetscale.com/docs/postgres/imports/supabase).

### [9. Clean up all the Supabase Auth code from your codebase](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#9-clean-up-all-the-supabase-auth-code-from-your-codebase)

You now own your auth, you should start removing all the Supabase Auth related code.

### [10. Done! 🎉](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#10-done-)

You've successfully migrated from Supabase Auth to Better Auth on PlanetScale.

### [Tips](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#tips)

* Double-check that all environment variables are set in production.
* Test all auth flows (sign-up, login, password reset, session refresh) before going live.
* Remember that this is just the basics and if you've integrated Supabase Auth's auth functions in a lot of placed you'd have to find the suitable Better Auth replacements [here](https://www.better-auth.com/docs.html).
* Have fun!

### [Learn More!](https://www.better-auth.com/blog/0-supabase-auth-to-planetscale-migration.html#learn-more)

[### Better Auth Setup

Get started with installing Better Auth](https://www.better-auth.com/docs.html)[### PlanetScale Quick Start

Get started on PlanetScale here](https://planetscale.com/docs/vitess/tutorials/planetscale-quick-start-guide)[### PlanetScale Migration Guides

Use this guide to move your data from Supabase and many more services](https://planetscale.com/docs/postgres/imports/postgres-imports)[### Supabase Auth Migration

Move your auth from Supabase Auth to your own DB](https://www.better-auth.com/docs/guides/supabase-migration-guide.html)
