---
title: "MCP | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/mcp"
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

# MCP

Copy MarkdownOpen in

`OAuth` `MCP`

The **MCP** plugin lets your app act as an OAuth provider for MCP clients. It handles authentication and makes it easy to issue and manage access tokens for MCP applications.

This plugin is based on OIDC Provider plugin. It's currently not ready for production use. We are working on it and will update this documentation when it's ready.

## [Installation](https://www.better-auth.com/docs/plugins/mcp.html#installation)

### [Add the Plugin](https://www.better-auth.com/docs/plugins/mcp.html#add-the-plugin)

Add the MCP plugin to your auth configuration and specify the login page path.

auth.ts

```
import { betterAuth } from "better-auth";
import { mcp } from "better-auth/plugins";

export const auth = betterAuth({
    plugins: [
        mcp({
            loginPage: "/sign-in" // path to your login page
        })
    ]
});
```

This doesn't have a client plugin, so you don't need to make any changes to your authClient.

### [Generate Schema](https://www.better-auth.com/docs/plugins/mcp.html#generate-schema)

Run the migration or generate the schema to add the necessary fields and tables to the database.

migrategenerate

npmpnpmyarnbun

```
npx @better-auth/cli migrate
```

npmpnpmyarnbun

```
npx @better-auth/cli generate
```

The MCP plugin uses the same schema as the OIDC Provider plugin. See the [OIDC Provider Schema](https://www.better-auth.com/docs/plugins/oidc-provider.html#schema) section for details.

## [Usage](https://www.better-auth.com/docs/plugins/mcp.html#usage)

### [OAuth Discovery Metadata](https://www.better-auth.com/docs/plugins/mcp.html#oauth-discovery-metadata)

Better Auth already handles the `/api/auth/.well-known/oauth-authorization-server` route automatically but some client may fail to parse the `WWW-Authenticate` header and default to `/.well-known/oauth-authorization-server` (this can happen, for example, if your CORS configuration doesn't expose the `WWW-Authenticate`). For this reason it's better to add a route to expose OAuth metadata for MCP clients:

.well-known/oauth-authorization-server/route.ts

```
import { oAuthDiscoveryMetadata } from "better-auth/plugins";
import { auth } from "../../../lib/auth";

export const GET = oAuthDiscoveryMetadata(auth);
```

### [OAuth Protected Resource Metadata](https://www.better-auth.com/docs/plugins/mcp.html#oauth-protected-resource-metadata)

Better Auth already handles the `/api/auth/.well-known/oauth-protected-resource` route automatically but some client may fail to parse the `WWW-Authenticate` header and default to `/.well-known/oauth-protected-resource` (this can happen, for example, if your CORS configuration doesn't expose the `WWW-Authenticate`). For this reason it's better to add a route to expose OAuth metadata for MCP clients:

/.well-known/oauth-protected-resource/route.ts

```
import { oAuthProtectedResourceMetadata } from "better-auth/plugins";
import { auth } from "@/lib/auth";

export const GET = oAuthProtectedResourceMetadata(auth);
```

### [MCP Session Handling](https://www.better-auth.com/docs/plugins/mcp.html#mcp-session-handling)

You can use the helper function `withMcpAuth` to get the session and handle unauthenticated calls automatically.

api/[transport]/route.ts

```
import { auth } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { withMcpAuth } from "better-auth/plugins";
import { z } from "zod";

const handler = withMcpAuth(auth, (req, session) => {
    // session contains the access token record with scopes and user ID
    return createMcpHandler(
        (server) => {
            server.tool(
                "echo",
                "Echo a message",
                { message: z.string() },
                async ({ message }) => {
                    return {
                        content: [{ type: "text", text: `Tool echo: ${message}` }],
                    };
                },
            );
        },
        {
            capabilities: {
                tools: {
                    echo: {
                        description: "Echo a message",
                    },
                },
            },
        },
        {
            redisUrl: process.env.REDIS_URL,
            basePath: "/api",
            verboseLogs: true,
            maxDuration: 60,
        },
    )(req);
});

export { handler as GET, handler as POST, handler as DELETE };
```

You can also use `auth.api.getMcpSession` to get the session using the access token sent from the MCP client:

api/[transport]/route.ts

```
import { auth } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = async (req: Request) => {
     // session contains the access token record with scopes and user ID
    const session = await auth.api.getMcpSession({
        headers: req.headers
    })
    if(!session){
        //this is important and you must return 401
        return new Response(null, {
            status: 401
        })
    }
    return createMcpHandler(
        (server) => {
            server.tool(
                "echo",
                "Echo a message",
                { message: z.string() },
                async ({ message }) => {
                    return {
                        content: [{ type: "text", text: `Tool echo: ${message}` }],
                    };
                },
            );
        },
        {
            capabilities: {
                tools: {
                    echo: {
                        description: "Echo a message",
                    },
                },
            },
        },
        {
            redisUrl: process.env.REDIS_URL,
            basePath: "/api",
            verboseLogs: true,
            maxDuration: 60,
        },
    )(req);
}

export { handler as GET, handler as POST, handler as DELETE };
```

## [Configuration](https://www.better-auth.com/docs/plugins/mcp.html#configuration)

The MCP plugin accepts the following configuration options:

Prop

Type

`loginPage`string

`resource?`string

`oidcConfig?`object

### [OIDC Configuration](https://www.better-auth.com/docs/plugins/mcp.html#oidc-configuration)

The plugin supports additional OIDC configuration options through the `oidcConfig` parameter:

Prop

Type

`codeExpiresIn?`number

`accessTokenExpiresIn?`number

`refreshTokenExpiresIn?`number

`defaultScope?`string

`scopes?`string[]

## [Schema](https://www.better-auth.com/docs/plugins/mcp.html#schema)

The MCP plugin uses the same schema as the OIDC Provider plugin. See the [OIDC Provider Schema](https://www.better-auth.com/docs/plugins/oidc-provider.html#schema) section for details.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/mcp.mdx)

[Previous Page

API Key](https://www.better-auth.com/docs/plugins/api-key.html)[Next Page

Organization](https://www.better-auth.com/docs/plugins/organization.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/mcp.html#installation)[Add the Plugin](https://www.better-auth.com/docs/plugins/mcp.html#add-the-plugin)[Generate Schema](https://www.better-auth.com/docs/plugins/mcp.html#generate-schema)[Usage](https://www.better-auth.com/docs/plugins/mcp.html#usage)[OAuth Discovery Metadata](https://www.better-auth.com/docs/plugins/mcp.html#oauth-discovery-metadata)[OAuth Protected Resource Metadata](https://www.better-auth.com/docs/plugins/mcp.html#oauth-protected-resource-metadata)[MCP Session Handling](https://www.better-auth.com/docs/plugins/mcp.html#mcp-session-handling)[Configuration](https://www.better-auth.com/docs/plugins/mcp.html#configuration)[OIDC Configuration](https://www.better-auth.com/docs/plugins/mcp.html#oidc-configuration)[Schema](https://www.better-auth.com/docs/plugins/mcp.html#schema)

Ask AI
