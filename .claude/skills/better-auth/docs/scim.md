---
title: "System for Cross-domain Identity Management (SCIM) | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/scim"
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

# System for Cross-domain Identity Management (SCIM)

Copy MarkdownOpen in

System for Cross-domain Identity Management ([SCIM](https://simplecloud.info/#Specification)) makes managing identities in multi-domain scenarios easier to support via a standardized protocol.
This plugin exposes a [SCIM](https://simplecloud.info/#Specification) server that allows third party identity providers to sync identities to your service.

## [Installation](https://www.better-auth.com/docs/plugins/scim.html#installation)

### [Install the plugin](https://www.better-auth.com/docs/plugins/scim.html#install-the-plugin)

```
npm install @better-auth/scim
```

### [Add Plugin to the server](https://www.better-auth.com/docs/plugins/scim.html#add-plugin-to-the-server)

auth.ts

```
import { betterAuth } from "better-auth"
import { scim } from "@better-auth/scim";

const auth = betterAuth({
    plugins: [
        scim()
    ]
})
```

### [Enable HTTP methods](https://www.better-auth.com/docs/plugins/scim.html#enable-http-methods)

SCIM requires the `POST`, `PUT`, `PATCH` and `DELETE` HTTP methods to be supported by your server.
For most frameworks, this will work out of the box, but some frameworks may require additional configuration:

Next.jsSolid Start

api/auth/[...all]/route.ts

```
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET, PUT, PATCH, DELETE } = toNextJsHandler(auth);
```

routes/api/auth/\*auth.ts

```
import { auth } from "~/lib/auth";
import { toSolidStartHandler } from "better-auth/solid-start";

export const { GET, POST, PUT, PATCH, DELETE } = toSolidStartHandler(auth);
```

### [Migrate the database](https://www.better-auth.com/docs/plugins/scim.html#migrate-the-database)

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

See the [Schema](https://www.better-auth.com/docs/plugins/scim.html#schema) section to add the fields manually.

## [Usage](https://www.better-auth.com/docs/plugins/scim.html#usage)

Upon registration, this plugin will expose compliant [SCIM 2.0](https://simplecloud.info/#Specification) server. Generally, this server is meant to be consumed by a third-party (your identity provider), and will require a:

* **SCIM base URL**: This should be the fully qualified URL to the SCIM server (e.g `http://your-app.com/api/auth/scim/v2`)
* **SCIM bearer token**: See [generating a SCIM token](https://www.better-auth.com/docs/plugins/scim.html#generating-a-scim-token)

### [Generating a SCIM token](https://www.better-auth.com/docs/plugins/scim.html#generating-a-scim-token)

Before your identity provider can start syncing information to your SCIM server,
you need to generate a SCIM token that your identity provider will use to authenticate against it.

A SCIM token is a simple bearer token that you can generate:

ClientServer

POST

/scim/generate-token

```
const { data, error } = await authClient.scim.generateToken({    providerId: "acme-corp", // required    organizationId: "the-org",});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider id | `string` |
| `organizationId?` | Optional organization id. When specified, the organizations plugin must also be enabled | `string` |

POST

/scim/generate-token

```
const data = await auth.api.generateSCIMToken({    body: {        providerId: "acme-corp", // required        organizationId: "the-org",    },    // This endpoint requires session cookies.    headers: await headers(),});
```

| Prop | Description | Type |
| --- | --- | --- |
| `providerId` | The provider id | `string` |
| `organizationId?` | Optional organization id. When specified, the organizations plugin must also be enabled | `string` |

A `SCIM` token is always restricted to a provider, thus you are required to specify a `providerId`. This can be any provider your instance supports (e.g one of the built-in providers such as `credentials` or an external provider registered through an external plugin such as `@better-auth/sso`).
Additionally, when the `organization` plugin is registered, you can optionally restrict the token to an organization via the `organizationId`.

**Important:** By default, any authenticated user with access to your better-auth instance will be able to generate a SCIM token. This can be an important security risk to your application, especially in multi-tenant scenarios.
It is highly recommended that you implement [hooks](https://www.better-auth.com/docs/plugins/scim.html#hooks) to restrict this access to certain roles or users:

```
const userRoles = new Set(["admin"]);
const userAdminIds = new Set(["some-admin-user-id"]);

scim({
    beforeSCIMTokenGenerated: async ({ user, member, scimToken }) => {
        // IMPORTANT: Use this hook to restrict access to certain roles or users
        // At the very least access must be restricted to admin users (see example below)

        const userHasAdmin = member?.role && userRoles.has(member.role);
        const userIsAdmin = userAdminIds.size > 0 && userAdminIds.has(user.id);

        if (!userHasAdmin && !userIsAdmin) {
            throw new APIError("FORBIDDEN", { message: "User does not have enough permissions" });
        }
    },
})
```

See the [hooks](https://www.better-auth.com/docs/plugins/scim.html#hooks) documentation for more details about supported hooks.

### [SCIM endpoints](https://www.better-auth.com/docs/plugins/scim.html#scim-endpoints)

The following subset of the specification is currently supported:

#### [List users](https://www.better-auth.com/docs/plugins/scim.html#list-users)

Get a list of available users in the database. This is restricted to list only users associated to the same provider and organization than your SCIM token.

GET

/scim/v2/Users

Notes

Returns the provisioned SCIM user details. See https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.1

```
const data = await auth.api.listSCIMUsers({    query: {        filter: 'userName eq "user-a"',    },    // This endpoint requires a bearer authentication token.    headers: { authorization: 'Bearer <token>' },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `filter?` | SCIM compliant filter expression | `string` |

#### [Get user](https://www.better-auth.com/docs/plugins/scim.html#get-user)

Get an user from the database. The user will be only returned if it belongs to the same provider and organization than the SCIM token.

GET

/scim/v2/Users/:userId

Notes

Returns the provisioned SCIM user details. See https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.1

```
const data = await auth.api.getSCIMUser({    params: {        userId: "user id", // required    },    // This endpoint requires a bearer authentication token.    headers: { authorization: 'Bearer <token>' },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `userId` | Unique user identifier | `string` |

#### [Create new user](https://www.better-auth.com/docs/plugins/scim.html#create-new-user)

Provisions a new user to the database. The user will have an account associated to the same provider and will be member of the same org than the SCIM token.

POST

/scim/v2/Users

Notes

Provision a new user via SCIM. See https://datatracker.ietf.org/doc/html/rfc7644#section-3.3

```
const data = await auth.api.createSCIMUser({    body: {        externalId: "third party id",        name: {            formatted: "Daniel Perez",            givenName: "Daniel",            familyName: "Perez",        },        emails: [{ value: "daniel@email.com", primary: true }],    },    // This endpoint requires a bearer authentication token.    headers: { authorization: 'Bearer <token>' },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `externalId?` | Unique external (third party) identifier | `string` |
| `name?` | User name details | `Object` |
| `name.formatted?` | Formatted name (takes priority over given and family name) | `string` |
| `name.givenName?` | Given name | `string` |
| `name.familyName?` | Family name | `string` |
| `emails?` | List of emails associated to the user, only a single email can be primary | `Array<{ value: string, primary?: boolean }>` |

#### [Update an existing user](https://www.better-auth.com/docs/plugins/scim.html#update-an-existing-user)

Replaces an existing user details in the database. This operation can only update users that belong to the same provider and organization than the SCIM token.

PUT

/scim/v2/Users/:userId

Notes

Updates an existing user via SCIM. See https://datatracker.ietf.org/doc/html/rfc7644#section-3.3

```
const data = await auth.api.updateSCIMUser({    body: {        externalId: "third party id",        name: {            formatted: "Daniel Perez",            givenName: "Daniel",            familyName: "Perez",        },        emails: [{ value: "daniel@email.com", primary: true }],    },    // This endpoint requires a bearer authentication token.    headers: { authorization: 'Bearer <token>' },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `externalId?` | Unique external (third party) identifier | `string` |
| `name?` | User name details | `Object` |
| `name.formatted?` | Formatted name (takes priority over given and family name) | `string` |
| `name.givenName?` | Given name | `string` |
| `name.familyName?` | Family name | `string` |
| `emails?` | List of emails associated to the user, only a single email can be primary | `Array<{ value: string, primary?: boolean }>` |

#### [Partial update an existing user](https://www.better-auth.com/docs/plugins/scim.html#partial-update-an-existing-user)

Allows to apply a partial update to the user details. This operation can only update users that belong to the same provider and organization than the SCIM token.

PATCH

/scim/v2/Users/:userId

Notes

Partially updates a user resource. See https://datatracker.ietf.org/doc/html/rfc7644#section-3.5.2

```
const data = await auth.api.patchSCIMUser({    body: {        schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"], // required        Operations: [{ op: "replace", path: "/userName", value: "any value" }], // required    },    // This endpoint requires a bearer authentication token.    headers: { authorization: 'Bearer <token>' },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `schemas` | Mandatory schema declaration | `string[]` |
| `Operations` | List of JSON patch operations | `Array<{ op: "replace" | "add" | "remove", path: string, value: any }>` |

#### [Deletes a user resource](https://www.better-auth.com/docs/plugins/scim.html#deletes-a-user-resource)

Completely deletes a user resource from the database. This operation can only delete users that belong to the same provider and organization than the SCIM token.

DELETE

/scim/v2/Users/:userId

Notes

Deletes an existing user resource. See https://datatracker.ietf.org/doc/html/rfc7644#section-3.6

```
const data = await auth.api.deleteSCIMUser({    params: {        userId, // required    },    // This endpoint requires a bearer authentication token.    headers: { authorization: 'Bearer <token>' },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `userId` |  | `string` |

#### [Get service provider config](https://www.better-auth.com/docs/plugins/scim.html#get-service-provider-config)

Get SCIM metadata describing supported features of this server.

GET

/scim/v2/ServiceProviderConfig

Notes

Standard SCIM metadata endpoint used by identity providers. See https://datatracker.ietf.org/doc/html/rfc7644#section-4

```
const data = await auth.api.getSCIMServiceProviderConfig();
```

#### [Get SCIM schemas](https://www.better-auth.com/docs/plugins/scim.html#get-scim-schemas)

Get the list of supported SCIM schemas.

GET

/scim/v2/Schemas

Notes

Standard SCIM metadata endpoint used by identity providers to acquire information about supported schemas. See https://datatracker.ietf.org/doc/html/rfc7644#section-4

```
const data = await auth.api.getSCIMSchemas();
```

#### [Get SCIM schema](https://www.better-auth.com/docs/plugins/scim.html#get-scim-schema)

Get the details of a supported SCIM schema.

GET

/scim/v2/Schemas/:schemaId

Notes

Standard SCIM metadata endpoint used by identity providers to acquire information about a given schema. See https://datatracker.ietf.org/doc/html/rfc7644#section-4

```
const data = await auth.api.getSCIMSchema();
```

#### [Get SCIM resource types](https://www.better-auth.com/docs/plugins/scim.html#get-scim-resource-types)

Get the list of supported SCIM types.

GET

/scim/v2/ResourceTypes

Notes

Standard SCIM metadata endpoint used by identity providers to get a list of server supported types. See https://datatracker.ietf.org/doc/html/rfc7644#section-4

```
const data = await auth.api.getSCIMResourceTypes();
```

#### [Get SCIM resource type](https://www.better-auth.com/docs/plugins/scim.html#get-scim-resource-type)

Get the details of a supported SCIM resource type.

GET

/scim/v2/ResourceTypes/:resourceTypeId

Notes

Standard SCIM metadata endpoint used by identity providers to get a server supported type. See https://datatracker.ietf.org/doc/html/rfc7644#section-4

```
const data = await auth.api.getSCIMResourceType();
```

#### [SCIM attribute mapping](https://www.better-auth.com/docs/plugins/scim.html#scim-attribute-mapping)

By default, the SCIM provisioning will automatically map the following fields:

* `user.email`: User primary email or the first available email if there is not a primary one
* `user.name`: Derived from `name` (`name.formatted` or `name.givenName` + `name.familyName`) and fallbacks to the user primary email
* `account.providerId`: Provider associated to the `SCIM` token
* `account.accountId`: Defaults to `externalId` and fallbacks to `userName`
* `member.organizationId`: Organization associated to the provider

## [Schema](https://www.better-auth.com/docs/plugins/scim.html#schema)

The plugin requires additional fields in the `scimProvider` table to store the provider's configuration.

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| id | string | PK | A database identifier |
| providerId | string | - | The provider ID. Used to identify a provider and to generate a redirect URL. |
| scimToken | string | - | The SCIM bearer token. Used by your identity provider to authenticate against your server |
| organizationId | string | - | The organization Id. If provider is linked to an organization. |

## [Options](https://www.better-auth.com/docs/plugins/scim.html#options)

### [Server](https://www.better-auth.com/docs/plugins/scim.html#server)

* `storeSCIMToken`: The method to store the SCIM token in your database, whether `encrypted`, `hashed` or `plain` text. Default is `plain` text.

Alternatively, you can pass a custom encryptor or hasher to store the SCIM token in your database.

**Custom encryptor**

auth.ts

```
scim({
    storeSCIMToken: {
        encrypt: async (scimToken) => {
            return myCustomEncryptor(scimToken);
        },
        decrypt: async (scimToken) => {
            return myCustomDecryptor(scimToken);
        },
    }
})
```

**Custom hasher**

auth.ts

```
scim({
    storeSCIMToken: {
        hash: async (scimToken) => {
            return myCustomHasher(scimToken);
        },
    }
})
```

### [Hooks](https://www.better-auth.com/docs/plugins/scim.html#hooks)

The following hooks allow to intercept the lifecycle of the `SCIM` token generation:

```
scim({
    beforeSCIMTokenGenerated: async ({ user, member, scimToken }) => {
        // Callback called before the scim token is persisted
        // can be useful to intercept the generation
        if (member?.role !== "admin") {
            throw new APIError("FORBIDDEN", { message: "User does not have enough permissions" });
        }
    },
    afterSCIMTokenGenerated: async ({ user, member, scimToken, scimProvider }) => {
        // Callback called after the scim token has been persisted
        // can be useful to send a notification or otherwise share the token
        await shareSCIMTokenWithInterestedParty(scimToken);
    },
})
```

**Note**: All hooks support error handling. Throwing an error in a before hook will prevent the operation from proceeding.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/scim.mdx)

[Previous Page

SSO](https://www.better-auth.com/docs/plugins/sso.html)[Next Page

Utility](https://www.better-auth.com/docs/plugins/scim.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/scim.html#installation)[Install the plugin](https://www.better-auth.com/docs/plugins/scim.html#install-the-plugin)[Add Plugin to the server](https://www.better-auth.com/docs/plugins/scim.html#add-plugin-to-the-server)[Enable HTTP methods](https://www.better-auth.com/docs/plugins/scim.html#enable-http-methods)[Migrate the database](https://www.better-auth.com/docs/plugins/scim.html#migrate-the-database)[Usage](https://www.better-auth.com/docs/plugins/scim.html#usage)[Generating a SCIM token](https://www.better-auth.com/docs/plugins/scim.html#generating-a-scim-token)[SCIM endpoints](https://www.better-auth.com/docs/plugins/scim.html#scim-endpoints)[List users](https://www.better-auth.com/docs/plugins/scim.html#list-users)[Get user](https://www.better-auth.com/docs/plugins/scim.html#get-user)[Create new user](https://www.better-auth.com/docs/plugins/scim.html#create-new-user)[Update an existing user](https://www.better-auth.com/docs/plugins/scim.html#update-an-existing-user)[Partial update an existing user](https://www.better-auth.com/docs/plugins/scim.html#partial-update-an-existing-user)[Deletes a user resource](https://www.better-auth.com/docs/plugins/scim.html#deletes-a-user-resource)[Get service provider config](https://www.better-auth.com/docs/plugins/scim.html#get-service-provider-config)[Get SCIM schemas](https://www.better-auth.com/docs/plugins/scim.html#get-scim-schemas)[Get SCIM schema](https://www.better-auth.com/docs/plugins/scim.html#get-scim-schema)[Get SCIM resource types](https://www.better-auth.com/docs/plugins/scim.html#get-scim-resource-types)[Get SCIM resource type](https://www.better-auth.com/docs/plugins/scim.html#get-scim-resource-type)[SCIM attribute mapping](https://www.better-auth.com/docs/plugins/scim.html#scim-attribute-mapping)[Schema](https://www.better-auth.com/docs/plugins/scim.html#schema)[Options](https://www.better-auth.com/docs/plugins/scim.html#options)[Server](https://www.better-auth.com/docs/plugins/scim.html#server)[Hooks](https://www.better-auth.com/docs/plugins/scim.html#hooks)

Ask AI
