---
title: "State mismatch | Better Auth"
source_url: "https://www.better-auth.com/docs/errors/state_mismatch"
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

# State mismatch

Copy MarkdownOpen in

## [What is it?](https://www.better-auth.com/docs/errors/state_mismatch.html#what-is-it)

When an OAuth flow begins, a unique `state` value is generated and stored in a cookie.
After the user returns from the OAuth provider, this `state` is compared with the one provided in the callback.
If they don't match, the request is rejected to prevent unauthorized access.

This check exists to prevent CSRF (Cross-Site Request Forgery) and replay attacks during the OAuth flow -
basically, to make sure the callback that hits your `/api/auth/callback` endpoint really belongs to the
same browser session that started it.

## [Common Causes](https://www.better-auth.com/docs/errors/state_mismatch.html#common-causes)

* The cookie wasn't set or readable during callback (common with `.vercel.app` preview domains or cross-domain issues).
* The cookie domain/path doesn't match between your app and callback route.
* The browser blocked third-party cookies (especially on Safari / iOS).
* You started the OAuth flow in one tab but finished it in another (different cookie context).
* The preview vs production domain mismatch (e.g., `preview.myapp.com` vs `myapp.com`).

## [How to resolve](https://www.better-auth.com/docs/errors/state_mismatch.html#how-to-resolve)

### [Use a constant domain](https://www.better-auth.com/docs/errors/state_mismatch.html#use-a-constant-domain)

* The best fix is to use a constant domain for your app and callback route.
* Avoid `.vercel.app` subdomains - browsers treat them as public suffixes, so cookies can't be shared across subdomains.

### [Verify cookie configurations](https://www.better-auth.com/docs/errors/state_mismatch.html#verify-cookie-configurations)

* It's possible that you've configured custom cookie attributes in your auth config that can cause this issue.
* Check that cookies are not blocked by browser settings or privacy modes.
* Ensure you're starting and ending the OAuth flow in the same browser session.

### [Skip state cookie check](https://www.better-auth.com/docs/errors/state_mismatch.html#skip-state-cookie-check)

If you know what you are doing, you can skip the state cookie check by
setting the `account.skipStateCookieCheck` option to `true` in your auth config.

Please note that this is a security risk and should only be enabled if you know what you are doing.

### [Production Debug](https://www.better-auth.com/docs/errors/state_mismatch.html#production-debug)

Head to your production site, and use your browser's DevTools → Application → Cookies to confirm:

* The state cookie is being set before redirect.
* It still exists when the OAuth provider redirects back.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/errors/state_mismatch.mdx)

### On this page

[What is it?](https://www.better-auth.com/docs/errors/state_mismatch.html#what-is-it)[Common Causes](https://www.better-auth.com/docs/errors/state_mismatch.html#common-causes)[How to resolve](https://www.better-auth.com/docs/errors/state_mismatch.html#how-to-resolve)[Use a constant domain](https://www.better-auth.com/docs/errors/state_mismatch.html#use-a-constant-domain)[Verify cookie configurations](https://www.better-auth.com/docs/errors/state_mismatch.html#verify-cookie-configurations)[Skip state cookie check](https://www.better-auth.com/docs/errors/state_mismatch.html#skip-state-cookie-check)[Production Debug](https://www.better-auth.com/docs/errors/state_mismatch.html#production-debug)

Ask AI
