---
title: "JWT | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/jwt"
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

# JWT

Copy MarkdownOpen in

The JWT plugin provides endpoints to retrieve a JWT token and a JWKS endpoint to verify the token.

This plugin is not meant as a replacement for the session. It's meant to be used for services that require JWT tokens. If you're looking to use JWT tokens for authentication, check out the [Bearer Plugin](https://www.better-auth.com/docs/plugins/bearer.html).

## [Installation](https://www.better-auth.com/docs/plugins/jwt.html#installation)

### [Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/jwt.html#add-the-plugin-to-your-auth-config)

auth.ts

```
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        jwt(),
    ]
})
```

### [Migrate the database](https://www.better-auth.com/docs/plugins/jwt.html#migrate-the-database)

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

See the [Schema](https://www.better-auth.com/docs/plugins/jwt.html#schema) section to add the fields manually.

## [Usage](https://www.better-auth.com/docs/plugins/jwt.html#usage)

Once you've installed the plugin, you can start using the JWT & JWKS plugin to get the token and the JWKS through their respective endpoints.

## [JWT](https://www.better-auth.com/docs/plugins/jwt.html#jwt)

### [Retrieve the token](https://www.better-auth.com/docs/plugins/jwt.html#retrieve-the-token)

There are multiple ways to retrieve JWT tokens:

1. **Using the client plugin (recommended)**

Add the `jwtClient` plugin to your auth client configuration:

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [
    jwtClient()
  ]
})
```

Then use the client to get JWT tokens:

```
const { data, error } = await authClient.token()
if (error) {
  // handle error
}
if (data) {
  const jwtToken = data.token
  // Use this token for authenticated requests to external services
}
```

This is the recommended approach for client applications that need JWT tokens for external API authentication.

2. **Using your session token**

To get the token, call the `/token` endpoint. This will return the following:

```
  {
    "token": "ey..."
  }
```

Make sure to include the token in the `Authorization` header of your requests if the `bearer` plugin is added in your auth configuration.

```
await fetch("/api/auth/token", {
  headers: {
    "Authorization": `Bearer ${token}`
  },
})
```

3. **From `set-auth-jwt` header**

When you call `getSession` method, a JWT is returned in the `set-auth-jwt` header, which you can use to send to your services directly.

```
await authClient.getSession({
  fetchOptions: {
    onSuccess: (ctx)=>{
      const jwt = ctx.response.headers.get("set-auth-jwt")
    }
  }
})
```

### [Verifying the token](https://www.better-auth.com/docs/plugins/jwt.html#verifying-the-token)

The token can be verified in your own service, without the need for an additional verify call or database check.
For this JWKS is used. The public key can be fetched from the `/api/auth/jwks` endpoint.

Since this key is not subject to frequent changes, it can be cached indefinitely.
The key ID (`kid`) that was used to sign a JWT is included in the header of the token.
In case a JWT with a different `kid` is received, it is recommended to fetch the JWKS again.

```
  {
    "keys": [
        {
            "crv": "Ed25519",
            "x": "bDHiLTt7u-VIU7rfmcltcFhaHKLVvWFy-_csKZARUEU",
            "kty": "OKP",
            "kid": "c5c7995d-0037-4553-8aee-b5b620b89b23"
        }
    ]
  }
```

### [OAuth Provider Mode](https://www.better-auth.com/docs/plugins/jwt.html#oauth-provider-mode)

If you are making your system oAuth compliant (such as when utilizing the OIDC or MCP plugins), you **MUST** disable the `/token` endpoint (oAuth equivalent `/oauth2/token`) and disable setting the jwt header (oAuth equivalent `/oauth2/userinfo`).

auth.ts

```
betterAuth({
  disabledPaths: [
    "/token",
  ],
  plugins: [jwt({
    disableSettingJwtHeader: true,
  })]
})
```

#### [Example using jose with remote JWKS](https://www.better-auth.com/docs/plugins/jwt.html#example-using-jose-with-remote-jwks)

```
import { jwtVerify, createRemoteJWKSet } from 'jose'

async function validateToken(token: string) {
  try {
    const JWKS = createRemoteJWKSet(
      new URL('http://localhost:3000/api/auth/jwks')
    )
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'http://localhost:3000', // Should match your JWT issuer, which is the BASE_URL
      audience: 'http://localhost:3000', // Should match your JWT audience, which is the BASE_URL by default
    })
    return payload
  } catch (error) {
    console.error('Token validation failed:', error)
    throw error
  }
}

// Usage example
const token = 'your.jwt.token' // this is the token you get from the /api/auth/token endpoint
const payload = await validateToken(token)
```

#### [Example with local JWKS](https://www.better-auth.com/docs/plugins/jwt.html#example-with-local-jwks)

```
import { jwtVerify, createLocalJWKSet } from 'jose'

async function validateToken(token: string) {
  try {
    /**
     * This is the JWKS that you get from the /api/auth/
     * jwks endpoint
     */
    const storedJWKS = {
      keys: [{
        //...
      }]
    };
    const JWKS = createLocalJWKSet({
      keys: storedJWKS.data?.keys!,
    })
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'http://localhost:3000', // Should match your JWT issuer, which is the BASE_URL
      audience: 'http://localhost:3000', // Should match your JWT audience, which is the BASE_URL by default
    })
    return payload
  } catch (error) {
    console.error('Token validation failed:', error)
    throw error
  }
}

// Usage example
const token = 'your.jwt.token' // this is the token you get from the /api/auth/token endpoint
const payload = await validateToken(token)
```

### [Remote JWKS Url](https://www.better-auth.com/docs/plugins/jwt.html#remote-jwks-url)

Disables the `/jwks` endpoint and uses this endpoint in any discovery such as OIDC.

Useful if your JWKS are not managed at `/jwks` or if your jwks are signed with a certificate and placed on your CDN.

NOTE: you **MUST** specify which asymmetric algorithm is used for signing.

auth.ts

```
jwt({
  jwks: {
    remoteUrl: "https://example.com/.well-known/jwks.json",
    keyPairConfig: {
      alg: 'ES256',
    },
  }
})
```

### [Custom JWKS Path](https://www.better-auth.com/docs/plugins/jwt.html#custom-jwks-path)

By default, the JWKS endpoint is available at `/jwks`. You can customize this path using the `jwksPath` option.

This is useful when you need to:

* Follow OAuth 2.0/OIDC conventions (e.g., `/.well-known/jwks.json`)
* Match existing API conventions in your application
* Avoid path conflicts with other endpoints

**Server Configuration:**

auth.ts

```
jwt({
  jwks: {
    jwksPath: "/.well-known/jwks.json"
  }
})
```

**Client Configuration:**

When using a custom `jwksPath` on the server, you **MUST** configure the client with the same path:

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [
    jwtClient({
      jwks: {
        jwksPath: "/.well-known/jwks.json" // Must match server configuration
      }
    })
  ]
})
```

Then you can use the `jwks()` method as usual:

```
const { data, error } = await authClient.jwks()
if (data) {
  // Use data.keys to verify JWT tokens
}
```

The `jwksPath` configured on the client **MUST** match the server configuration. If they don't match, the client will not be able to fetch the JWKS.

### [Custom Signing](https://www.better-auth.com/docs/plugins/jwt.html#custom-signing)

This is an advanced feature. Configuration outside of this plugin **MUST** be provided.

Implementers:

* `remoteUrl` must be defined if using the `sign` function. This shall store all active keys, not just the current one.
* If using localized approach, ensure server uses the latest private key when rotated. Depending on deployment, the server may need to be restarted.
* When using remote approach, verify the payload is unchanged after transit. Use integrity validation like CRC32 or SHA256 checks if available.

#### [Localized Signing](https://www.better-auth.com/docs/plugins/jwt.html#localized-signing)

auth.ts

```
jwt({
  jwks: {
    remoteUrl: "https://example.com/.well-known/jwks.json",
    keyPairConfig: {
      alg: 'EdDSA',
    },
  },
  jwt: {
    sign: async (jwtPayload: JWTPayload) => {
      // this is pseudocode
      return await new SignJWT(jwtPayload)
        .setProtectedHeader({
          alg: "EdDSA",
          kid: process.env.currentKid,
          typ: "JWT",
        })
        .sign(process.env.clientPrivateKey);
    },
  },
})
```

#### [Remote Signing](https://www.better-auth.com/docs/plugins/jwt.html#remote-signing)

Useful if you are using a remote Key Management Service such as [Google KMS](https://cloud.google.com/kms/docs/encrypt-decrypt-rsa#kms-encrypt-asymmetric-nodejs), [Amazon KMS](https://docs.aws.amazon.com/kms/latest/APIReference/API_Sign.html), or [Azure Key Vault](https://learn.microsoft.com/en-us/rest/api/keyvault/keys/sign/sign?view=rest-keyvault-keys-7.4&tabs=HTTP).

auth.ts

```
jwt({
  jwks: {
    remoteUrl: "https://example.com/.well-known/jwks.json",
    keyPairConfig: {
      alg: 'ES256',
    },
  },
  jwt: {
    sign: async (jwtPayload: JWTPayload) => {
      // this is pseudocode
      const headers = JSON.stringify({ kid: '123', alg: 'ES256', typ: 'JWT' })
      const payload = JSON.stringify(jwtPayload)
      const encodedHeaders = Buffer.from(headers).toString('base64url')
      const encodedPayload = Buffer.from(payload).toString('base64url')
      const hash = createHash('sha256')
      const data = `${encodedHeaders}.${encodedPayload}`
      hash.update(Buffer.from(data))
      const digest = hash.digest()
      const sig = await remoteSign(digest)
      // integrityCheck(sig)
      const jwt = `${data}.${sig}`
      // verifyJwt(jwt)
      return jwt
    },
  },
})
```

## [Schema](https://www.better-auth.com/docs/plugins/jwt.html#schema)

The JWT plugin adds the following tables to the database:

### [JWKS](https://www.better-auth.com/docs/plugins/jwt.html#jwks)

Table Name: `jwks`

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | Unique identifier for each web key |
| publicKey | string | - | The public part of the web key |
| privateKey | string | - | The private part of the web key |
| createdAt | Date | - | Timestamp of when the web key was created |
| expiresAt | Date | ? | Timestamp of when the web key expires |

You can customize the table name and fields for the `jwks` table. See the [Database concept documentation](https://www.better-auth.com/docs/concepts/database.html#custom-table-names) for more information on how to customize plugin schema.

## [Options](https://www.better-auth.com/docs/plugins/jwt.html#options)

### [Algorithm of the Key Pair](https://www.better-auth.com/docs/plugins/jwt.html#algorithm-of-the-key-pair)

The algorithm used for the generation of the key pair. The default is **EdDSA** with the **Ed25519** curve. Below are the available options:

auth.ts

```
jwt({
  jwks: {
    keyPairConfig: {
      alg: "EdDSA",
      crv: "Ed25519"
    }
  }
})
```

#### [EdDSA](https://www.better-auth.com/docs/plugins/jwt.html#eddsa)

* **Default Curve**: `Ed25519`
* **Optional Property**: `crv`
  + Available options: `Ed25519`, `Ed448`
  + Default: `Ed25519`

#### [ES256](https://www.better-auth.com/docs/plugins/jwt.html#es256)

* No additional properties

#### [RSA256](https://www.better-auth.com/docs/plugins/jwt.html#rsa256)

* **Optional Property**: `modulusLength`
  + Expects a number
  + Default: `2048`

#### [PS256](https://www.better-auth.com/docs/plugins/jwt.html#ps256)

* **Optional Property**: `modulusLength`
  + Expects a number
  + Default: `2048`

#### [ECDH-ES](https://www.better-auth.com/docs/plugins/jwt.html#ecdh-es)

* **Optional Property**: `crv`
  + Available options: `P-256`, `P-384`, `P-521`
  + Default: `P-256`

#### [ES512](https://www.better-auth.com/docs/plugins/jwt.html#es512)

* No additional properties

### [Disable private key encryption](https://www.better-auth.com/docs/plugins/jwt.html#disable-private-key-encryption)

By default, the private key is encrypted using AES256 GCM. You can disable this by setting the `disablePrivateKeyEncryption` option to `true`.

For security reasons, it's recommended to keep the private key encrypted.

auth.ts

```
jwt({
  jwks: {
    disablePrivateKeyEncryption: true
  }
})
```

### [Key Rotation](https://www.better-auth.com/docs/plugins/jwt.html#key-rotation)

You can enable key rotation by setting the `rotationInterval` option. This will automatically rotate the key pair at the specified interval.

The default value is `undefined` (disabled).

auth.ts

```
jwt({
  jwks: {
    rotationInterval: 60 * 60 * 24 * 30, // 30 days
    gracePeriod: 60 * 60 * 24 * 30 // 30 days
  }
})
```

* `rotationInterval`: The interval in seconds to rotate the key pair.
* `gracePeriod`: The period in seconds to keep the old key pair valid after rotation. This is useful to allow clients to verify tokens signed by the old key pair. The default value is 30 days.

### [Modify JWT payload](https://www.better-auth.com/docs/plugins/jwt.html#modify-jwt-payload)

By default the entire user object is added to the JWT payload. You can modify the payload by providing a function to the `definePayload` option.

auth.ts

```
jwt({
  jwt: {
    definePayload: ({user}) => {
      return {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }
  }
})
```

### [Modify Issuer, Audience, Subject or Expiration time](https://www.better-auth.com/docs/plugins/jwt.html#modify-issuer-audience-subject-or-expiration-time)

If none is given, the `BASE_URL` is used as the issuer and the audience is set to the `BASE_URL`. The expiration time is set to 15 minutes.

auth.ts

```
jwt({
  jwt: {
    issuer: "https://example.com",
    audience: "https://example.com",
    expirationTime: "1h",
    getSubject: (session) => {
      // by default the subject is the user id
      return session.user.email
    }
  }
})
```

### [Custom Adapter](https://www.better-auth.com/docs/plugins/jwt.html#custom-adapter)

By default, the JWT plugin stores and retrieves JWKS from your database. You can provide a custom adapter to override this behavior, allowing you to store JWKS in alternative locations such as Redis, external services, or in-memory storage.

auth.ts

```
jwt({
  adapter: {
    getJwks: async (ctx) => {
      // Custom implementation to get all JWKS
      // This overrides the default database query
      return await yourCustomStorage.getAllKeys()
    },
    createJwk: async (ctx, webKey) => {
      // Custom implementation to create a new key
      // This overrides the default database insert
      return await yourCustomStorage.createKey(webKey)
    }
  }
})
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/jwt.mdx)

[Previous Page

Open API](https://www.better-auth.com/docs/plugins/open-api.html)[Next Page

3rd party](https://www.better-auth.com/docs/plugins/jwt.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/jwt.html#installation)[Add the plugin to your **auth** config](https://www.better-auth.com/docs/plugins/jwt.html#add-the-plugin-to-your-auth-config)[Migrate the database](https://www.better-auth.com/docs/plugins/jwt.html#migrate-the-database)[Usage](https://www.better-auth.com/docs/plugins/jwt.html#usage)[JWT](https://www.better-auth.com/docs/plugins/jwt.html#jwt)[Retrieve the token](https://www.better-auth.com/docs/plugins/jwt.html#retrieve-the-token)[Verifying the token](https://www.better-auth.com/docs/plugins/jwt.html#verifying-the-token)[OAuth Provider Mode](https://www.better-auth.com/docs/plugins/jwt.html#oauth-provider-mode)[Example using jose with remote JWKS](https://www.better-auth.com/docs/plugins/jwt.html#example-using-jose-with-remote-jwks)[Example with local JWKS](https://www.better-auth.com/docs/plugins/jwt.html#example-with-local-jwks)[Remote JWKS Url](https://www.better-auth.com/docs/plugins/jwt.html#remote-jwks-url)[Custom JWKS Path](https://www.better-auth.com/docs/plugins/jwt.html#custom-jwks-path)[Custom Signing](https://www.better-auth.com/docs/plugins/jwt.html#custom-signing)[Localized Signing](https://www.better-auth.com/docs/plugins/jwt.html#localized-signing)[Remote Signing](https://www.better-auth.com/docs/plugins/jwt.html#remote-signing)[Schema](https://www.better-auth.com/docs/plugins/jwt.html#schema)[JWKS](https://www.better-auth.com/docs/plugins/jwt.html#jwks)[Options](https://www.better-auth.com/docs/plugins/jwt.html#options)[Algorithm of the Key Pair](https://www.better-auth.com/docs/plugins/jwt.html#algorithm-of-the-key-pair)[EdDSA](https://www.better-auth.com/docs/plugins/jwt.html#eddsa)[ES256](https://www.better-auth.com/docs/plugins/jwt.html#es256)[RSA256](https://www.better-auth.com/docs/plugins/jwt.html#rsa256)[PS256](https://www.better-auth.com/docs/plugins/jwt.html#ps256)[ECDH-ES](https://www.better-auth.com/docs/plugins/jwt.html#ecdh-es)[ES512](https://www.better-auth.com/docs/plugins/jwt.html#es512)[Disable private key encryption](https://www.better-auth.com/docs/plugins/jwt.html#disable-private-key-encryption)[Key Rotation](https://www.better-auth.com/docs/plugins/jwt.html#key-rotation)[Modify JWT payload](https://www.better-auth.com/docs/plugins/jwt.html#modify-jwt-payload)[Modify Issuer, Audience, Subject or Expiration time](https://www.better-auth.com/docs/plugins/jwt.html#modify-issuer-audience-subject-or-expiration-time)[Custom Adapter](https://www.better-auth.com/docs/plugins/jwt.html#custom-adapter)

Ask AI
