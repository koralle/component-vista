---
title: "SAML SSO with Okta | Better Auth"
source_url: "https://www.better-auth.com/docs/guides/saml-sso-with-okta"
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

# SAML SSO with Okta

Copy MarkdownOpen in

This guide walks you through setting up SAML Single Sign-On (SSO) with your Identity Provider (IdP), using Okta as an example. For advanced configuration details and the full API reference, check out the [SSO Plugin Documentation](https://www.better-auth.com/docs/plugins/sso.html).

## [What is SAML?](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#what-is-saml)

SAML (Security Assertion Markup Language) is an XML-based standard for exchanging authentication and authorization data between an Identity Provider (IdP) (e.g., Okta, Azure AD, OneLogin) and a Service Provider (SP) (in this case, Better Auth).

In this setup:

* **IdP (Okta)**: Authenticates users and sends assertions about their identity.
* **SP (Better Auth)**: Validates assertions and logs the user in.up.

### [Step 1: Create a SAML Application in Okta](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-1-create-a-saml-application-in-okta)

1. Log in to your Okta Admin Console
2. Navigate to Applications > Applications
3. Click "Create App Integration"
4. Select "SAML 2.0" as the Sign-in method
5. Configure the following settings:

   * **Single Sign-on URL**: Your Better Auth ACS endpoint (e.g., `http://localhost:3000/api/auth/sso/saml2/sp/acs/sso`). while `sso` being your providerId
   * **Audience URI (SP Entity ID)**: Your Better Auth metadata URL (e.g., `http://localhost:3000/api/auth/sso/saml2/sp/metadata`)
   * **Name ID format**: Email Address or any of your choice.
6. Download the IdP metadata XML file and certificate

### [Step 2: Configure Better Auth](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-2-configure-better-auth)

Here’s an example configuration for Okta in a dev environment:

```
const ssoConfig = {
  defaultSSO: [{
    domain: "localhost:3000", // Your domain
    providerId: "sso",
    samlConfig: {
      // SP Configuration
      issuer: "http://localhost:3000/api/auth/sso/saml2/sp/metadata",
      entryPoint: "https://trial-1076874.okta.com/app/trial-1076874_samltest_1/exktofb0a62hqLAUL697/sso/saml",
      callbackUrl: "/dashboard", // Redirect after successful authentication

      // IdP Configuration
      idpMetadata: {
        entityID: "https://trial-1076874.okta.com/app/exktofb0a62hqLAUL697/sso/saml/metadata",
        singleSignOnService: [{
          Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect",
          Location: "https://trial-1076874.okta.com/app/trial-1076874_samltest_1/exktofb0a62hqLAUL697/sso/saml"
        }],
      },
      cert: `-----BEGIN CERTIFICATE-----
MIIDqjCCApKgAwIBAgIGAZhVGMeUMA0GCSqGSIb3DQEBCwUAMIGVMQswCQYDVQQGEwJVUzETMBEG
...
[Your Okta Certificate]
...
-----END CERTIFICATE-----`,

      // SP Metadata
      spMetadata: {
        metadata: `<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
          entityID="http://localhost:3000/api/sso/saml2/sp/metadata">
          ...
          [Your SP Metadata XML]
          ...
        </md:EntityDescriptor>`
      }
    }
  }]
}
```

### [Step 3: Multiple Default Providers (Optional)](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-3-multiple-default-providers-optional)

You can configure multiple SAML providers for different domains:

```
const ssoConfig = {
  defaultSSO: [
    {
      domain: "company.com",
      providerId: "company-okta",
      samlConfig: {
        // Okta SAML configuration for company.com
      }
    },
    {
      domain: "partner.com",
      providerId: "partner-adfs",
      samlConfig: {
        // ADFS SAML configuration for partner.com
      }
    },
    {
      domain: "contractor.org",
      providerId: "contractor-azure",
      samlConfig: {
        // Azure AD SAML configuration for contractor.org
      }
    }
  ]
}
```

**Explicit**: Pass providerId directly when signing in.
**Domain fallback:** Matches based on the user’s email domain. e.g. [user@company.com](mailto:user@company.com) → matches `company-okta` provider.

### [Step 4: Initiating Sign-In](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-4-initiating-sign-in)

You can start an SSO flow in three ways:

**1. Explicitly by `providerId` (recommended):**

```
// Explicitly specify which provider to use
await authClient.signIn.sso({
  providerId: "company-okta",
  callbackURL: "/dashboard"
});
```

**2. By email domain matching:**

```
// Automatically matches provider based on email domain
await authClient.signIn.sso({
  email: "user@company.com",
  callbackURL: "/dashboard"
});
```

**3. By specifying domain:**

```
// Explicitly specify domain for matching
await authClient.signIn.sso({
  domain: "partner.com",
  callbackURL: "/dashboard"
});
```

**Important Notes**:

* DummyIDP should ONLY be used for development and testing
* Never use these certificates in production
* The example uses `localhost:3000` - adjust URLs for your environment
* For production, always use proper IdP providers like Okta, Azure AD, or OneLogin

### [Step 5: Dynamically Registering SAML Providers](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-5-dynamically-registering-saml-providers)

For dynamic registration, you should register SAML providers using the API. See the [SSO Plugin Documentation](https://www.better-auth.com/docs/plugins/sso.html#register-a-saml-provider) for detailed registration instructions.

Example registration:

```
await authClient.sso.register({
  providerId: "okta-prod",
  issuer: "https://your-domain.com",
  domain: "your-domain.com",
  samlConfig: {
    // Your production SAML configuration
  }
});
```

## [Additional Resources](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#additional-resources)

* [SSO Plugin Documentation](https://www.better-auth.com/docs/plugins/sso.html)
* [Okta SAML Documentation](https://developer.okta.com/docs/concepts/saml/)
* [SAML 2.0 Specification](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/guides/saml-sso-with-okta.mdx)

[Previous Page

Browser Extension Guide](https://www.better-auth.com/docs/guides/browser-extension-guide.html)[Next Page

Optimize for Performance](https://www.better-auth.com/docs/guides/optimizing-for-performance.html)

### On this page

[What is SAML?](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#what-is-saml)[Step 1: Create a SAML Application in Okta](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-1-create-a-saml-application-in-okta)[Step 2: Configure Better Auth](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-2-configure-better-auth)[Step 3: Multiple Default Providers (Optional)](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-3-multiple-default-providers-optional)[Step 4: Initiating Sign-In](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-4-initiating-sign-in)[Step 5: Dynamically Registering SAML Providers](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#step-5-dynamically-registering-saml-providers)[Additional Resources](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html#additional-resources)

Ask AI
