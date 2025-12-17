---
title: "Generic OAuth | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/generic-oauth"
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

# Generic OAuth

Copy MarkdownOpen in

The Generic OAuth plugin provides a flexible way to integrate authentication with any OAuth provider. It supports both OAuth 2.0 and OpenID Connect (OIDC) flows, allowing you to easily add social login or custom OAuth authentication to your application.

## [Installation](https://www.better-auth.com/docs/plugins/generic-oauth.html#installation)

### [Add the plugin to your auth config](https://www.better-auth.com/docs/plugins/generic-oauth.html#add-the-plugin-to-your-auth-config)

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

### [Add the client plugin](https://www.better-auth.com/docs/plugins/generic-oauth.html#add-the-client-plugin)

Include the Generic OAuth client plugin in your authentication client instance.

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        genericOAuthClient()
    ]
})
```

## [Usage](https://www.better-auth.com/docs/plugins/generic-oauth.html#usage)

The Generic OAuth plugin provides endpoints for initiating the OAuth flow and handling the callback. Here's how to use them:

### [Initiate OAuth Sign-In](https://www.better-auth.com/docs/plugins/generic-oauth.html#initiate-oauth-sign-in)

To start the OAuth sign-in process:

ClientServer

POST

/sign-in/oauth2

```
const { data, error } = await authClient.signIn.oauth2({    providerId: "provider-id", // required    callbackURL: "/dashboard",    errorCallbackURL: "/error-page",    newUserCallbackURL: "/welcome",    disableRedirect: false,    scopes: ["my-scope"],    requestSignUp: false,});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider ID for the OAuth provider. | `string` |
| `callbackURL?` | The URL to redirect to after sign in. | `string` |
| `errorCallbackURL?` | The URL to redirect to if an error occurs. | `string` |
| `newUserCallbackURL?` | The URL to redirect to after login if the user is new. | `string` |
| `disableRedirect?` | Disable redirect. | `boolean` |
| `scopes?` | Scopes to be passed to the provider authorization request. | `string[]` |
| `requestSignUp?` | Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. | `boolean` |

POST

/sign-in/oauth2

```
const data = await auth.api.signInWithOAuth2({    body: {        providerId: "provider-id", // required        callbackURL: "/dashboard",        errorCallbackURL: "/error-page",        newUserCallbackURL: "/welcome",        disableRedirect: false,        scopes: ["my-scope"],        requestSignUp: false,    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider ID for the OAuth provider. | `string` |
| `callbackURL?` | The URL to redirect to after sign in. | `string` |
| `errorCallbackURL?` | The URL to redirect to if an error occurs. | `string` |
| `newUserCallbackURL?` | The URL to redirect to after login if the user is new. | `string` |
| `disableRedirect?` | Disable redirect. | `boolean` |
| `scopes?` | Scopes to be passed to the provider authorization request. | `string[]` |
| `requestSignUp?` | Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. | `boolean` |

### [Linking OAuth Accounts](https://www.better-auth.com/docs/plugins/generic-oauth.html#linking-oauth-accounts)

To link an OAuth account to an existing user:

ClientServer

POST

/oauth2/link

```
const { data, error } = await authClient.oauth2.link({    providerId: "my-provider-id", // required    callbackURL: "/successful-link", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The OAuth provider ID. | `string` |
| `callbackURL` | The URL to redirect to once the account linking was complete. | `string` |

POST

/oauth2/link

```
const data = await auth.api.oAuth2LinkAccount({    body: {        providerId: "my-provider-id", // required        callbackURL: "/successful-link", // required    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The OAuth provider ID. | `string` |
| `callbackURL` | The URL to redirect to once the account linking was complete. | `string` |

### [Handle OAuth Callback](https://www.better-auth.com/docs/plugins/generic-oauth.html#handle-oauth-callback)

The plugin mounts a route to handle the OAuth callback `/oauth2/callback/:providerId`. This means by default `${baseURL}/api/auth/oauth2/callback/:providerId` will be used as the callback URL. Make sure your OAuth provider is configured to use this URL.

## [Pre-configured Provider Helpers](https://www.better-auth.com/docs/plugins/generic-oauth.html#pre-configured-provider-helpers)

Better Auth provides pre-configured helper functions for popular OAuth providers. These helpers handle the provider-specific configuration, including discovery URLs and user info endpoints.

### [Supported Providers](https://www.better-auth.com/docs/plugins/generic-oauth.html#supported-providers)

* **Auth0** - `auth0(options)`
* **HubSpot** - `hubspot(options)`
* **Keycloak** - `keycloak(options)`
* **LINE** - `line(options)`
* **Microsoft Entra ID (Azure AD)** - `microsoftEntraId(options)`
* **Okta** - `okta(options)`
* **Slack** - `slack(options)`
* **Patreon** - `patreon(options)`

### [Example: Using Pre-configured Providers](https://www.better-auth.com/docs/plugins/generic-oauth.html#example-using-pre-configured-providers)

auth.ts

```
import { betterAuth } from "better-auth"
import { genericOAuth, auth0, hubspot, keycloak, line, microsoftEntraId, okta, slack, patreon } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        auth0({
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          domain: process.env.AUTH0_DOMAIN,
        }),
        hubspot({
          clientId: process.env.HUBSPOT_CLIENT_ID,
          clientSecret: process.env.HUBSPOT_CLIENT_SECRET,
          scopes: ["oauth", "contacts"],
        }),
        keycloak({
          clientId: process.env.KEYCLOAK_CLIENT_ID,
          clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
          issuer: process.env.KEYCLOAK_ISSUER,
        }),
        // LINE supports multiple channels (countries) - use different providerIds
        line({
          providerId: "line-jp",
          clientId: process.env.LINE_JP_CLIENT_ID,
          clientSecret: process.env.LINE_JP_CLIENT_SECRET,
        }),
        line({
          providerId: "line-th",
          clientId: process.env.LINE_TH_CLIENT_ID,
          clientSecret: process.env.LINE_TH_CLIENT_SECRET,
        }),
        microsoftEntraId({
          clientId: process.env.MS_APP_ID,
          clientSecret: process.env.MS_CLIENT_SECRET,
          tenantId: process.env.MS_TENANT_ID,
        }),
        okta({
          clientId: process.env.OKTA_CLIENT_ID,
          clientSecret: process.env.OKTA_CLIENT_SECRET,
          issuer: process.env.OKTA_ISSUER,
        }),
        slack({
          clientId: process.env.SLACK_CLIENT_ID,
          clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
        patreon({
          clientId: process.env.PATREON_CLIENT_ID,
          clientSecret: process.env.PATREON_CLIENT_SECRET,
        }),
      ],
    }),
  ],
})
```

Each provider helper accepts common OAuth options (extending `BaseOAuthProviderOptions`) plus provider-specific fields:

* **Auth0**: Requires `domain` (e.g., `dev-xxx.eu.auth0.com`)
* **HubSpot**: No additional required fields. Optional `scopes` (defaults to `["oauth"]`)
* **Keycloak**: Requires `issuer` (e.g., `https://my-domain/realms/MyRealm`)
* **LINE**: Optional `providerId` (defaults to `"line"`). LINE requires separate channels for different countries (Japan, Thailand, Taiwan, etc.), so you can call `line()` multiple times with different `providerId`s and credentials to support multiple countries
* **Microsoft Entra ID**: Requires `tenantId` (can be a GUID, `"common"`, `"organizations"`, or `"consumers"`)
* **Okta**: Requires `issuer` (e.g., `https://dev-xxxxx.okta.com/oauth2/default`)
* **Slack**: No additional required fields
* **Patreon**: No additional required fields

All providers support the same optional fields:

* `scopes?: string[]` - Array of OAuth scopes to request
* `redirectURI?: string` - Custom redirect URI
* `pkce?: boolean` - Enable PKCE (defaults to `false`)
* `disableImplicitSignUp?: boolean` - Disable automatic sign-up for new users
* `disableSignUp?: boolean` - Disable sign-up entirely
* `overrideUserInfo?: boolean` - Override user info on sign in

## [Configuration](https://www.better-auth.com/docs/plugins/generic-oauth.html#configuration)

When adding the plugin to your auth config, you can configure multiple OAuth providers. You can either use the pre-configured provider helpers (shown above) or create custom configurations manually.

### [Manual Configuration](https://www.better-auth.com/docs/plugins/generic-oauth.html#manual-configuration)

Each provider configuration object supports the following options:

```
interface GenericOAuthConfig {
  providerId: string;
  discoveryUrl?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  userInfoUrl?: string;
  clientId: string;
  clientSecret: string;
  scopes?: string[];
  redirectURI?: string;
  responseType?: string;
  prompt?: string;
  pkce?: boolean;
  accessType?: string;
  getUserInfo?: (tokens: OAuth2Tokens) => Promise<User | null>;
}
```

### [Other Provider Configurations](https://www.better-auth.com/docs/plugins/generic-oauth.html#other-provider-configurations)

**providerId**: A unique string to identify the OAuth provider configuration.

**discoveryUrl**: (Optional) URL to fetch the provider's OAuth 2.0/OIDC configuration. If provided, endpoints like `authorizationUrl`, `tokenUrl`, and `userInfoUrl` can be auto-discovered.

**authorizationUrl**: (Optional) The OAuth provider's authorization endpoint. Not required if using `discoveryUrl`.

**tokenUrl**: (Optional) The OAuth provider's token endpoint. Not required if using `discoveryUrl`.

**userInfoUrl**: (Optional) The endpoint to fetch user profile information. Not required if using `discoveryUrl`.

**clientId**: The OAuth client ID issued by your provider.

**clientSecret**: The OAuth client secret issued by your provider.

**scopes**: (Optional) An array of scopes to request from the provider (e.g., `["openid", "email", "profile"]`).

**redirectURI**: (Optional) The redirect URI to use for the OAuth flow. If not set, a default is constructed based on your app's base URL.

**responseType**: (Optional) The OAuth response type. Defaults to `"code"` for authorization code flow.

**responseMode**: (Optional) The response mode for the authorization code request, such as `"query"` or `"form_post"`.

**prompt**: (Optional) Controls the authentication experience (e.g., force login, consent, etc.).

**pkce**: (Optional) If true, enables PKCE (Proof Key for Code Exchange) for enhanced security. Defaults to `false`.

**accessType**: (Optional) The access type for the authorization request. Use `"offline"` to request a refresh token.

**getToken**: (Optional) A custom function to exchange authorization code for tokens. If provided, this function will be used instead of the default token exchange logic. This is useful for providers with non-standard token endpoints that use GET requests or custom parameters.

**getUserInfo**: (Optional) A custom function to fetch user info from the provider, given the OAuth tokens. If not provided, a default fetch is used.

**mapProfileToUser**: (Optional) A function to map the provider's user profile to your app's user object. Useful for custom field mapping or transformations.

**authorizationUrlParams**: (Optional) Additional query parameters to add to the authorization URL. These can override default parameters. You can also provide a function that returns the parameters.

**tokenUrlParams**: (Optional) Additional query parameters to add to the token URL. These can override default parameters. You can also provide a function that returns the parameters.

**disableImplicitSignUp**: (Optional) If true, disables automatic sign-up for new users. Sign-in must be explicitly requested with sign-up intent.

**disableSignUp**: (Optional) If true, disables sign-up for new users entirely. Only existing users can sign in.

**authentication**: (Optional) The authentication method for token requests. Can be `'basic'` or `'post'`. Defaults to `'post'`.

**discoveryHeaders**: (Optional) Custom headers to include in the discovery request. Useful for providers that require special headers.

**authorizationHeaders**: (Optional) Custom headers to include in the authorization request. Useful for providers that require special headers.

**overrideUserInfo**: (Optional) If true, the user's info in your database will be updated with the provider's info every time they sign in. Defaults to `false`.

## [Advanced Usage](https://www.better-auth.com/docs/plugins/generic-oauth.html#advanced-usage)

### [Custom Token Exchange](https://www.better-auth.com/docs/plugins/generic-oauth.html#custom-token-exchange)

For providers with non-standard token endpoints that use GET requests or custom parameters, you can provide a custom `getToken` function:

```
genericOAuth({
  config: [
    {
      providerId: "custom-provider",
      clientId: process.env.CUSTOM_CLIENT_ID!,
      clientSecret: process.env.CUSTOM_CLIENT_SECRET,
      authorizationUrl: "https://provider.example.com/oauth/authorize",
      scopes: ["profile", "email"],
      // Custom token exchange for non-standard endpoints
      getToken: async ({ code, redirectURI }) => {
        // Example: GET request instead of POST
        const response = await fetch(
          `https://provider.example.com/oauth/token?` +
          `client_id=${process.env.CUSTOM_CLIENT_ID}&` +
          `client_secret=${process.env.CUSTOM_CLIENT_SECRET}&` +
          `code=${code}&` +
          `redirect_uri=${redirectURI}&` +
          `grant_type=authorization_code`,
          { method: "GET" }
        );

        const data = await response.json();

        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
          scopes: data.scope?.split(" ") ?? [],
          // Preserve provider-specific fields in raw
          raw: data,
        };
      },
      getUserInfo: async (tokens) => {
        // Access provider-specific fields from raw token data
        const userId = tokens.raw?.user_id as string;

        const response = await fetch(
          `https://provider.example.com/api/user?` +
          `access_token=${tokens.accessToken}`
        );

        const data = await response.json();

        return {
          id: userId,
          name: data.display_name,
          email: data.email,
          image: data.avatar_url,
          emailVerified: data.email_verified,
        };
      },
    },
  ],
});
```

### [Custom User Info Fetching](https://www.better-auth.com/docs/plugins/generic-oauth.html#custom-user-info-fetching)

You can provide a custom `getUserInfo` function to handle specific provider requirements:

```
genericOAuth({
  config: [
    {
      providerId: "custom-provider",
      // ... other config options
      getUserInfo: async (tokens) => {
        // Custom logic to fetch and return user info
        const userInfo = await fetchUserInfoFromCustomProvider(tokens);
        return {
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          // ... map other fields as needed
        };
      }
    }
  ]
})
```

### [Map User Info Fields](https://www.better-auth.com/docs/plugins/generic-oauth.html#map-user-info-fields)

If the user info returned by the provider does not match the expected format, or you need to map additional fields, you can use the `mapProfileToUser`:

```
genericOAuth({
  config: [
    {
      providerId: "custom-provider",
      // ... other config options
      mapProfileToUser: async (profile) => {
        return {
          firstName: profile.given_name,
          // ... map other fields as needed
        };
      }
    }
  ]
})
```

### [Accessing Raw Token Data](https://www.better-auth.com/docs/plugins/generic-oauth.html#accessing-raw-token-data)

The `tokens` parameter includes a `raw` field that preserves the original token response from the provider. This is useful for accessing provider-specific fields:

```
getUserInfo: async (tokens) => {
  // Access provider-specific fields
  const customField = tokens.raw?.custom_provider_field as string;
  const userId = tokens.raw?.provider_user_id as string;

  // Use in your logic
  return {
    id: userId,
    // ...
  };
}
```

### [Error Handling](https://www.better-auth.com/docs/plugins/generic-oauth.html#error-handling)

The plugin includes built-in error handling for common OAuth issues. Errors are typically redirected to your application's error page with an appropriate error message in the URL parameters. If the callback URL is not provided, the user will be redirected to Better Auth's default error page.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/generic-oauth.mdx)

[Previous Page

Passkey](https://www.better-auth.com/docs/plugins/passkey.html)[Next Page

One Tap](https://www.better-auth.com/docs/plugins/one-tap.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/generic-oauth.html#installation)[Add the plugin to your auth config](https://www.better-auth.com/docs/plugins/generic-oauth.html#add-the-plugin-to-your-auth-config)[Add the client plugin](https://www.better-auth.com/docs/plugins/generic-oauth.html#add-the-client-plugin)[Usage](https://www.better-auth.com/docs/plugins/generic-oauth.html#usage)[Initiate OAuth Sign-In](https://www.better-auth.com/docs/plugins/generic-oauth.html#initiate-oauth-sign-in)[Linking OAuth Accounts](https://www.better-auth.com/docs/plugins/generic-oauth.html#linking-oauth-accounts)[Handle OAuth Callback](https://www.better-auth.com/docs/plugins/generic-oauth.html#handle-oauth-callback)[Pre-configured Provider Helpers](https://www.better-auth.com/docs/plugins/generic-oauth.html#pre-configured-provider-helpers)[Supported Providers](https://www.better-auth.com/docs/plugins/generic-oauth.html#supported-providers)[Example: Using Pre-configured Providers](https://www.better-auth.com/docs/plugins/generic-oauth.html#example-using-pre-configured-providers)[Configuration](https://www.better-auth.com/docs/plugins/generic-oauth.html#configuration)[Manual Configuration](https://www.better-auth.com/docs/plugins/generic-oauth.html#manual-configuration)[Other Provider Configurations](https://www.better-auth.com/docs/plugins/generic-oauth.html#other-provider-configurations)[Advanced Usage](https://www.better-auth.com/docs/plugins/generic-oauth.html#advanced-usage)[Custom Token Exchange](https://www.better-auth.com/docs/plugins/generic-oauth.html#custom-token-exchange)[Custom User Info Fetching](https://www.better-auth.com/docs/plugins/generic-oauth.html#custom-user-info-fetching)[Map User Info Fields](https://www.better-auth.com/docs/plugins/generic-oauth.html#map-user-info-fields)[Accessing Raw Token Data](https://www.better-auth.com/docs/plugins/generic-oauth.html#accessing-raw-token-data)[Error Handling](https://www.better-auth.com/docs/plugins/generic-oauth.html#error-handling)

Ask AI
