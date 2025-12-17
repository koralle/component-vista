---
title: "Migrating from WorkOS to Better Auth | Better Auth"
source_url: "https://www.better-auth.com/docs/guides/workos-migration-guide"
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

# Migrating from WorkOS to Better Auth

Copy MarkdownOpen in

In this guide, we’ll walk through how to migrate a project from WorkOS to Better Auth, covering how to move a basic WorkOS setup integrated with a Next.js app and the key considerations to keep in mind.

## [Before we begin](https://www.better-auth.com/docs/guides/workos-migration-guide.html#before-we-begin)

Before getting started, let’s review which WorkOS authentication features are fully or partially supported in Better Auth. If a feature you use in WorkOS is available via a plugin, you’ll need to configure it in the next step.

### 🟢 Supported

### 🟡 Partially supported

## [Create Better Auth Instance](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-better-auth-instance)

First, set up Better Auth in your project. Follow the [installation guide](https://www.better-auth.com/docs/installation.html) to get started.

### [Database](https://www.better-auth.com/docs/guides/workos-migration-guide.html#database)

Better Auth supports various databases. Set up your preferred database. In this guide, we’ll use PostgreSQL with the default database adapter.

auth.ts

```
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});
```

### [Email & Password](https://www.better-auth.com/docs/guides/workos-migration-guide.html#email--password)

Enable Email & Password authentication as shown below. Since WorkOS verifies each user’s email by default, this setup is similar to the default behavior. You can adjust it if needed. For more information, see [here](https://www.better-auth.com/docs/authentication/email-password.html).

```
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 10,
    sendResetPassword: async ({ user, url, token }, request) => {
      // Implement your email sending logic
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // Implement your email sending logic
    },
  },
});
```

### [Social Providers (optional)](https://www.better-auth.com/docs/guides/workos-migration-guide.html#social-providers-optional)

Set up the social providers you used in WorkOS as follows. Better Auth supports a wider range of providers, so you can add more if needed. Since WorkOS ensures emails are unique, configure `account.accountLinking` in Better Auth to ensure the same behavior.

```
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  // ... other options

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    // ... other providers
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password", "github"],
    },
  },
});
```

### [Additional Fields](https://www.better-auth.com/docs/guides/workos-migration-guide.html#additional-fields)

You probably used metadata in WorkOS. To preserve that metadata and the user id from WorkOS (e.g., user\_01KBT4BMFF7ASGRDD0WZ6W63FF), extend the `user` schema as shown below. Better Auth provides a more flexible way to store user data. For more information, see [here](https://www.better-auth.com/docs/concepts/database.html#extending-core-schema).

auth.ts

```
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  // ... other options

  user: {
    additionalFields: {
      metadata: {
        type: "json",
        required: false,
        defaultValue: null,
      },
    },
  },
});
```

### [Plugins](https://www.better-auth.com/docs/guides/workos-migration-guide.html#plugins)

Refer to the [section](https://www.better-auth.com/docs/guides/workos-migration-guide.html#before-we-begin) mapping WorkOS features to Better Auth. If a feature you used in WorkOS is available as a Better Auth plugin, add it to the plugin options. Better Auth provides a wider range of out-of-the-box features through plugins. For more information, see [here](https://www.better-auth.com/docs/concepts/plugins.html).

auth.ts

```
import { betterAuth } from "better-auth";
import { haveIBeenPwned } from "better-auth/plugins/haveibeenpwned";
import { Pool } from "pg";

export const auth = betterAuth({
  // ... other options

  plugins: [
    haveIBeenPwned()
    // ... other plugins
  ],
});
```

If you rely on advanced WorkOS features beyond basic email+password and social login, refer to the feature mapping above to configure the appropriate plugins.

## [Generate Schema](https://www.better-auth.com/docs/guides/workos-migration-guide.html#generate-schema)

Better Auth allows you to control your own database, and you can easily generate the appropriate schema for your auth instance using the CLI. For more information, see [here](https://www.better-auth.com/docs/concepts/cli.html).

### [Default database adapter](https://www.better-auth.com/docs/guides/workos-migration-guide.html#default-database-adapter)

Run the `migrate` command to create the schema for your Better Auth instance in the database.

npmpnpmyarnbun

```
npx @better-auth/cli migrate
```

### [Other database adapters](https://www.better-auth.com/docs/guides/workos-migration-guide.html#other-database-adapters)

If you’re using a database adapter like Prisma or Drizzle, use the `generate` command to create the schema for your ORM. After that, run the migration with an external tool such as Drizzle Kit.

npmpnpmyarnbun

```
npx @better-auth/cli generate
```

## [Migration Script](https://www.better-auth.com/docs/guides/workos-migration-guide.html#migration-script)

### [Create Migration Script](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-migration-script)

Create a migration script to import your user data from WorkOS into your database.

scripts/migration.ts

```
import { auth } from "@/lib/auth"; // Your auth instance path
import { WorkOS } from "@workos-inc/node";

//==============================================================================

/*
  Rate limiting configuration

  WorkOS Read APIs: 1,000 requests per 10 seconds
  Default setting: Use 80% of limit to avoid edge cases

  Reference: https://workos.com/docs/reference/rate-limits
*/
const TIME_WINDOW_MS = 10 * 1000; // Time window in ms (10 seconds)
const MAX_REQUESTS_PER_WINDOW = 800; // Maximum API calls per time window
const USERS_PER_REQUEST = 100; // How many users to fetch per API call

//==============================================================================

if (!process.env.WORKOS_API_KEY || !process.env.WORKOS_CLIENT_ID) {
  throw new Error(
    "Missing required environment variables WORKOS_API_KEY and/or WORKOS_CLIENT_ID",
  );
}
const workos = new WorkOS(process.env.WORKOS_API_KEY);

/**
 * Create a rate limiter to track and control request rate
 */
const createRateLimiter = (maxRequests: number, windowMs: number) => {
  let requestTimestamps: number[] = [];

  const waitIfNeeded = async (): Promise<void> => {
    const now = Date.now();

    // Remove timestamps outside the current window
    requestTimestamps = requestTimestamps.filter(
      (timestamp) => now - timestamp < windowMs,
    );

    // If we've hit the limit, calculate wait time
    if (requestTimestamps.length >= maxRequests) {
      const oldestTimestamp = requestTimestamps[0]!;
      const waitTime = windowMs - (now - oldestTimestamp) + 1000; // 1 sec buffer

      console.log(
        `⏳ Throttling (${requestTimestamps.length}/${maxRequests} calls used). Waiting ${Math.ceil(waitTime / 1000)}s...`,
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      // Clean up old timestamps after waiting
      const newNow = Date.now();
      requestTimestamps = requestTimestamps.filter(
        (timestamp) => newNow - timestamp < windowMs,
      );
    }

    // Record this request
    requestTimestamps.push(Date.now());
  };

  const getStats = (): {
    current: number;
    max: number;
    windowMinutes: number;
  } => {
    const now = Date.now();
    requestTimestamps = requestTimestamps.filter(
      (timestamp) => now - timestamp < windowMs,
    );

    return {
      current: requestTimestamps.length,
      max: maxRequests,
      windowMinutes: windowMs / (60 * 1000),
    };
  };

  return { waitIfNeeded, getStats };
};

/**
 * Safely converts various date formats to Date object.
 * Returns current date if conversion fails (safe for createdAt/updatedAt).
 */
const safeDateConversion = (date?: string | number | Date | null): Date => {
  if (date == null) return new Date();

  if (date instanceof Date) return new Date(date.getTime());

  if (typeof date === "number") {
    if (!Number.isFinite(date)) return new Date();
    return new Date(date);
  }

  if (typeof date === "string") {
    const trimmed = date.trim();
    if (trimmed === "") return new Date();
    const parsed = new Date(trimmed);
    if (isNaN(parsed.getTime())) return new Date();
    return parsed;
  }

  return new Date();
};

/**
 * Safely converts firstName and lastName to a full name string.
 * Returns "Username" if both names are empty.
 */
const safeNameConversion = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const trimmedFirstName = firstName?.trim();
  const trimmedLastName = lastName?.trim();

  if (trimmedFirstName && trimmedLastName) {
    return `${trimmedFirstName} ${trimmedLastName}`;
  }

  if (trimmedFirstName) return trimmedFirstName;
  if (trimmedLastName) return trimmedLastName;

  return "Username";
};

async function migrateFromWorkOS() {
  const ctx = await auth.$context;
  const rateLimiter = createRateLimiter(
    MAX_REQUESTS_PER_WINDOW,
    TIME_WINDOW_MS,
  );

  let totalUsers = 0;
  let migratedUsers = 0;
  let skippedUsers = 0;
  let failedUsers = 0;

  let hasMoreUsers = true;
  let after: string | undefined;
  let batchCount = 0;

  console.log("");
  console.log("=".repeat(40));
  console.log("🚀 Starting migration");
  console.log("");
  console.log(`Settings:`);
  console.log(
    ` - Max API calls: ${MAX_REQUESTS_PER_WINDOW} per ${TIME_WINDOW_MS / 1000}s`,
  );
  console.log(` - Users per call: ${USERS_PER_REQUEST}`);
  console.log("=".repeat(40));
  console.log("");

  while (hasMoreUsers) {
    try {
      await rateLimiter.waitIfNeeded();

      const workosUserList = await workos.userManagement.listUsers({
        limit: USERS_PER_REQUEST,
        after,
      });

      batchCount++;
      console.log(
        `📦 Batch ${batchCount}: Fetched ${workosUserList.data.length} users from WorkOS`,
      );

      after = workosUserList.listMetadata.after || undefined;
      hasMoreUsers = !!after;
      totalUsers += workosUserList.data.length;

      for (const workosUser of workosUserList.data) {
        try {
          console.log(`\nProcessing user: ${workosUser.email}`);

          // Check if user already exists by email
          // WorkOS ensures all user emails are unique via an email verification process
          const existingUser = await ctx.adapter.findOne<
            typeof auth.$Infer.Session.user
          >({
            model: "user",
            where: [
              {
                field: "email",
                value: workosUser.email,
              },
            ],
          });

          if (existingUser) {
            console.log(
              `🟡 User already exists, skipping: ${workosUser.email}`,
            );
            skippedUsers++;
            continue;
          }

          // Create the user
          await ctx.adapter.create<typeof auth.$Infer.Session.user>({
            model: "user",
            data: {
              email: workosUser.email,
              emailVerified: workosUser.emailVerified,
              image: workosUser.profilePictureUrl,
              name: safeNameConversion(
                workosUser.firstName,
                workosUser.lastName,
              ),
              createdAt: safeDateConversion(workosUser.createdAt),
              updatedAt: safeDateConversion(workosUser.updatedAt),
              metadata: {
                workosId: workosUser.id,
                ...(workosUser.metadata || {}),
              },
            },
          });

          console.log(`🟢 Migrated user ${workosUser.email}`);
          migratedUsers++;
        } catch (error) {
          console.error(
            `🔴 Failed to migrate user ${workosUser.email}\n`,
            error,
          );
          failedUsers++;
        }
      }

      console.log("");
    } catch (error) {
      console.error("🚨 Error fetching batch:", error);
      throw error;
    }
  }

  console.log("");
  console.log("=".repeat(40));
  console.log("📝 Migration Summary");
  console.log(`Total users processed: ${totalUsers}`);
  console.log("");
  console.log(`🔴 Failed: ${failedUsers}`);
  console.log(`🟡 Skipped: ${skippedUsers}`);
  console.log(`🟢 Successfully migrated: ${migratedUsers}`);
  console.log("=".repeat(40));
}

async function main() {
  try {
    await migrateFromWorkOS();
    process.exit(0);
  } catch (error) {
    console.error("\nMigration failed:", error);
    process.exit(1);
  }
}
main();
```

**Notes**

* When retrieving user data from WorkOS, you need to use their API, which is subject to rate limits. The example script includes a basic configuration, so adjust it as needed for your environment.
* This migration script covers the common cases of managing users with email+password and social login. For features like SSO or CLI Auth, which are provided as plugins in Better Auth, be sure to update the script based on the examples.

### [Run Migration Script](https://www.better-auth.com/docs/guides/workos-migration-guide.html#run-migration-script)

Terminal

```
bun scripts/migration.ts # or use node, ts-node, etc.
```

🎉 Now that you’ve migrated your user data into your database, let’s look at how to update your application logic.

## [Create Client Instance](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-client-instance)

This client instance includes a set of functions for interacting with the Better Auth server instance. For more information, see [here](https://www.better-auth.com/docs/concepts/client.html).

auth-client.ts

```
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    plugins: [
        // Add plugins that require a client, if needed
    ]
});
```

## [Create API Route](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-api-route)

In WorkOS, the auth API was provided as a managed service. With Better Auth, the auth API now lives directly within your application.

/app/api/auth/[...all]/route.ts

```
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth)
```

## [Sign-in/Sign-up Page](https://www.better-auth.com/docs/guides/workos-migration-guide.html#sign-insign-up-page)

In WorkOS, you probably fetched and used the URL like this.

```
const signInUrl = await getSignInUrl();
const signUpUrl = await getSignUpUrl();
```

In Better Auth, instead of fetching these values via an API, you can create the pages at your desired paths and use them directly.

## [Protecting Resources](https://www.better-auth.com/docs/guides/workos-migration-guide.html#protecting-resources)

> Proxy (Middleware) is not intended for slow data fetching. While Proxy can be helpful for optimistic checks such as permission-based redirects, it should not be used as a full session management or authorization solution. - [Next.js docs](https://nextjs.org/docs/app/getting-started/proxy#use-cases)

### [Middleware auth](https://www.better-auth.com/docs/guides/workos-migration-guide.html#middleware-auth)

WorkOS provides Proxy (Middleware) authentication. Better Auth doesn’t recommend protecting resources directly in middleware, so we don't provide dedicated helpers for that.

proxy.ts / middleware.ts

```
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/'],
  },
});

export const config = { matcher: ['/', '/account/:page*'] };
```

In Better Auth, for convenience rather than resource protection, the proxy (middleware) can be used as follows. This is supported in Next.js 15+ with the Node.js runtime.

proxy.ts

```
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if(!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
```

### [Page based auth](https://www.better-auth.com/docs/guides/workos-migration-guide.html#page-based-auth)

In WorkOS, if resources were protected on each page, you can update the logic in Better Auth as follows.

#### [Server-side](https://www.better-auth.com/docs/guides/workos-migration-guide.html#server-side)

WorkOSBetter Auth

app/dashboard/page.tsx

```
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function DashboardPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <div>
      <p>Welcome {user.firstName && `, ${user.lastName}`}</p>
    </div>
  );
}
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
      <p>Welcome {session.user.name}</p>
    </div>
  );
};

export default DashboardPage;
```

#### [Client-side](https://www.better-auth.com/docs/guides/workos-migration-guide.html#client-side)

WorkOSBetter Auth

app/dashboard/page.tsx

```
"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";

export default function HomePage() {
  const { user, loading } = useAuth({ ensureSignedIn: true });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Welcome {user.firstName && `, ${user.lastName}`}</p>
    </div>
  );
}
```

app/dashboard/page.tsx

```
"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data, error, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Pending...</div>;
  }
  if (!data || error) {
    redirect("/sign-in");
  }

  return (
    <div>
      <p>Welcome {data.user.name}</p>
    </div>
  );
};

export default DashboardPage;
```

If options like `ensureSignedIn` were convenient in WorkOS, you can create a reusable helper like `ensureSession()` in Better Auth.

## [Remove WorkOS Dependencies](https://www.better-auth.com/docs/guides/workos-migration-guide.html#remove-workos-dependencies)

After verifying everything works, remove WorkOS dependencies:

npmpnpmyarnbun

```
npm uninstall @workos-inc/node @workos-inc/authkit-nextjs
```

## [Considerations](https://www.better-auth.com/docs/guides/workos-migration-guide.html#considerations)

**Password hashes**

If you’ve been managing users with an email + password system, WorkOS does not provide an export of password hashes at this time. After migration, users will need to reset their passwords within your authentication system. Make sure to notify them of this change with sufficient lead time both before and after the migration.

**Data syncing**

WorkOS is a managed service and keeps your data in sync with your server through APIs or Webhooks. With Better Auth, you fully own your authentication system and can manage data freely through the API. However, if you previously relied on Webhooks for synchronization, additional adjustments will be needed.

**Downtime**

WorkOS exposes data through its API, but with limitations such as the inability to export password hashes. Because of these constraints, performing a migration with zero downtime is challenging. Plan the migration carefully, allow enough buffer time, and communicate the expected impact to your users.

**Active sessions**

Existing active sessions will not be migrated. After the migration, users will need to sign in again, so be sure to notify them in advance.

## [Wrapping Up](https://www.better-auth.com/docs/guides/workos-migration-guide.html#wrapping-up)

Congratulations! You've successfully migrated from WorkOS to Better Auth. Better Auth offers greater flexibility and more features, so be sure to explore the [documentation](https://www.better-auth.com/docs.html) to unlock its full potential.

If you need help with migration, join our [community](https://www.better-auth.com/community.html) or reach out for Enterprise support [here](https://www.better-auth.com/enterprise.html).

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/guides/workos-migration-guide.mdx)

[Previous Page

Supabase Migration Guide](https://www.better-auth.com/docs/guides/supabase-migration-guide.html)[Next Page

Options](https://www.better-auth.com/docs/reference/options.html)

### On this page

[Before we begin](https://www.better-auth.com/docs/guides/workos-migration-guide.html#before-we-begin)[Create Better Auth Instance](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-better-auth-instance)[Database](https://www.better-auth.com/docs/guides/workos-migration-guide.html#database)[Email & Password](https://www.better-auth.com/docs/guides/workos-migration-guide.html#email--password)[Social Providers (optional)](https://www.better-auth.com/docs/guides/workos-migration-guide.html#social-providers-optional)[Additional Fields](https://www.better-auth.com/docs/guides/workos-migration-guide.html#additional-fields)[Plugins](https://www.better-auth.com/docs/guides/workos-migration-guide.html#plugins)[Generate Schema](https://www.better-auth.com/docs/guides/workos-migration-guide.html#generate-schema)[Default database adapter](https://www.better-auth.com/docs/guides/workos-migration-guide.html#default-database-adapter)[Other database adapters](https://www.better-auth.com/docs/guides/workos-migration-guide.html#other-database-adapters)[Migration Script](https://www.better-auth.com/docs/guides/workos-migration-guide.html#migration-script)[Create Migration Script](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-migration-script)[Run Migration Script](https://www.better-auth.com/docs/guides/workos-migration-guide.html#run-migration-script)[Create Client Instance](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-client-instance)[Create API Route](https://www.better-auth.com/docs/guides/workos-migration-guide.html#create-api-route)[Sign-in/Sign-up Page](https://www.better-auth.com/docs/guides/workos-migration-guide.html#sign-insign-up-page)[Protecting Resources](https://www.better-auth.com/docs/guides/workos-migration-guide.html#protecting-resources)[Middleware auth](https://www.better-auth.com/docs/guides/workos-migration-guide.html#middleware-auth)[Page based auth](https://www.better-auth.com/docs/guides/workos-migration-guide.html#page-based-auth)[Server-side](https://www.better-auth.com/docs/guides/workos-migration-guide.html#server-side)[Client-side](https://www.better-auth.com/docs/guides/workos-migration-guide.html#client-side)[Remove WorkOS Dependencies](https://www.better-auth.com/docs/guides/workos-migration-guide.html#remove-workos-dependencies)[Considerations](https://www.better-auth.com/docs/guides/workos-migration-guide.html#considerations)[Wrapping Up](https://www.better-auth.com/docs/guides/workos-migration-guide.html#wrapping-up)

Ask AI
