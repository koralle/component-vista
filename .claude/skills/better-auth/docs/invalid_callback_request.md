---
title: "Invalid callback request | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/invalid_callback_request"
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

# Invalid callback request

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/invalid_callback_request.html#what-is-it)

This error is thrown during the OAuth callback when the incoming request cannot be parsed or is missing
required fields.

## [Common Causes](https://www.better-auth.com/docs/errors/invalid_callback_request.html#common-causes)

* Query or body parameters were stripped by a reverse proxy, CDN, or framework rewrite.
* Double-encoding or improper URL encoding of parameters causes parsing to fail.
* Callback URL mismatch at the provider triggers an intermediate redirect that drops parameters.
* Middleware or route grouping sends the request to a different handler than intended.
* Very long URLs get truncated by an intermediary (rare but possible with some proxies).

## [How to resolve](https://www.better-auth.com/docs/errors/invalid_callback_request.html#how-to-resolve)

### [Verify callback method and parameters](https://www.better-auth.com/docs/errors/invalid_callback_request.html#verify-callback-method-and-parameters)

* Ensure your provider is configured to use the method your route expects (commonly GET with query parameters for Authorization Code flow).
* Confirm the callback includes required parameters (e.g., `code` and `state` for standard OAuth flows).

### [Preserve query/body through infrastructure](https://www.better-auth.com/docs/errors/invalid_callback_request.html#preserve-querybody-through-infrastructure)

* Check that reverse proxies (Vercel, Cloudflare, Nginx) and app rewrites forward the full query string and request body intact.
* If middleware intercepts or rewrites the callback, make sure it forwards all parameters without modification.

### [Debug locally](https://www.better-auth.com/docs/errors/invalid_callback_request.html#debug-locally)

* In DevTools → Network, inspect the callback request and verify parameters are present and well-formed.
* Compare dev/staging/prod credentials to ensure there are no environment differences causing different flows or endpoints.

### [Edge cases to consider](https://www.better-auth.com/docs/errors/invalid_callback_request.html#edge-cases-to-consider)

* Mobile/WebView or deep-link flows can drop query parameters during handoff.
* Some providers can return parameters in fragments; your server will not receive fragments—ensure the provider uses query/body for server-side callbacks.
* Multiple redirects (including HTTP → HTTPS) can lose parameters if not configured correctly.

Callback parameters are normally handled automatically by Better Auth. If this error appears, it often
indicates manual access to the `/api/auth/callback` route, a proxy/redirect that stripped parameters,
or an integration mismatch. Double-check provider settings and infrastructure rewrites to ensure the
full request reaches the callback unchanged.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/invalid_callback_request.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/invalid_callback_request.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/invalid_callback_request.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/invalid_callback_request.html#how-to-resolve)[Verify callback method and parameters](https://www.better-auth.com/docs/errors/invalid_callback_request.html#verify-callback-method-and-parameters)[Preserve query/body through infrastructure](https://www.better-auth.com/docs/errors/invalid_callback_request.html#preserve-querybody-through-infrastructure)[Debug locally](https://www.better-auth.com/docs/errors/invalid_callback_request.html#debug-locally)[Edge cases to consider](https://www.better-auth.com/docs/errors/invalid_callback_request.html#edge-cases-to-consider)

Ask AI
