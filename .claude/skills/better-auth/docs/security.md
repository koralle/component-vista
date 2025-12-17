---
title: "Security | Better Auth"
source_url: "https://www.better-auth.com/docs/reference/security"
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

# Security

Copy MarkdownOpen in

This page contains information about security features of Better Auth.

## [Password Hashing](https://www.better-auth.com/docs/reference/security.html#password-hashing)

Better Auth uses the `scrypt` algorithm to hash passwords by default. This algorithm is designed to be memory-hard and CPU-intensive, making it resistant to brute-force attacks. You can customize the password hashing function by setting the `password` option in the configuration. This option should include a `hash` function to hash passwords and a `verify` function to verify them.

## [Session Management](https://www.better-auth.com/docs/reference/security.html#session-management)

### [Session Expiration](https://www.better-auth.com/docs/reference/security.html#session-expiration)

Better Auth uses secure session management to protect user data. Sessions are stored in the database or a secondary storage, if configured, to prevent unauthorized access. By default, sessions expire after 7 days, but you can customize this value in the configuration. Additionally, each time a session is used, if it reaches the `updateAge` threshold, the expiration date is extended, which by default is set to 1 day.

### [Session Revocation](https://www.better-auth.com/docs/reference/security.html#session-revocation)

Better Auth allows you to revoke sessions to enhance security. When a session is revoked, the user is logged out and can no longer access the application. A logged in user can also revoke their own sessions to log out from different devices or browsers.

See the [session management](https://www.better-auth.com/docs/concepts/session-management.html) for more details.

## [CSRF Protection](https://www.better-auth.com/docs/reference/security.html#csrf-protection)

Better Auth includes multiple safeguards to prevent Cross-Site Request Forgery (CSRF) attacks:

1. **Avoid simple requests**
   See [Avoiding simple requests](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF#avoiding_simple_requests) for more details. Better Auth only allows requests with a non-simple header or a `Content-Type` header of `application/json`.
2. **Origin Validation**
   Each request’s `Origin` header is verified to confirm it comes from your application or another explicitly trusted source. Requests from untrusted origins are rejected. By default, Better Auth trusts the base URL of your app, but you can specify additional trusted origins via the `trustedOrigins` configuration option.
3. **Secure Cookie Settings**
   Session cookies use the `SameSite=Lax` attribute by default, preventing browsers from sending cookies with most cross-site requests. You can override this behavior using the `defaultCookieAttributes` option.
4. **No Mutations on GET Requests (with additional safeguards)**
   `GET` requests are assumed to be read-only and should not alter the application’s state. In cases where a `GET` request must perform a mutation—such as during OAuth callbacks - Better Auth applies extra security measures, including validating `nonce` and `state` parameters to ensure the request’s authenticity.

You can skip the CSRF check for all requests by setting the `disableCSRFCheck` option to `true` in the configuration.

```
{
  advanced: {
    disableCSRFCheck: true
  }
}
```

You can skip the origin check for all requests by setting the `disableOriginCheck` option to `true` in the configuration.

```
{
  advanced: {
    disableOriginCheck: true
  }
}
```

Skipping csrf check will open your application to CSRF attacks. And skipping origin check may open up your application to other security vulnerabilities including open redirects.

## [OAuth State and PKCE](https://www.better-auth.com/docs/reference/security.html#oauth-state-and-pkce)

To secure OAuth flows, Better Auth stores the OAuth state and PKCE (Proof Key for Code Exchange) in the database. The state helps prevent CSRF attacks, while PKCE protects against code injection threats. Once the OAuth process completes, these values are removed from the database.

## [Cookies](https://www.better-auth.com/docs/reference/security.html#cookies)

Better Auth assigns secure cookies by default when the base URL uses `https`. These secure cookies are encrypted and only sent over secure connections, adding an extra layer of protection. They are also set with the `sameSite` attribute to `lax` by default to prevent cross-site request forgery attacks. And the `httpOnly` attribute is enabled to prevent client-side JavaScript from accessing the cookie.

For Cross-Subdomain Cookies, you can set the `crossSubDomainCookies` option in the configuration. This option allows cookies to be shared across subdomains, enabling seamless authentication across multiple subdomains.

### [Customizing Cookies](https://www.better-auth.com/docs/reference/security.html#customizing-cookies)

You can customize cookie names to minimize the risk of fingerprinting attacks and set specific cookie options as needed for additional control. For more information, refer to the [cookie options](https://www.better-auth.com/docs/concepts/cookies.html).

Plugins can also set custom cookie options to align with specific security needs. If you're using Better Auth in non-browser environments, plugins offer ways to manage cookies securely in those contexts as well.

## [Rate Limiting](https://www.better-auth.com/docs/reference/security.html#rate-limiting)

Better Auth includes built-in rate limiting to safeguard against brute-force attacks. Rate limits are applied across all routes by default, with specific routes subject to stricter limits based on potential risk.

## [IP Address Headers](https://www.better-auth.com/docs/reference/security.html#ip-address-headers)

Better Auth uses client IP addresses for rate limiting and security monitoring. By default, it reads the IP address from the standard `X-Forwarded-For` header. However, you can configure a specific trusted header to ensure accurate IP address detection and prevent IP spoofing attacks.

You can configure the IP address header in your Better Auth configuration:

```
{
  advanced: {
    ipAddress: {
      ipAddressHeaders: ['cf-connecting-ip'] // or any other custom header
    }
  }
}
```

This ensures that Better Auth only accepts IP addresses from your trusted proxy's header, making it more difficult for attackers to bypass rate limiting or other IP-based security measures by spoofing headers.

> **Important**: When setting a custom IP address header, ensure that your proxy or load balancer is properly configured to set this header, and that it cannot be set by end users directly.

## [Trusted Origins](https://www.better-auth.com/docs/reference/security.html#trusted-origins)

Trusted origins prevent CSRF attacks and block open redirects. You can set a list of trusted origins in the `trustedOrigins` configuration option. Requests from origins not on this list are automatically blocked.

### [Basic Usage](https://www.better-auth.com/docs/reference/security.html#basic-usage)

The most basic usage is to specify exact origins:

```
{
  trustedOrigins: [
    "https://example.com",
    "https://app.example.com",
    "http://localhost:3000"
  ]
}
```

### [Wildcard Origins](https://www.better-auth.com/docs/reference/security.html#wildcard-origins)

Better Auth supports wildcard patterns in trusted origins, which allows you to trust multiple subdomains with a single entry:

```
{
  trustedOrigins: [
    "*.example.com",             // Trust all subdomains of example.com (any protocol)
    "https://*.example.com",     // Trust only HTTPS subdomains of example.com
    "http://*.dev.example.com"   // Trust all HTTP subdomains of dev.example.com
  ]
}
```

#### [Protocol-specific wildcards](https://www.better-auth.com/docs/reference/security.html#protocol-specific-wildcards)

When using a wildcard pattern with a protocol prefix (like `https://`):

* The protocol must match exactly
* The domain can have any subdomain in place of the `*`
* Requests using a different protocol will be rejected, even if the domain matches

#### [Protocol-agnostic wildcards](https://www.better-auth.com/docs/reference/security.html#protocol-agnostic-wildcards)

When using a wildcard pattern without a protocol prefix (like `*.example.com`):

* Any protocol (http, https, etc.) will be accepted
* The domain must match the wildcard pattern

### [Custom Schemes](https://www.better-auth.com/docs/reference/security.html#custom-schemes)

Trusted origins also support custom schemes for mobile apps and browser extensions:

```
{
  trustedOrigins: [
    "myapp://",                               // Mobile app scheme
    "chrome-extension://YOUR_EXTENSION_ID",   // Browser extension
    "exp://*/*",                              // Trust all Expo development URLs
    "exp://10.0.0.*:*/*",                     // Trust 10.0.0.x IP range with any port
  ]
}
```

### [Dynamic origin list](https://www.better-auth.com/docs/reference/security.html#dynamic-origin-list)

You can also dynamically set the list of trusted origins by providing a function that returns it:

```
{
  trustedOrigins: async (request) => {
    const trustedOrigins = await queryTrustedDomains();
    return trustedOrigins;
  }
}
```

**Important**: This function will be invoked per incoming request, so be careful if you decide to dynamically fetch your list of trusted domains.

## [Reporting Vulnerabilities](https://www.better-auth.com/docs/reference/security.html#reporting-vulnerabilities)

If you discover a security vulnerability in Better Auth, please report it to us at [security@better-auth.com](mailto:security@better-auth.com). We address all reports promptly, and credits will be given for validated discoveries.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/reference/security.mdx)

[Previous Page

Resources](https://www.better-auth.com/docs/reference/resources.html)[Next Page

Telemetry](https://www.better-auth.com/docs/reference/telemetry.html)

### On this page

[Password Hashing](https://www.better-auth.com/docs/reference/security.html#password-hashing)[Session Management](https://www.better-auth.com/docs/reference/security.html#session-management)[Session Expiration](https://www.better-auth.com/docs/reference/security.html#session-expiration)[Session Revocation](https://www.better-auth.com/docs/reference/security.html#session-revocation)[CSRF Protection](https://www.better-auth.com/docs/reference/security.html#csrf-protection)[OAuth State and PKCE](https://www.better-auth.com/docs/reference/security.html#oauth-state-and-pkce)[Cookies](https://www.better-auth.com/docs/reference/security.html#cookies)[Customizing Cookies](https://www.better-auth.com/docs/reference/security.html#customizing-cookies)[Rate Limiting](https://www.better-auth.com/docs/reference/security.html#rate-limiting)[IP Address Headers](https://www.better-auth.com/docs/reference/security.html#ip-address-headers)[Trusted Origins](https://www.better-auth.com/docs/reference/security.html#trusted-origins)[Basic Usage](https://www.better-auth.com/docs/reference/security.html#basic-usage)[Wildcard Origins](https://www.better-auth.com/docs/reference/security.html#wildcard-origins)[Protocol-specific wildcards](https://www.better-auth.com/docs/reference/security.html#protocol-specific-wildcards)[Protocol-agnostic wildcards](https://www.better-auth.com/docs/reference/security.html#protocol-agnostic-wildcards)[Custom Schemes](https://www.better-auth.com/docs/reference/security.html#custom-schemes)[Dynamic origin list](https://www.better-auth.com/docs/reference/security.html#dynamic-origin-list)[Reporting Vulnerabilities](https://www.better-auth.com/docs/reference/security.html#reporting-vulnerabilities)

Ask AI
