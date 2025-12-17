---
title: "Have I Been Pwned | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/have-i-been-pwned"
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

# Have I Been Pwned

Copy MarkdownOpen in

The Have I Been Pwned plugin helps protect user accounts by preventing the use of passwords that have been exposed in known data breaches. It uses the [Have I Been Pwned](https://haveibeenpwned.com/) API to check if a password has been compromised.

## [Installation](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#installation)

### [Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#add-the-plugin-to-your-auth-config)

auth.ts

```
import { betterAuth } from "better-auth"
import { haveIBeenPwned } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        haveIBeenPwned()
    ]
})
```

## [Usage](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#usage)

When a user attempts to create an account or update their password with a compromised password, they'll receive the following default error:

```
{
  "code": "PASSWORD_COMPROMISED",
  "message": "Password is compromised"
}
```

## [Config](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#config)

You can customize the error message:

```
haveIBeenPwned({
    customPasswordCompromisedMessage: "Please choose a more secure password."
})
```

## [Security Notes](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#security-notes)

* Only the first 5 characters of the password hash are sent to the API
* The full password is never transmitted
* Provides an additional layer of account security

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/have-i-been-pwned.mdx)

[Previous Page

Captcha](https://www.better-auth.com/docs/plugins/captcha.html)[Next Page

Last Login Method](https://www.better-auth.com/docs/plugins/last-login-method.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#installation)[Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#add-the-plugin-to-your-auth-config)[Usage](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#usage)[Config](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#config)[Security Notes](https://www.better-auth.com/docs/plugins/have-i-been-pwned.html#security-notes)

Ask AI
