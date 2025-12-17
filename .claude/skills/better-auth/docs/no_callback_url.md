---
title: "No callback URL | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/no_callback_url"
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

# No callback URL

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/no_callback_url.html#what-is-it)

This error occurs during the OAuth flow when the request reaches your `/api/auth/callback` endpoint
but the `state` data does not contain a callback URL.
Better Auth stores metadata in `state` when the flow starts, including where to redirect after a
successful sign-in/link. If that URL is missing at callback time, we cannot safely continue.

## [Common Causes](https://www.better-auth.com/docs/errors/no_callback_url.html#common-causes)

* The OAuth flow was not started via Better Auth APIs, so the `state` payload never included a callback URL.
* A reverse proxy, CDN, or middleware altered the flow, causing the app to read a different or empty `state`.

## [How to resolve](https://www.better-auth.com/docs/errors/no_callback_url.html#how-to-resolve)

### [Start the flow through Better Auth](https://www.better-auth.com/docs/errors/no_callback_url.html#start-the-flow-through-better-auth)

* Always initiate OAuth using Better Auth's built-in methods so `state` is generated with the needed fields.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/no_callback_url.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/no_callback_url.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/no_callback_url.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/no_callback_url.html#how-to-resolve)[Start the flow through Better Auth](https://www.better-auth.com/docs/errors/no_callback_url.html#start-the-flow-through-better-auth)

Ask AI
