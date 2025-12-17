---
title: "Captcha | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/captcha"
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

# Captcha

Copy MarkdownOpen in

The **Captcha Plugin** integrates bot protection into your Better Auth system by adding captcha verification for key endpoints. This plugin ensures that only human users can perform actions like signing up, signing in, or resetting passwords. The following providers are currently supported:

* [Google reCAPTCHA](https://developers.google.com/recaptcha)
* [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/)
* [hCaptcha](https://www.hcaptcha.com/)
* [CaptchaFox](https://captchafox.com/)

This plugin works out of the box with [Email & Password](https://www.better-auth.com/docs/authentication/email-password.html) authentication. To use it with other authentication methods, you will need to configure the [endpoints](https://www.better-auth.com/docs/plugins/captcha.html#plugin-options) array in the plugin options.

## [Installation](https://www.better-auth.com/docs/plugins/captcha.html#installation)

### [Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/captcha.html#add-the-plugin-to-your-auth-config)

auth.ts

```
import { betterAuth } from "better-auth";
import { captcha } from "better-auth/plugins";

export const auth = betterAuth({
    plugins: [
        captcha({
            provider: "cloudflare-turnstile", // or google-recaptcha, hcaptcha, captchafox
            secretKey: process.env.TURNSTILE_SECRET_KEY!,
        }),
    ],
});
```

### [Add the captcha token to your request headers](https://www.better-auth.com/docs/plugins/captcha.html#add-the-captcha-token-to-your-request-headers)

The `x-captcha-user-remote-ip` header is no longer required—IP is now auto-detected server-side.

Add the captcha token to your request headers for all protected endpoints. This example shows how to include it in a `signIn` request:

```
await authClient.signIn.email({
    email: "user@example.com",
    password: "secure-password",
    fetchOptions: {
        headers: {
            "x-captcha-response": turnstileToken,
        },
    },
});
```

* To implement Cloudflare Turnstile on the client side, follow the official [Cloudflare Turnstile documentation](https://developers.cloudflare.com/turnstile/) or use a library like [react-turnstile](https://www.npmjs.com/package/@marsidev/react-turnstile).
* To implement Google reCAPTCHA on the client side, follow the official [Google reCAPTCHA documentation](https://developers.google.com/recaptcha/intro) or use libraries like [react-google-recaptcha](https://www.npmjs.com/package/react-google-recaptcha) (v2) and [react-google-recaptcha-v3](https://www.npmjs.com/package/react-google-recaptcha-v3) (v3).
* To implement hCaptcha on the client side, follow the official [hCaptcha documentation](https://docs.hcaptcha.com/#add-the-hcaptcha-widget-to-your-webpage) or use libraries like [@hcaptcha/react-hcaptcha](https://www.npmjs.com/package/@hcaptcha/react-hcaptcha)
* To implement CaptchaFox on the client side, follow the official [CaptchaFox documentation](https://docs.captchafox.com/getting-started) or use libraries like [@captchafox/react](https://www.npmjs.com/package/@captchafox/react)

## [How it works](https://www.better-auth.com/docs/plugins/captcha.html#how-it-works)

The plugin acts as a middleware: it intercepts all `POST` requests to configured endpoints (see `endpoints`
in the [Plugin Options](https://www.better-auth.com/docs/plugins/captcha.html#plugin-options) section).

it validates the captcha token on the server, by calling the captcha provider's `/siteverify`.

* if the token is missing, gets rejected by the captcha provider, or if the `/siteverify` endpoint is
  unavailable, the plugin returns an error and interrupts the request.
* if the token is accepted by the captcha provider, the middleware returns `undefined`, meaning the request is allowed to proceed.

## [Plugin Options](https://www.better-auth.com/docs/plugins/captcha.html#plugin-options)

* **`provider` (required)**: your captcha provider.
* **`secretKey` (required)**: your provider's secret key used for the server-side validation.
* `endpoints` (optional): overrides the default array of paths where captcha validation is enforced. Default is: `["/sign-up/email", "/sign-in/email", "/forget-password",]`.
* `minScore` (optional - only *Google ReCAPTCHA v3*): minimum score threshold. Default is `0.5`.
* `siteKey` (optional - only *hCaptcha* and *CaptchaFox*): prevents tokens issued on one sitekey from being redeemed elsewhere.
* `siteVerifyURLOverride` (optional): overrides endpoint URL for the captcha verification request.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/captcha.mdx)

[Previous Page

Device Authorization](https://www.better-auth.com/docs/plugins/device-authorization.html)[Next Page

Have I Been Pwned](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/captcha.html#installation)[Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/captcha.html#add-the-plugin-to-your-auth-config)[Add the captcha token to your request headers](https://www.better-auth.com/docs/plugins/captcha.html#add-the-captcha-token-to-your-request-headers)[How it works](https://www.better-auth.com/docs/plugins/captcha.html#how-it-works)[Plugin Options](https://www.better-auth.com/docs/plugins/captcha.html#plugin-options)

Ask AI
