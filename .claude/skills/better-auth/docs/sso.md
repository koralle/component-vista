---
title: "Single Sign-On (SSO) | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/sso"
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

# Single Sign-On (SSO)

Copy MarkdownOpen in

`OIDC` `OAuth2` `SSO` `SAML`

Single Sign-On (SSO) allows users to authenticate with multiple applications using a single set of credentials. This plugin supports OpenID Connect (OIDC), OAuth2 providers, and SAML 2.0.

The SAML 2.0 support is in active development and may not be suitable for production use. Please report any issues or bugs on [GitHub](https://github.com/better-auth/better-auth).

## [Installation](https://www.better-auth.com/docs/plugins/sso.html#installation)

### [Install the plugin](https://www.better-auth.com/docs/plugins/sso.html#install-the-plugin)

```
npm install @better-auth/sso
```

### [Add Plugin to the server](https://www.better-auth.com/docs/plugins/sso.html#add-plugin-to-the-server)

auth.ts

```
import { betterAuth } from "better-auth"
import { sso } from "@better-auth/sso";

const auth = betterAuth({
    plugins: [
        sso()
    ]
})
```

### [Migrate the database](https://www.better-auth.com/docs/plugins/sso.html#migrate-the-database)

Run the migration or generate the schema to add the necessary fields and tables to the database.

migrategenerate

npmpnpmyarnbun

```
npx @better-auth/cli migrate
```

npmpnpmyarnbun

```
npx @better-auth/cli generate
```

See the [Schema](https://www.better-auth.com/docs/plugins/sso.html#schema) section to add the fields manually.

### [Add the client plugin](https://www.better-auth.com/docs/plugins/sso.html#add-the-client-plugin)

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { ssoClient } from "@better-auth/sso/client"

const authClient = createAuthClient({
    plugins: [
        ssoClient()
    ]
})
```

## [Usage](https://www.better-auth.com/docs/plugins/sso.html#usage)

### [Register an OIDC Provider](https://www.better-auth.com/docs/plugins/sso.html#register-an-oidc-provider)

To register an OIDC provider, use the `registerSSOProvider` endpoint and provide the necessary configuration details for the provider.

A redirect URL will be automatically generated using the provider ID. For instance, if the provider ID is `hydra`, the redirect URL would be `{baseURL}/api/auth/sso/callback/hydra`. Note that `/api/auth` may vary depending on your base path configuration.

When you register an OIDC provider, Better Auth automatically fetches and validates the IdP's [OIDC discovery document](https://www.better-auth.com/docs/plugins/sso.html#oidc-discovery). Most endpoint fields are optional — see [OIDC Discovery](https://www.better-auth.com/docs/plugins/sso.html#oidc-discovery) for details on auto-discovered fields and possible registration errors.

#### [Example](https://www.better-auth.com/docs/plugins/sso.html#example)

clientserver

register-oidc-provider.ts

```
import { authClient } from "@/lib/auth-client";

// Register with OIDC configuration
await authClient.sso.register({
    providerId: "example-provider",
    issuer: "https://idp.example.com",
    domain: "example.com",
    oidcConfig: {
        clientId: "client-id",
        clientSecret: "client-secret",
        authorizationEndpoint: "https://idp.example.com/authorize",
        tokenEndpoint: "https://idp.example.com/token",
        jwksEndpoint: "https://idp.example.com/jwks",
        discoveryEndpoint: "https://idp.example.com/.well-known/openid-configuration",
        scopes: ["openid", "email", "profile"],
        pkce: true,
        mapping: {
            id: "sub",
            email: "email",
            emailVerified: "email_verified",
            name: "name",
            image: "picture",
            extraFields: {
                department: "department",
                role: "role"
            }
        }
    }
});
```

register-oidc-provider.ts

```
const { headers } = await signInWithTestUser();
await auth.api.registerSSOProvider({
    body: {
        providerId: "example-provider",
        issuer: "https://idp.example.com",
        domain: "example.com",
        oidcConfig: {
            clientId: "your-client-id",
            clientSecret: "your-client-secret",
            authorizationEndpoint: "https://idp.example.com/authorize",
            tokenEndpoint: "https://idp.example.com/token",
            jwksEndpoint: "https://idp.example.com/jwks",
            discoveryEndpoint: "https://idp.example.com/.well-known/openid-configuration",
            scopes: ["openid", "email", "profile"],
            pkce: true,
            mapping: {
                id: "sub",
                email: "email",
                emailVerified: "email_verified",
                name: "name",
                image: "picture",
                extraFields: {
                    department: "department",
                    role: "role"
                }
            }
        }
    },
    headers,
});
```

### [OIDC Discovery](https://www.better-auth.com/docs/plugins/sso.html#oidc-discovery)

Better Auth automatically fetches and validates the provider's [OpenID Connect Discovery Document](https://openid.net/specs/openid-connect-discovery-1_0.html) from:

```
{issuer}/.well-known/openid-configuration
```

This allows most endpoint-related fields in `oidcConfig` to be **optional** — they will be hydrated automatically from the Identity Provider (IdP).

ClientServer

POST

/sso/register

Notes

Minimal OIDC configuration — endpoints are discovered automatically from the issuer.

```
const { data, error } = await authClient.sso.register({    providerId: "okta", // required    issuer: "https://your-org.okta.com", // required    domain: "yourcompany.com", // required    oidcConfig: { // required        clientId: "your-client-id", // required        clientSecret: "your-client-secret", // required    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | Unique identifier for the provider | `string` |
| `issuer` | The OIDC issuer URL. Discovery document is fetched from `{issuer}/.well-known/openid-configuration` | `string` |
| `domain` | Email domain for this provider | `string` |
| `oidcConfig` | OIDC configuration (most fields are auto-discovered) | `Object` |
| `oidcConfig.clientId` | OAuth client ID from your IdP | `string` |
| `oidcConfig.clientSecret` | OAuth client secret from your IdP | `string` |

POST

/sso/register

Notes

Minimal OIDC configuration — endpoints are discovered automatically from the issuer.

```
const data = await auth.api.registerSSOProvider({    body: {        providerId: "okta", // required        issuer: "https://your-org.okta.com", // required        domain: "yourcompany.com", // required        oidcConfig: { // required            clientId: "your-client-id", // required            clientSecret: "your-client-secret", // required        },    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | Unique identifier for the provider | `string` |
| `issuer` | The OIDC issuer URL. Discovery document is fetched from `{issuer}/.well-known/openid-configuration` | `string` |
| `domain` | Email domain for this provider | `string` |
| `oidcConfig` | OIDC configuration (most fields are auto-discovered) | `Object` |
| `oidcConfig.clientId` | OAuth client ID from your IdP | `string` |
| `oidcConfig.clientSecret` | OAuth client secret from your IdP | `string` |

#### [Fields Automatically Discovered](https://www.better-auth.com/docs/plugins/sso.html#fields-automatically-discovered)

Better Auth fills in the following fields by reading the IdP's discovery document (if not explicitly provided):

* `authorizationEndpoint`
* `tokenEndpoint`
* `jwksEndpoint`
* `userInfoEndpoint`
* `discoveryEndpoint`
* `tokenEndpointAuthentication` (method for token endpoint client authentication)

Following the spec, our discovery process expects all URLs to be valid and to be absolute urls. Relative paths are also supported and resolved relative to the issuer's base URL preserving the path when available.

Example of relative endpoint and issuer without base path:

* `issuer`: `"https://your-org.okta.com"`
* `token_endpoint`: `"/v1/tokens"`
* normalized `token_endpoint`: `"https://your-org.okta.com/v1/tokens"`

Example of relative endpoint and issuer with base path:

* `issuer`: `"https://your-org.okta.com/v1"`
* `token_endpoint`: `"/tokens"`
* normalized `token_endpoint`: `"https://your-org.okta.com/v1/tokens"`

If you explicitly set these fields in `oidcConfig`, your values override the discovered ones.
This is useful when you need to override the IdP's advertised metadata or when using incomplete mock servers.

#### [Trusted origins](https://www.better-auth.com/docs/plugins/sso.html#trusted-origins)

Both the discovery endpoint as well as any URL resolved through the discovery process are subject to your app's [`trustedOrigins`](https://www.better-auth.com/docs/reference/security.html#trusted-origins) configuration.
Discovery will fail with the `discovery_untrusted_origin` code unless you explicitly update your `trustedOrigins` configuration:

```
trustedOrigins: ["https://your-org.okta.com"],
```

If your use-case requires to support multiple arbitrary but known IDPs (e.g Okta), we recommend to:

1. Register a list of well known IDPs ahead of time

```
trustedOrigins: [
    "https://your-org.okta.com",
    "https://accounts.google.com",
    "https://login.microsoftonline.com",
    "https://auth0.com",
    "https://idp.example.com"
],
```

2. Or dynamically compute the `trustedOrigins` by specifying a callback function:

```
trustedOrigins: async (request: Request) => {
    // SSO trusted origin list
    if (request.url.endsWith("/sso/register")) {
        const trustedOrigins = await fetchOriginList();
        return trustedOrigins;
    }

    // Your normal origin list for everything else
    return [];
}
```

See the [`trustedOrigins`](https://www.better-auth.com/docs/reference/security.html#trusted-origins) docs for more information.

#### [Why Discovery Can Fail](https://www.better-auth.com/docs/plugins/sso.html#why-discovery-can-fail)

Better Auth validates that the IdP's metadata is correct and complete **before** allowing registration. This prevents subtle runtime failures during sign-in or token validation.

Better Auth does **not** support implicit-only OIDC flows.
For this reason, `token_endpoint` and `jwks_uri` are required even though the OIDC spec allows implicit-only providers to omit `token_endpoint`.

#### [Discovery Errors](https://www.better-auth.com/docs/plugins/sso.html#discovery-errors)

If the Identity Provider is misconfigured or unreachable, registration will fail with a structured error.

| Error Code | Meaning |
| --- | --- |
| `issuer_mismatch` | The IdP's discovery document reports a different `issuer` than the one you configured |
| `discovery_incomplete` | Required fields (`authorization_endpoint`, `token_endpoint`, `jwks_uri`) are missing |
| `discovery_not_found` | The discovery document endpoint returned 404 |
| `discovery_timeout` | The IdP did not respond within the timeout window (default: 10 seconds) |
| `discovery_invalid_url` | The discovery URL is malformed or uses an unsupported protocol |
| `discovery_untrusted_origin` | The discovery URL or one of the URLs discovered as part of this process was not trusted by your app's trusted origins configuration |
| `discovery_invalid_json` | The discovery response is empty or not valid JSON |
| `unsupported_token_auth_method` | The IdP only supports token auth methods that Better Auth doesn't support |

**Supported token auth methods:**

* `client_secret_basic`
* `client_secret_post`

If your IdP advertises only unsupported methods (e.g., `private_key_jwt`, `tls_client_auth`, or `"none"` for public clients), you can explicitly override the method:

```
oidcConfig: {
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
    tokenEndpointAuthentication: "client_secret_basic", // Override discovery
}
```

This is especially common with mock OIDC servers or development IdPs that only advertise `"none"` as the supported method.

#### [Summary](https://www.better-auth.com/docs/plugins/sso.html#summary)

* Better Auth automatically performs OIDC discovery at registration time
* Most endpoint settings in `oidcConfig` become optional
* Explicit user configuration always overrides discovery
* Registration fails fast if the IdP is misconfigured
* Discovery errors are structured and well-defined
* Public-client IdPs or mock servers may require overriding `tokenEndpointAuthentication`

### [Register a SAML Provider](https://www.better-auth.com/docs/plugins/sso.html#register-a-saml-provider)

To register a SAML provider, use the `registerSSOProvider` endpoint with SAML configuration details. The provider will act as a Service Provider (SP) and integrate with your Identity Provider (IdP).

clientserver

register-saml-provider.ts

```
import { authClient } from "@/lib/auth-client";

await authClient.sso.register({
    providerId: "saml-provider",
    issuer: "https://idp.example.com",
    domain: "example.com",
    samlConfig: {
        entryPoint: "https://idp.example.com/sso",
        cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
        callbackUrl: "https://yourapp.com/api/auth/sso/saml2/callback/saml-provider",
        audience: "https://yourapp.com",
        wantAssertionsSigned: true,
        signatureAlgorithm: "sha256",
        digestAlgorithm: "sha256",
        identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        idpMetadata: {
            metadata: "<!-- IdP Metadata XML -->",
            privateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
            privateKeyPass: "your-private-key-password",
            isAssertionEncrypted: true,
            encPrivateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
            encPrivateKeyPass: "your-encryption-key-password"
        },
        spMetadata: {
            metadata: "<!-- SP Metadata XML -->",
            binding: "post",
            privateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
            privateKeyPass: "your-sp-private-key-password",
            isAssertionEncrypted: true,
            encPrivateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
            encPrivateKeyPass: "your-sp-encryption-key-password"
        },
        mapping: {
            id: "nameID",
            email: "email",
            name: "displayName",
            firstName: "givenName",
            lastName: "surname",
            emailVerified: "email_verified",
            extraFields: {
                department: "department",
                role: "role"
            }
        }
    }
});
```

register-saml-provider.ts

```
const { headers } = await signInWithTestUser();
await auth.api.registerSSOProvider({
    body: {
        providerId: "saml-provider",
        issuer: "https://idp.example.com",
        domain: "example.com",
        samlConfig: {
            entryPoint: "https://idp.example.com/sso",
            cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
            callbackUrl: "https://yourapp.com/api/auth/sso/saml2/callback/saml-provider",
            audience: "https://yourapp.com",
            wantAssertionsSigned: true,
            signatureAlgorithm: "sha256",
            digestAlgorithm: "sha256",
            identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
            idpMetadata: {
                metadata: "<!-- IdP Metadata XML -->",
                privateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
                privateKeyPass: "your-private-key-password",
                isAssertionEncrypted: true,
                encPrivateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
                encPrivateKeyPass: "your-encryption-key-password"
            },
            spMetadata: {
                metadata: "<!-- SP Metadata XML -->",
                binding: "post",
                privateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
                privateKeyPass: "your-sp-private-key-password",
                isAssertionEncrypted: true,
                encPrivateKey: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
                encPrivateKeyPass: "your-sp-encryption-key-password"
            },
            mapping: {
                id: "nameID",
                email: "email",
                name: "displayName",
                firstName: "givenName",
                lastName: "surname",
                emailVerified: "email_verified",
                extraFields: {
                    department: "department",
                    role: "role"
                }
            }
        }
    },
    headers,
});
```

### [Get Service Provider Metadata](https://www.better-auth.com/docs/plugins/sso.html#get-service-provider-metadata)

For SAML providers, you can retrieve the Service Provider metadata XML that needs to be configured in your Identity Provider:

get-sp-metadata.ts

```
const response = await auth.api.spMetadata({
    query: {
        providerId: "saml-provider",
        format: "xml" // or "json"
    }
});

const metadataXML = await response.text();
console.log(metadataXML);
```

### [Sign In with SSO](https://www.better-auth.com/docs/plugins/sso.html#sign-in-with-sso)

To sign in with an SSO provider, you can call `signIn.sso`

You can sign in using the email with domain matching:

sign-in.ts

```
const res = await authClient.signIn.sso({
    email: "user@example.com",
    callbackURL: "/dashboard",
});
```

or you can specify the domain:

sign-in-domain.ts

```
const res = await authClient.signIn.sso({
    domain: "example.com",
    callbackURL: "/dashboard",
});
```

You can also sign in using the organization slug if a provider is associated with an organization:

sign-in-org.ts

```
const res = await authClient.signIn.sso({
    organizationSlug: "example-org",
    callbackURL: "/dashboard",
});
```

Alternatively, you can sign in using the provider's ID:

sign-in-provider-id.ts

```
const res = await authClient.signIn.sso({
    providerId: "example-provider-id",
    callbackURL: "/dashboard",
});
```

Optionally, you can pass a login hint (for example, an email address or another identifier) to prefill or direct the identity provider:

sign-in-with-login-hint.ts

```
const res = await authClient.signIn.sso({
    providerId: "example-provider-id",
    loginHint: "user@example.com",
    callbackURL: "/dashboard",
});
```

To use the server API you can use `signInSSO`

sign-in-org.ts

```
const res = await auth.api.signInSSO({
    body: {
        organizationSlug: "example-org",
        callbackURL: "/dashboard",
    }
});
```

#### [Full method](https://www.better-auth.com/docs/plugins/sso.html#full-method)

ClientServer

POST

/sign-in/sso

```
const { data, error } = await authClient.signIn.sso({    email: "john@example.com",    organizationSlug: "example-org",    providerId: "example-provider",    domain: "example.com",    callbackURL: "https://example.com/callback", // required    errorCallbackURL: "https://example.com/callback",    newUserCallbackURL: "https://example.com/new-user",    scopes: ["openid", "email", "profile", "offline_access"],    loginHint: "user@example.com",    requestSignUp: true,});
```

| Prop | Description | Type |
| --- | --- | --- |
| `email?` | The email address to sign in with. This is used to identify the issuer to sign in with. It's optional if the issuer is provided. | `string` |
| `organizationSlug?` | The slug of the organization to sign in with. | `string` |
| `providerId?` | The ID of the provider to sign in with. This can be provided instead of email or issuer. | `string` |
| `domain?` | The domain of the provider. | `string` |
| `callbackURL` | The URL to redirect to after login. | `string` |
| `errorCallbackURL?` | The URL to redirect to after login. | `string` |
| `newUserCallbackURL?` | The URL to redirect to after login if the user is new. | `string` |
| `scopes?` | Scopes to request from the provider. | `string[]` |
| `loginHint?` | Login hint to send to the identity provider (e.g., email or identifier). | `string` |
| `requestSignUp?` | Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. | `boolean` |

POST

/sign-in/sso

```
const data = await auth.api.signInSSO({    body: {        email: "john@example.com",        organizationSlug: "example-org",        providerId: "example-provider",        domain: "example.com",        callbackURL: "https://example.com/callback", // required        errorCallbackURL: "https://example.com/callback",        newUserCallbackURL: "https://example.com/new-user",        scopes: ["openid", "email", "profile", "offline_access"],        loginHint: "user@example.com",        requestSignUp: true,    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `email?` | The email address to sign in with. This is used to identify the issuer to sign in with. It's optional if the issuer is provided. | `string` |
| `organizationSlug?` | The slug of the organization to sign in with. | `string` |
| `providerId?` | The ID of the provider to sign in with. This can be provided instead of email or issuer. | `string` |
| `domain?` | The domain of the provider. | `string` |
| `callbackURL` | The URL to redirect to after login. | `string` |
| `errorCallbackURL?` | The URL to redirect to after login. | `string` |
| `newUserCallbackURL?` | The URL to redirect to after login if the user is new. | `string` |
| `scopes?` | Scopes to request from the provider. | `string[]` |
| `loginHint?` | Login hint to send to the identity provider (e.g., email or identifier). | `string` |
| `requestSignUp?` | Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. | `boolean` |

Note: If email is provided and loginHint is not specified, email will be sent as the login\_hint to OIDC providers automatically. SAML flows do not support login\_hint.

When a user is authenticated, if the user does not exist, the user will be provisioned using the `provisionUser` function. If the organization provisioning is enabled and a provider is associated with an organization, the user will be added to the organization.

auth.ts

```
const auth = betterAuth({
    plugins: [
        sso({
            provisionUser: async (user) => {
                // provision user
            },
            organizationProvisioning: {
                disabled: false,
                defaultRole: "member",
                getRole: async (user) => {
                    // get role if needed
                },
            },
        }),
    ],
});
```

## [Provisioning](https://www.better-auth.com/docs/plugins/sso.html#provisioning)

The SSO plugin provides powerful provisioning capabilities to automatically set up users and manage their organization memberships when they sign in through SSO providers.

### [User Provisioning](https://www.better-auth.com/docs/plugins/sso.html#user-provisioning)

User provisioning allows you to run custom logic whenever a user signs in through an SSO provider. This is useful for:

* Setting up user profiles with additional data from the SSO provider
* Synchronizing user attributes with external systems
* Creating user-specific resources
* Logging SSO sign-ins
* Updating user information from the SSO provider

auth.ts

```
const auth = betterAuth({
    plugins: [
        sso({
            provisionUser: async ({ user, userInfo, token, provider }) => {
                // Update user profile with SSO data
                await updateUserProfile(user.id, {
                    department: userInfo.attributes?.department,
                    jobTitle: userInfo.attributes?.jobTitle,
                    manager: userInfo.attributes?.manager,
                    lastSSOLogin: new Date(),
                });

                // Create user-specific resources
                await createUserWorkspace(user.id);

                // Sync with external systems
                await syncUserWithCRM(user.id, userInfo);

                // Log the SSO sign-in
                await auditLog.create({
                    userId: user.id,
                    action: 'sso_signin',
                    provider: provider.providerId,
                    metadata: {
                        email: userInfo.email,
                        ssoProvider: provider.issuer,
                    },
                });
            },
        }),
    ],
});
```

The `provisionUser` function receives:

* **user**: The user object from the database
* **userInfo**: User information from the SSO provider (includes attributes, email, name, etc.)
* **token**: OAuth2 tokens (for OIDC providers) - may be undefined for SAML
* **provider**: The SSO provider configuration

### [Organization Provisioning](https://www.better-auth.com/docs/plugins/sso.html#organization-provisioning)

Organization provisioning automatically manages user memberships in organizations when SSO providers are linked to specific organizations. This is particularly useful for:

* Enterprise SSO where each company/domain maps to an organization
* Automatic role assignment based on SSO attributes
* Managing team memberships through SSO

#### [Basic Organization Provisioning](https://www.better-auth.com/docs/plugins/sso.html#basic-organization-provisioning)

auth.ts

```
const auth = betterAuth({
    plugins: [
        sso({
            organizationProvisioning: {
                disabled: false,           // Enable org provisioning
                defaultRole: "member",     // Default role for new members
            },
        }),
    ],
});
```

#### [Advanced Organization Provisioning with Custom Roles](https://www.better-auth.com/docs/plugins/sso.html#advanced-organization-provisioning-with-custom-roles)

auth.ts

```
const auth = betterAuth({
    plugins: [
        sso({
            organizationProvisioning: {
                disabled: false,
                defaultRole: "member",
                getRole: async ({ user, userInfo, provider }) => {
                    // Assign roles based on SSO attributes
                    const department = userInfo.attributes?.department;
                    const jobTitle = userInfo.attributes?.jobTitle;

                    // Admins based on job title
                    if (jobTitle?.toLowerCase().includes('manager') ||
                        jobTitle?.toLowerCase().includes('director') ||
                        jobTitle?.toLowerCase().includes('vp')) {
                        return "admin";
                    }

                    // Special roles for IT department
                    if (department?.toLowerCase() === 'it') {
                        return "admin";
                    }

                    // Default to member for everyone else
                    return "member";
                },
            },
        }),
    ],
});
```

#### [Linking SSO Providers to Organizations](https://www.better-auth.com/docs/plugins/sso.html#linking-sso-providers-to-organizations)

When registering an SSO provider, you can link it to a specific organization:

register-org-provider.ts

```
await auth.api.registerSSOProvider({
    body: {
        providerId: "acme-corp-saml",
        issuer: "https://acme-corp.okta.com",
        domain: "acmecorp.com",
        organizationId: "org_acme_corp_id", // Link to organization
        samlConfig: {
            // SAML configuration...
        },
    },
    headers,
});
```

Now when users from `acmecorp.com` sign in through this provider, they'll automatically be added to the "Acme Corp" organization with the appropriate role.

#### [Multiple Organizations Example](https://www.better-auth.com/docs/plugins/sso.html#multiple-organizations-example)

You can set up multiple SSO providers for different organizations:

multi-org-setup.ts

```
// Acme Corp SAML provider
await auth.api.registerSSOProvider({
    body: {
        providerId: "acme-corp",
        issuer: "https://acme.okta.com",
        domain: "acmecorp.com",
        organizationId: "org_acme_id",
        samlConfig: { /* ... */ },
    },
    headers,
});

// TechStart OIDC provider
await auth.api.registerSSOProvider({
    body: {
        providerId: "techstart-google",
        issuer: "https://accounts.google.com",
        domain: "techstart.io",
        organizationId: "org_techstart_id",
        oidcConfig: { /* ... */ },
    },
    headers,
});
```

#### [Organization Provisioning Flow](https://www.better-auth.com/docs/plugins/sso.html#organization-provisioning-flow)

1. **User signs in** through an SSO provider linked to an organization
2. **User is authenticated** and either found or created in the database
3. **Organization membership is checked** - if the user isn't already a member of the linked organization
4. **Role is determined** using either the `defaultRole` or `getRole` function
5. **User is added** to the organization with the determined role
6. **User provisioning runs** (if configured) for additional setup

### [Provisioning Best Practices](https://www.better-auth.com/docs/plugins/sso.html#provisioning-best-practices)

#### [1. Idempotent Operations](https://www.better-auth.com/docs/plugins/sso.html#1-idempotent-operations)

Make sure your provisioning functions can be safely run multiple times:

```
provisionUser: async ({ user, userInfo }) => {
    // Check if already provisioned
    const existingProfile = await getUserProfile(user.id);
    if (!existingProfile.ssoProvisioned) {
        await createUserResources(user.id);
        await markAsProvisioned(user.id);
    }

    // Always update attributes (they might change)
    await updateUserAttributes(user.id, userInfo.attributes);
},
```

#### [2. Error Handling](https://www.better-auth.com/docs/plugins/sso.html#2-error-handling)

Handle errors gracefully to avoid blocking user sign-in:

```
provisionUser: async ({ user, userInfo }) => {
    try {
        await syncWithExternalSystem(user, userInfo);
    } catch (error) {
        // Log error but don't throw - user can still sign in
        console.error('Failed to sync user with external system:', error);
        await logProvisioningError(user.id, error);
    }
},
```

#### [3. Conditional Provisioning](https://www.better-auth.com/docs/plugins/sso.html#3-conditional-provisioning)

Only run certain provisioning steps when needed:

```
organizationProvisioning: {
    disabled: false,
    getRole: async ({ user, userInfo, provider }) => {
        // Only process role assignment for certain providers
        if (provider.providerId.includes('enterprise')) {
            return determineEnterpriseRole(userInfo);
        }
        return "member";
    },
},
```

## [SAML Configuration](https://www.better-auth.com/docs/plugins/sso.html#saml-configuration)

### [Default SSO Provider](https://www.better-auth.com/docs/plugins/sso.html#default-sso-provider)

auth.ts

```
const auth = betterAuth({
    plugins: [
        sso({
            defaultSSO: [
                {
                    providerId: "default-saml", // Provider ID for the default provider
                    domain: "http://your-app.com",
                    samlConfig: {
                        issuer: "https://your-app.com",
                        entryPoint: "https://idp.example.com/sso",
                        cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
                        callbackUrl: "http://localhost:3000/api/auth/sso/saml2/sp/acs",
                        spMetadata: {
                            entityID: "http://localhost:3000/api/auth/sso/saml2/sp/metadata",
                            metadata: "<!-- Your SP Metadata XML -->",
                        }
                    }
                }
            ]
        })
    ]
});
```

The defaultSSO provider will be used when:

1. No matching provider is found in the database

This allows you to test SAML authentication without setting up providers in the database. The defaultSSO provider supports all the same configuration options as regular SAML providers.

### [Service Provider Configuration](https://www.better-auth.com/docs/plugins/sso.html#service-provider-configuration)

When registering a SAML provider, you need to provide Service Provider (SP) metadata configuration:

* **metadata**: XML metadata for the Service Provider
* **binding**: The binding method, typically "post" or "redirect"
* **privateKey**: Private key for signing (optional)
* **privateKeyPass**: Password for the private key (if encrypted)
* **isAssertionEncrypted**: Whether assertions should be encrypted
* **encPrivateKey**: Private key for decryption (if encryption is enabled)
* **encPrivateKeyPass**: Password for the encryption private key

### [Identity Provider Configuration](https://www.better-auth.com/docs/plugins/sso.html#identity-provider-configuration)

You also need to provide Identity Provider (IdP) configuration:

* **metadata**: XML metadata from your Identity Provider
* **privateKey**: Private key for the IdP communication (optional)
* **privateKeyPass**: Password for the IdP private key (if encrypted)
* **isAssertionEncrypted**: Whether assertions from IdP are encrypted
* **encPrivateKey**: Private key for IdP assertion decryption
* **encPrivateKeyPass**: Password for the IdP decryption key

### [SAML Attribute Mapping](https://www.better-auth.com/docs/plugins/sso.html#saml-attribute-mapping)

Configure how SAML attributes map to user fields:

```
mapping: {
    id: "nameID",           // Default: "nameID"
    email: "email",         // Default: "email" or "nameID"
    name: "displayName",    // Default: "displayName"
    firstName: "givenName", // Default: "givenName"
    lastName: "surname",    // Default: "surname"
    extraFields: {
        department: "department",
        role: "jobTitle",
        phone: "telephoneNumber"
    }
}
```

## [SAML Security](https://www.better-auth.com/docs/plugins/sso.html#saml-security)

The SSO plugin includes optional security features to protect against common SAML vulnerabilities.

### [AuthnRequest / InResponseTo Validation](https://www.better-auth.com/docs/plugins/sso.html#authnrequest--inresponseto-validation)

You can enable InResponseTo validation for SP-initiated SAML flows. When enabled, the plugin tracks AuthnRequest IDs and validates the `InResponseTo` attribute in SAML responses. This prevents:

* **Unsolicited responses**: Responses not triggered by a legitimate login request
* **Replay attacks**: Reusing old SAML responses
* **Cross-provider injection**: Responses meant for a different provider

This feature is **opt-in** to ensure backward compatibility. Enable it explicitly for enhanced security.

#### [Enabling Validation (Single Instance)](https://www.better-auth.com/docs/plugins/sso.html#enabling-validation-single-instance)

For single-instance deployments, enable validation with the built-in in-memory store:

auth.ts

```
import { betterAuth } from "better-auth";
import { sso } from "@better-auth/sso";

const auth = betterAuth({
    plugins: [
        sso({
            saml: {
                // Enable InResponseTo validation
                enableInResponseToValidation: true,
                // Optionally reject IdP-initiated SSO (stricter security)
                allowIdpInitiated: false,
                // Custom TTL for AuthnRequest validity (default: 5 minutes)
                requestTTL: 10 * 60 * 1000, // 10 minutes
            },
        }),
    ],
});
```

#### [Options](https://www.better-auth.com/docs/plugins/sso.html#options)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enableInResponseToValidation` | `boolean` | `false` | Enable InResponseTo validation for SP-initiated flows. |
| `allowIdpInitiated` | `boolean` | `true` | Allow IdP-initiated SSO (responses without InResponseTo). Set to `false` for stricter security. Only applies when validation is enabled. |
| `requestTTL` | `number` | `300000` (5 min) | Time-to-live for AuthnRequest records in milliseconds. Requests older than this will be rejected. |

#### [Error Handling](https://www.better-auth.com/docs/plugins/sso.html#error-handling)

When InResponseTo validation fails, users are redirected with an error query parameter:

* `?error=invalid_saml_response&error_description=Unknown+or+expired+request+ID` — The request ID was not found or has expired
* `?error=invalid_saml_response&error_description=Provider+mismatch` — The response was meant for a different provider
* `?error=unsolicited_response&error_description=IdP-initiated+SSO+not+allowed` — IdP-initiated SSO is disabled

### [Assertion Replay Protection](https://www.better-auth.com/docs/plugins/sso.html#assertion-replay-protection)

The SSO plugin includes assertion replay protection to prevent attackers from capturing and resubmitting valid SAML responses. Each SAML Assertion ID is tracked and rejected if reused.

Replay protection is **always enabled**. This is a critical security feature that prevents attackers from reusing intercepted SAML responses.

#### [How It Works](https://www.better-auth.com/docs/plugins/sso.html#how-it-works)

1. When a SAML response is received, the Assertion ID is extracted from the XML
2. The system checks if this Assertion ID has been seen before
3. If it's a new assertion, it's stored in the database until its `NotOnOrAfter` expiration
4. If it's a duplicate (replay attack), the request is rejected

**Both SAML endpoints are protected:**

* `/sso/saml2/callback/:providerId`
* `/sso/saml2/sp/acs/:providerId`

Replay protection uses the database verification table, so it works correctly in multi-instance deployments without additional configuration.

#### [Error Handling](https://www.better-auth.com/docs/plugins/sso.html#error-handling-1)

When a replay attack is detected, users are redirected with an error:

* `?error=replay_detected&error_description=SAML+assertion+has+already+been+used` — The assertion ID was already used

### [Timestamp Validation](https://www.better-auth.com/docs/plugins/sso.html#timestamp-validation)

The SSO plugin validates SAML assertion timestamps (`NotBefore` and `NotOnOrAfter`) to prevent acceptance of expired or future-dated assertions. This validation includes a configurable clock skew tolerance to account for time differences between servers.

#### [SAML Specification Background](https://www.better-auth.com/docs/plugins/sso.html#saml-specification-background)

According to the **SAML 2.0 Core specification**, `NotBefore` and `NotOnOrAfter` attributes are **optional**. However, the widely-adopted **SAML2Int** (SAML V2.0 Implementation Profile for Federation Interoperability) specification **requires** these timestamps:

> "The Identity Provider MUST include a `<saml:Conditions>` element. Conditions restricting the period when the assertion is valid, the `@NotBefore` and `@NotOnOrAfter` MUST be included."

Better Auth provides flexibility to support both:

* **Default behavior**: Accepts assertions without timestamps (SAML 2.0 Core compliant) but logs a warning
* **Strict mode**: Rejects assertions without timestamps (SAML2Int compliant)

#### [How It Works](https://www.better-auth.com/docs/plugins/sso.html#how-it-works-1)

For each SAML assertion:

* **NotBefore**: The assertion is rejected if current time is before `NotBefore - clockSkew`
* **NotOnOrAfter**: The assertion is rejected if current time is after `NotOnOrAfter + clockSkew`

#### [Configuration](https://www.better-auth.com/docs/plugins/sso.html#configuration)

auth.ts

```
import { betterAuth } from "better-auth";
import { sso } from "@better-auth/sso";

const auth = betterAuth({
    plugins: [
        sso({
            saml: {
                // Clock skew tolerance (default: 5 minutes)
                clockSkew: 5 * 60 * 1000,
                // Require timestamps in assertions (default: false)
                requireTimestamps: false,
            },
        }),
    ],
});
```

#### [Options](https://www.better-auth.com/docs/plugins/sso.html#options-1)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `clockSkew` | `number` | `300000` (5 min) | Clock skew tolerance in milliseconds. Allows for time differences between IdP and SP servers. |
| `requireTimestamps` | `boolean` | `false` | When `true`, assertions without `NotBefore`/`NotOnOrAfter` conditions are rejected. When `false`, they are accepted but a warning is logged. |

#### [When to Enable `requireTimestamps`](https://www.better-auth.com/docs/plugins/sso.html#when-to-enable-requiretimestamps)

**Recommendation**: Enable `requireTimestamps: true` for enterprise and high-security deployments.

Enable `requireTimestamps: true` when:

* Your IdP follows **SAML2Int** (most enterprise IdPs like Okta, Azure AD, OneLogin)
* You need **SOC 2**, **ISO 27001**, or similar compliance
* You want to prevent acceptance of malformed or test assertions
* You're in a **production environment** with proper IdP configuration

Keep `requireTimestamps: false` (default) when:

* Integrating with **legacy IdPs** that may not include timestamps
* During **development/testing** with mock IdPs
* You need **maximum compatibility** with various IdP implementations

#### [Stricter Security (Enterprise/Production)](https://www.better-auth.com/docs/plugins/sso.html#stricter-security-enterpriseproduction)

For enterprise environments following SAML2Int, configure stricter validation:

auth.ts

```
sso({
    saml: {
        clockSkew: 60 * 1000,      // 1 minute tolerance
        requireTimestamps: true,   // Reject assertions without timestamps (SAML2Int)
    },
})
```

#### [Error Messages](https://www.better-auth.com/docs/plugins/sso.html#error-messages)

* **"SAML assertion is not yet valid"** — Current time is before the `NotBefore` timestamp (minus clock skew)
* **"SAML assertion has expired"** — Current time is after the `NotOnOrAfter` timestamp (plus clock skew)
* **"SAML assertion missing required timestamp conditions"** — Assertion has no timestamps and `requireTimestamps` is enabled

### [Algorithm Validation](https://www.better-auth.com/docs/plugins/sso.html#algorithm-validation)

Better Auth validates SAML cryptographic algorithms and warns about deprecated ones (SHA-1, RSA 1.5, 3DES) by default.

auth.ts

```
sso({
    saml: {
        algorithms: {
            // "warn" (default) | "reject" | "allow"
            onDeprecated: "warn",
        },
    },
})
```

| Value | Behavior |
| --- | --- |
| `"warn"` | Log warning, allow authentication (default) |
| `"reject"` | Throw error, block authentication |
| `"allow"` | Silent, no validation |

For strict security (production):

auth.ts

```
sso({
    saml: {
        algorithms: {
            onDeprecated: "reject",
        },
    },
})
```

## [Domain verification](https://www.better-auth.com/docs/plugins/sso.html#domain-verification)

Domain verification allows your application to automatically trust a new SSO provider
by automatically validating ownership via the associated domain.

When a provider's domain is verified, it is also trusted for **automatic account linking**. This means that if a user signs in with an SSO provider (OIDC or SAML) and an existing account with the same email exists, the accounts will be linked automatically — as long as the user's email domain matches the provider's verified domain.

clientserver

auth-client.ts

```
const authClient = createAuthClient({
    plugins: [
        ssoClient({
            domainVerification: {
                enabled: true
            }
        })
    ]
})
```

auth.ts

```
const auth = betterAuth({
    plugins: [
        sso({
            domainVerification: {
                enabled: true
            }
        })
    ]
});
```

Once enabled, make sure you migrate the database schema (again).

migrategenerate

```
npx @better-auth/cli migrate
```

```
npx @better-auth/cli generate
```

See the [Schema](https://www.better-auth.com/docs/plugins/sso.html#schema-for-domain-verification) section to add the fields manually.

### [Verify your domain](https://www.better-auth.com/docs/plugins/sso.html#verify-your-domain)

When domain verification is enabled, every new SSO provider will be untrusted at first.
This means that new sign-ups or sign-ins will be allowed until the domain ownership has been verified.

To verify your ownership over a domain, follow these steps:

#### [Acquire verification token](https://www.better-auth.com/docs/plugins/sso.html#acquire-verification-token)

When an SSO provider is registered, a **verification token** will be issued to the provider (it will be returned as part of the response).
You can use this token to prove ownership over the domain.

#### [Create `TXT` DNS record](https://www.better-auth.com/docs/plugins/sso.html#create-txt-dns-record)

To do this, you'll need to add a `TXT` record to your domain's DNS settings:

* **Host:** `better-auth-token-{your-provider-id}` (**Note:** This assumes the default token prefix, which can be customized through the `domainVerification.tokenPrefix` option)
* **Value:** The verification token you were given.

**Save the record and wait for it to propagate.** This can take up to 48 hours, but it's usually much faster.

#### [Submit a validation request](https://www.better-auth.com/docs/plugins/sso.html#submit-a-validation-request)

**Once the DNS record has propagated**, you can submit a validation request (See below)

### [Domain validation request](https://www.better-auth.com/docs/plugins/sso.html#domain-validation-request)

Once you have configured your domain, you can use your `auth` instance to submit a validation request.
This request will either result in a rejection (could not prove your ownership over the domain)
or if the verification is successful, your SSO provider domain will be marked as verified.

ClientServer

POST

/sso/verify-domain

```
const { data, error } = await authClient.sso.verifyDomain({    providerId: "acme-corp", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider id | `string` |

POST

/sso/verify-domain

```
const data = await auth.api.verifyDomain({    body: {        providerId: "acme-corp", // required    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider id | `string` |

### [Creating a new verification token](https://www.better-auth.com/docs/plugins/sso.html#creating-a-new-verification-token)

Every domain verification token will have a default expiry of 1 week since the moment it was issued
or the moment when the SSO provider was registered.

After that time, the token will expire and cannot longer be used. When that happens,
you can create a new verification token:

ClientServer

POST

/sso/request-domain-verification

```
const { data, error } = await authClient.sso.requestDomainVerification({    providerId: "acme-corp", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider id | `string` |

POST

/sso/request-domain-verification

```
const data = await auth.api.requestDomainVerification({    body: {        providerId: "acme-corp", // required    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider id | `string` |

### [SAML Endpoints](https://www.better-auth.com/docs/plugins/sso.html#saml-endpoints)

The plugin automatically creates the following SAML endpoints:

* **SP Metadata**: `/api/auth/sso/saml2/sp/metadata?providerId={providerId}`
* **SAML Callback**: `/api/auth/sso/saml2/callback/{providerId}`

## [Schema](https://www.better-auth.com/docs/plugins/sso.html#schema)

The plugin requires additional fields in the `ssoProvider` table to store the provider's configuration.

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | A database identifier |
| issuer | string | - | The issuer identifier |
| domain | string | - | The domain of the provider |
| oidcConfig | string | - | The OIDC configuration (JSON string) |
| samlConfig | string | - | The SAML configuration (JSON string) |
| userId | string | - | The user ID |
| providerId | string | - | The provider ID. Used to identify a provider and to generate a redirect URL. |
| organizationId | string | - | The organization Id. If provider is linked to an organization. |

### [If you have enabled domain verification:](https://www.better-auth.com/docs/plugins/sso.html#if-you-have-enabled-domain-verification)

The `ssoProvider` schema is extended as follows:

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| domainVerified | boolean | - | A flag indicating whether the provider domain has been verified. |

For a detailed guide on setting up SAML SSO with examples for Okta and testing with DummyIDP, see our [SAML SSO with Okta](https://www.better-auth.com/docs/guides/saml-sso-with-okta.html).

## [Options](https://www.better-auth.com/docs/plugins/sso.html#options-2)

### [Server](https://www.better-auth.com/docs/plugins/sso.html#server)

**provisionUser**: A custom function to provision a user when they sign in with an SSO provider.

**organizationProvisioning**: Options for provisioning users to an organization.

**defaultOverrideUserInfo**: Override user info with the provider info by default.

**disableImplicitSignUp**: Disable implicit sign up for new users.

**trustEmailVerified** — Trusts the `email_verified` flag from the provider. ⚠️ Use this with caution — it can lead to account takeover if misused. Only enable this if you know what you are doing or in a controlled environment.

If you want to allow account linking for specific trusted providers, enable the `accountLinking` option in your auth config and specify those providers in the `trustedProviders` list.

Prop

Type

`provisionUser?`function

`organizationProvisioning?`object

`defaultOverrideUserInfo?`boolean

`disableImplicitSignUp?`boolean

`providersLimit?`number | function

`domainVerification?`object

`defaultSSO?`array

`saml?`object

`modelName?`string

`fields?`

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/sso.mdx)

[Previous Page

OIDC Provider](https://www.better-auth.com/docs/plugins/oidc-provider.html)[Next Page

SCIM](https://www.better-auth.com/docs/plugins/scim.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/sso.html#installation)[Install the plugin](https://www.better-auth.com/docs/plugins/sso.html#install-the-plugin)[Add Plugin to the server](https://www.better-auth.com/docs/plugins/sso.html#add-plugin-to-the-server)[Migrate the database](https://www.better-auth.com/docs/plugins/sso.html#migrate-the-database)[Add the client plugin](https://www.better-auth.com/docs/plugins/sso.html#add-the-client-plugin)[Usage](https://www.better-auth.com/docs/plugins/sso.html#usage)[Register an OIDC Provider](https://www.better-auth.com/docs/plugins/sso.html#register-an-oidc-provider)[Example](https://www.better-auth.com/docs/plugins/sso.html#example)[OIDC Discovery](https://www.better-auth.com/docs/plugins/sso.html#oidc-discovery)[Fields Automatically Discovered](https://www.better-auth.com/docs/plugins/sso.html#fields-automatically-discovered)[Trusted origins](https://www.better-auth.com/docs/plugins/sso.html#trusted-origins)[Why Discovery Can Fail](https://www.better-auth.com/docs/plugins/sso.html#why-discovery-can-fail)[Discovery Errors](https://www.better-auth.com/docs/plugins/sso.html#discovery-errors)[Summary](https://www.better-auth.com/docs/plugins/sso.html#summary)[Register a SAML Provider](https://www.better-auth.com/docs/plugins/sso.html#register-a-saml-provider)[Get Service Provider Metadata](https://www.better-auth.com/docs/plugins/sso.html#get-service-provider-metadata)[Sign In with SSO](https://www.better-auth.com/docs/plugins/sso.html#sign-in-with-sso)[Full method](https://www.better-auth.com/docs/plugins/sso.html#full-method)[Provisioning](https://www.better-auth.com/docs/plugins/sso.html#provisioning)[User Provisioning](https://www.better-auth.com/docs/plugins/sso.html#user-provisioning)[Organization Provisioning](https://www.better-auth.com/docs/plugins/sso.html#organization-provisioning)[Basic Organization Provisioning](https://www.better-auth.com/docs/plugins/sso.html#basic-organization-provisioning)[Advanced Organization Provisioning with Custom Roles](https://www.better-auth.com/docs/plugins/sso.html#advanced-organization-provisioning-with-custom-roles)[Linking SSO Providers to Organizations](https://www.better-auth.com/docs/plugins/sso.html#linking-sso-providers-to-organizations)[Multiple Organizations Example](https://www.better-auth.com/docs/plugins/sso.html#multiple-organizations-example)[Organization Provisioning Flow](https://www.better-auth.com/docs/plugins/sso.html#organization-provisioning-flow)[Provisioning Best Practices](https://www.better-auth.com/docs/plugins/sso.html#provisioning-best-practices)[1. Idempotent Operations](https://www.better-auth.com/docs/plugins/sso.html#1-idempotent-operations)[2. Error Handling](https://www.better-auth.com/docs/plugins/sso.html#2-error-handling)[3. Conditional Provisioning](https://www.better-auth.com/docs/plugins/sso.html#3-conditional-provisioning)[SAML Configuration](https://www.better-auth.com/docs/plugins/sso.html#saml-configuration)[Default SSO Provider](https://www.better-auth.com/docs/plugins/sso.html#default-sso-provider)[Service Provider Configuration](https://www.better-auth.com/docs/plugins/sso.html#service-provider-configuration)[Identity Provider Configuration](https://www.better-auth.com/docs/plugins/sso.html#identity-provider-configuration)[SAML Attribute Mapping](https://www.better-auth.com/docs/plugins/sso.html#saml-attribute-mapping)[SAML Security](https://www.better-auth.com/docs/plugins/sso.html#saml-security)[AuthnRequest / InResponseTo Validation](https://www.better-auth.com/docs/plugins/sso.html#authnrequest--inresponseto-validation)[Enabling Validation (Single Instance)](https://www.better-auth.com/docs/plugins/sso.html#enabling-validation-single-instance)[Options](https://www.better-auth.com/docs/plugins/sso.html#options)[Error Handling](https://www.better-auth.com/docs/plugins/sso.html#error-handling)[Assertion Replay Protection](https://www.better-auth.com/docs/plugins/sso.html#assertion-replay-protection)[How It Works](https://www.better-auth.com/docs/plugins/sso.html#how-it-works)[Error Handling](https://www.better-auth.com/docs/plugins/sso.html#error-handling-1)[Timestamp Validation](https://www.better-auth.com/docs/plugins/sso.html#timestamp-validation)[SAML Specification Background](https://www.better-auth.com/docs/plugins/sso.html#saml-specification-background)[How It Works](https://www.better-auth.com/docs/plugins/sso.html#how-it-works-1)[Configuration](https://www.better-auth.com/docs/plugins/sso.html#configuration)[Options](https://www.better-auth.com/docs/plugins/sso.html#options-1)[When to Enable `requireTimestamps`](https://www.better-auth.com/docs/plugins/sso.html#when-to-enable-requiretimestamps)[Stricter Security (Enterprise/Production)](https://www.better-auth.com/docs/plugins/sso.html#stricter-security-enterpriseproduction)[Error Messages](https://www.better-auth.com/docs/plugins/sso.html#error-messages)[Algorithm Validation](https://www.better-auth.com/docs/plugins/sso.html#algorithm-validation)[Domain verification](https://www.better-auth.com/docs/plugins/sso.html#domain-verification)[Verify your domain](https://www.better-auth.com/docs/plugins/sso.html#verify-your-domain)[Acquire verification token](https://www.better-auth.com/docs/plugins/sso.html#acquire-verification-token)[Create `TXT` DNS record](https://www.better-auth.com/docs/plugins/sso.html#create-txt-dns-record)[Submit a validation request](https://www.better-auth.com/docs/plugins/sso.html#submit-a-validation-request)[Domain validation request](https://www.better-auth.com/docs/plugins/sso.html#domain-validation-request)[Creating a new verification token](https://www.better-auth.com/docs/plugins/sso.html#creating-a-new-verification-token)[SAML Endpoints](https://www.better-auth.com/docs/plugins/sso.html#saml-endpoints)[Schema](https://www.better-auth.com/docs/plugins/sso.html#schema)[If you have enabled domain verification:](https://www.better-auth.com/docs/plugins/sso.html#if-you-have-enabled-domain-verification)[Options](https://www.better-auth.com/docs/plugins/sso.html#options-2)[Server](https://www.better-auth.com/docs/plugins/sso.html#server)

Ask AI
