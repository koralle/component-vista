---
title: "Email doesn't match | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/email_doesn't_match"
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

# Email doesn't match

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/email_doesn't_match.html#what-is-it)

This error appears only during OAuth account linking. It happens when a signed-in user tries to
link an OAuth provider account, but the email returned by the provider does not match the email
on the currently authenticated user (or the email you expect for that user). To prevent
accidental cross-account linking or account takeover, Better Auth blocks the link when emails do
not align.

This does not occur during normal OAuth sign-in; it is specific to the linking flow.

## [Common Causes](https://www.better-auth.com/docs/errors/email_doesn't_match.html#common-causes)

* The user is logged into the provider with a different email (e.g., work vs personal).
* The provider returns an unverified or secondary email that differs from the app account email.
* Email normalization differences (case sensitivity, dots/aliases on Gmail) cause a mismatch.
* The user's email changed in your app or at the provider since the original account was created.

## [How to resolve](https://www.better-auth.com/docs/errors/email_doesn't_match.html#how-to-resolve)

### [Ask the user to align identities](https://www.better-auth.com/docs/errors/email_doesn't_match.html#ask-the-user-to-align-identities)

* Have the user switch to the correct provider account that uses the same email as their app account.
* Alternatively, update the app account email to the intended email (if your product allows it) and retry linking.

### [Debug locally](https://www.better-auth.com/docs/errors/email_doesn't_match.html#debug-locally)

* Log the current user's email in your app and the email returned by the provider profile.
* Inspect whether the provider email is verified/primary and whether any normalization is applied.
* Confirm which provider credentials (dev/staging/prod) are in use and that the returned identity is the expected one.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/email_doesn't_match.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/email_doesn't_match.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/email_doesn't_match.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/email_doesn't_match.html#how-to-resolve)[Ask the user to align identities](https://www.better-auth.com/docs/errors/email_doesn't_match.html#ask-the-user-to-align-identities)[Debug locally](https://www.better-auth.com/docs/errors/email_doesn't_match.html#debug-locally)

Ask AI
