---
title: "Unable to link account | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/unable_to_link_account"
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

# Unable to link account

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/unable_to_link_account.html#what-is-it)

This error occurs only during an OAuth flow when attempting to link the provider account to the
currently authenticated user. Better Auth blocks the operation if either:

1. The database operation to create/update the linked account fails.
2. The provider is not considered trusted for linking based on your auth configuration
   (`account.accountLinking.trustedProviders`).

## [Common Causes](https://www.better-auth.com/docs/errors/unable_to_link_account.html#common-causes)

* The provider is not listed in `account.accountLinking.trustedProviders`.
* Configuration differs across environments (dev/staging/prod), so the provider appears untrusted in one environment.
* Database write failed due to unique constraint, foreign key violation, or transaction/connection issues.
* A race condition linking the same provider concurrently caused a conflict.
* Pending migrations or a mismatched schema between services caused the write to fail.

## [How to resolve](https://www.better-auth.com/docs/errors/unable_to_link_account.html#how-to-resolve)

### [Allow linking for the intended provider](https://www.better-auth.com/docs/errors/unable_to_link_account.html#allow-linking-for-the-intended-provider)

* Add the provider id (e.g., `github`, `google`) to `account.accountLinking.trustedProviders` in your auth config.
* Verify you are using the correct provider id/slug that your integration expects.

### [Fix database reliability and constraints](https://www.better-auth.com/docs/errors/unable_to_link_account.html#fix-database-reliability-and-constraints)

* Run pending migrations and ensure the schema matches the current Better Auth version.
* Investigate DB errors (deadlocks, timeouts, connection pool limits) and retry if appropriate.

### [Verify environment configuration](https://www.better-auth.com/docs/errors/unable_to_link_account.html#verify-environment-configuration)

* Ensure the same auth config is deployed to all environments and that environment variables are loaded as expected.
* Double-check that the runtime sees the intended `trustedProviders` list.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/unable_to_link_account.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/unable_to_link_account.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/unable_to_link_account.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/unable_to_link_account.html#how-to-resolve)[Allow linking for the intended provider](https://www.better-auth.com/docs/errors/unable_to_link_account.html#allow-linking-for-the-intended-provider)[Fix database reliability and constraints](https://www.better-auth.com/docs/errors/unable_to_link_account.html#fix-database-reliability-and-constraints)[Verify environment configuration](https://www.better-auth.com/docs/errors/unable_to_link_account.html#verify-environment-configuration)

Ask AI
