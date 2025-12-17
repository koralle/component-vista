---
title: "Unable to get user info | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/unable_to_get_user_info"
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

# Unable to get user info

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#what-is-it)

This error occurs only on the `/api/auth/callback` endpoint during an OAuth flow. After exchanging
the authorization code for tokens, Better Auth fetches the user's profile from the provider. If the
provider response is incorrect, empty, or missing required fields (like id or email when needed),
no usable user info can be derived and the request is rejected.

## [Common Causes](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#common-causes)

* Missing or insufficient scopes, so the provider does not return profile data.
* The provider returned an error or an empty profile object for the user info request.
* Token exchange succeeded, but the user info request failed (network error, 401/403, invalid token).
* Provider configuration or environment mismatch (wrong client/tenant), causing unexpected or minimal claims.
* Temporary provider outage or rate limiting.

## [How to resolve](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#how-to-resolve)

### [Request the right data](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#request-the-right-data)

* Start the OAuth flow using Better Auth methods so the correct scopes and parameters are used.
* Ensure your provider app is configured to return basic profile details needed by your app.

### [Verify configuration and environment](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#verify-configuration-and-environment)

* Confirm the client credentials and callback URL match the environment you are testing (dev/staging/prod).
* If the provider supports different response modes or endpoints, ensure they align with the integration you use.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/unable_to_get_user_info.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#how-to-resolve)[Request the right data](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#request-the-right-data)[Verify configuration and environment](https://www.better-auth.com/docs/errors/unable_to_get_user_info.html#verify-configuration-and-environment)

Ask AI
