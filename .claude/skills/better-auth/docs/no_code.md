---
title: "No code | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/no_code"
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

# No code

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/no_code.html#what-is-it)

This error occurs during the OAuth callback when the authorization code is missing from the request.
In the Authorization Code flow, the provider redirects back to your `/api/auth/callback` route with a
`code` parameter (and typically `state`). Without the `code`, Better Auth cannot exchange it for tokens,
so the request is rejected.

## [Common Causes](https://www.better-auth.com/docs/errors/no_code.html#common-causes)

* The OAuth flow was not started correctly (wrong response type or custom URL missing required params).
* The provider returned an error instead of a code (e.g., user canceled consent), so only `error`/`error_description` are present.
* Query parameters were stripped by a reverse proxy, CDN, or framework rewrite.
* Callback URL mismatch at the provider caused an intermediate redirect that dropped query parameters.
* Mobile/WebView or deep-link handoff opened a new context that lost the query string.
* Using a response mode your handler does not read (e.g., form\_post body vs query parameters).

## [How to resolve](https://www.better-auth.com/docs/errors/no_code.html#how-to-resolve)

### [Use the standard Authorization Code flow](https://www.better-auth.com/docs/errors/no_code.html#use-the-standard-authorization-code-flow)

* Start the flow through Better Auth so the provider receives the correct parameters and the app expects a `code`.
* In the provider settings, ensure your app is configured for Authorization Code (with PKCE where applicable).

### [Verify callback URL and parameter delivery](https://www.better-auth.com/docs/errors/no_code.html#verify-callback-url-and-parameter-delivery)

* Confirm the provider's configured redirect URI exactly matches your `/api/auth/callback` route (protocol, host, path).
* Ensure infrastructure (proxies, rewrites, middleware) preserves the full query string and does not redirect in ways that drop parameters.

## [Debug locally](https://www.better-auth.com/docs/errors/no_code.html#debug-locally)

* In DevTools → Network, inspect the callback request and verify whether `code` or `error` parameters are present.
* Log the raw query/body received by the callback handler during development to see exactly what arrived.
* Compare dev/staging/prod credentials and redirect URIs to ensure they are consistent across environments.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/no_code.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/no_code.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/no_code.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/no_code.html#how-to-resolve)[Use the standard Authorization Code flow](https://www.better-auth.com/docs/errors/no_code.html#use-the-standard-authorization-code-flow)[Verify callback URL and parameter delivery](https://www.better-auth.com/docs/errors/no_code.html#verify-callback-url-and-parameter-delivery)[Debug locally](https://www.better-auth.com/docs/errors/no_code.html#debug-locally)

Ask AI
