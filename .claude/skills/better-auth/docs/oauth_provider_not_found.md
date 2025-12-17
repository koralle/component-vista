---
title: "OAuth provider not found | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/oauth_provider_not_found"
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

# OAuth provider not found

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#what-is-it)

This error occurs when Better Auth cannot identify a provider for the callback path—either because the provider
segment is missing or because no provider with that id is configured.

Better Auth expects the callback route to be shaped like `/api/auth/callback/<provider>`.
If the `<provider>` segment is absent (e.g., request hits `/api/auth/callback`),
we cannot determine which integration should handle the callback and the
request is rejected.

## [Common Causes](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#common-causes)

* Visiting `/api/auth/callback` directly without the trailing provider segment.

## [How to resolve](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#how-to-resolve)

### [Use the correct callback route shape](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#use-the-correct-callback-route-shape)

* Ensure your application exposes a callback route like `/api/auth/callback/[provider]` (framework-specific).
* When initiating the OAuth flow, ensure the redirect URI includes the provider segment so the provider
  returns to `/api/auth/callback/<provider>`.

### [Configure infrastructure to preserve the path](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#configure-infrastructure-to-preserve-the-path)

* Check proxy/CDN rewrites (Vercel, Cloudflare, Nginx) to make sure they do not strip the final path segment.
* Align trailing slash behavior across environments so that `/api/auth/callback/<provider>` is preserved.

### [Avoid manual access to the base callback route](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#avoid-manual-access-to-the-base-callback-route)

* Do not navigate to `/api/auth/callback` directly; always start OAuth via Better Auth APIs which generate
  the correct provider-specific callback URL.

## [Debug locally](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#debug-locally)

* Inspect the request URL received by your server to confirm the `<provider>` segment is present.
* Log router/path parameters in your callback handler to verify the provider value.
* Compare environment configs (routes, basePath, rewrites) to ensure the same path structure is used everywhere.

## [Edge cases to consider](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#edge-cases-to-consider)

* Trailing slash normalization may alter routing if your framework treats `/callback/google/` differently
  from `/callback/google`. Configure consistent behavior.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/oauth_provider_not_found.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#how-to-resolve)[Use the correct callback route shape](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#use-the-correct-callback-route-shape)[Configure infrastructure to preserve the path](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#configure-infrastructure-to-preserve-the-path)[Avoid manual access to the base callback route](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#avoid-manual-access-to-the-base-callback-route)[Debug locally](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#debug-locally)[Edge cases to consider](https://www.better-auth.com/docs/errors/oauth_provider_not_found.html#edge-cases-to-consider)

Ask AI
