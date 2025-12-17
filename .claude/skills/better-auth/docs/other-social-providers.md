---
title: "Other Social Providers | Better Auth"
source_url: "https://www.better-auth.com/docs/authentication/other-social-providers"
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

# Other Social Providers

Copy MarkdownOpen in

Better Auth provides support for any social provider that implements the OAuth2 protocol or OpenID Connect (OIDC) flows through the [Generic OAuth Plugin](https://www.better-auth.com/docs/plugins/generic-oauth.html). You can use pre-configured helper functions for popular providers like Auth0, Keycloak, Okta, Microsoft Entra ID, and Slack, or manually configure any OAuth provider.

## [Installation](https://www.better-auth.com/docs/authentication/other-social-providers.html#installation)

### [Add the plugin to your auth config](https://www.better-auth.com/docs/authentication/other-social-providers.html#add-the-plugin-to-your-auth-config)

To use the Generic OAuth plugin, add it to your auth config.

auth.ts

```
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
    // ... other config options
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "provider-id",
                    clientId: "test-client-id",
                    clientSecret: "test-client-secret",
                    discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
                    // ... other config options
                },
                // Add more providers as needed
            ]
        })
    ]
})
```

### [Add the client plugin](https://www.better-auth.com/docs/authentication/other-social-providers.html#add-the-client-plugin)

Include the Generic OAuth client plugin in your authentication client instance.

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        genericOAuthClient()
    ]
})
```

Read more about installation and usage of the Generic Oauth plugin
[here](https://www.better-auth.com/docs/plugins/generic-oauth.html#usage).

## [Example Usage](https://www.better-auth.com/docs/authentication/other-social-providers.html#example-usage)

Here's a basic example of configuring a generic OAuth provider:

auth.ts

```
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "provider-id",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
        },
      ],
    }),
  ],
})
```

## [Using Pre-configured Providers](https://www.better-auth.com/docs/authentication/other-social-providers.html#using-pre-configured-providers)

Better Auth provides pre-configured helper functions for popular OAuth providers. Here's an example using Slack:

auth.ts

```
import { betterAuth } from "better-auth"
import { genericOAuth, slack } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        slack({
          clientId: process.env.SLACK_CLIENT_ID,
          clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
      ],
    }),
  ],
})
```

sign-in.ts

```
const response = await authClient.signIn.oauth2({
  providerId: "slack",
  callbackURL: "/dashboard",
})
```

For more pre-configured providers (Auth0, Keycloak, Okta, Microsoft Entra ID) and their configuration options, see the [Generic OAuth Plugin documentation](https://www.better-auth.com/docs/plugins/generic-oauth.html#pre-configured-provider-helpers).

## [Manual Configuration Examples](https://www.better-auth.com/docs/authentication/other-social-providers.html#manual-configuration-examples)

If you need to configure a provider that doesn't have a pre-configured helper, you can manually configure it:

### [Instagram Example](https://www.better-auth.com/docs/authentication/other-social-providers.html#instagram-example)

auth.ts

```
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  // ... other config options
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "instagram",
          clientId: process.env.INSTAGRAM_CLIENT_ID as string,
          clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
          authorizationUrl: "https://api.instagram.com/oauth/authorize",
          tokenUrl: "https://api.instagram.com/oauth/access_token",
          scopes: ["user_profile", "user_media"],
        },
      ],
    }),
  ],
});
```

sign-in.ts

```
const response = await authClient.signIn.oauth2({
  providerId: "instagram",
  callbackURL: "/dashboard", // the path to redirect to after the user is authenticated
});
```

### [Coinbase Example](https://www.better-auth.com/docs/authentication/other-social-providers.html#coinbase-example)

auth.ts

```
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  // ... other config options
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "coinbase",
          clientId: process.env.COINBASE_CLIENT_ID as string,
          clientSecret: process.env.COINBASE_CLIENT_SECRET as string,
          authorizationUrl: "https://www.coinbase.com/oauth/authorize",
          tokenUrl: "https://api.coinbase.com/oauth/token",
          scopes: ["wallet:user:read"], // and more...
        },
      ],
    }),
  ],
});
```

sign-in.ts

```
const response = await authClient.signIn.oauth2({
  providerId: "coinbase",
  callbackURL: "/dashboard", // the path to redirect to after the user is authenticated
});
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/authentication/other-social-providers.mdx)

[Previous Page

Others](https://www.better-auth.com/docs/authentication/other-social-providers.html)[Next Page

MySQL](https://www.better-auth.com/docs/adapters/mysql.html)

### On this page

[Installation](https://www.better-auth.com/docs/authentication/other-social-providers.html#installation)[Add the plugin to your auth config](https://www.better-auth.com/docs/authentication/other-social-providers.html#add-the-plugin-to-your-auth-config)[Add the client plugin](https://www.better-auth.com/docs/authentication/other-social-providers.html#add-the-client-plugin)[Example Usage](https://www.better-auth.com/docs/authentication/other-social-providers.html#example-usage)[Using Pre-configured Providers](https://www.better-auth.com/docs/authentication/other-social-providers.html#using-pre-configured-providers)[Manual Configuration Examples](https://www.better-auth.com/docs/authentication/other-social-providers.html#manual-configuration-examples)[Instagram Example](https://www.better-auth.com/docs/authentication/other-social-providers.html#instagram-example)[Coinbase Example](https://www.better-auth.com/docs/authentication/other-social-providers.html#coinbase-example)

Ask AI
