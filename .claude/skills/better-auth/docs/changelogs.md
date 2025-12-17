---
title: "Changelogs | Better Auth"
source_url: "https://www.better-auth.com/changelogs"
fetched_at: "2025-12-17T17:03:49.997163+00:00"
---



[BETTER-AUTH.](https://www.better-auth.com/index.html)

* [\_hello](https://www.better-auth.com/index.html)
* [docs](https://www.better-auth.com/docs.html)
* [changelogs](https://www.better-auth.com/changelogs.html)
* [blogs](https://www.better-auth.com/blog.html)
* [community](https://www.better-auth.com/community.html)
* [enterprise](https://www.better-auth.com/enterprise.html)

[hello\_](https://www.better-auth.com/index.html)[docs](https://www.better-auth.com/docs.html)[examples](https://www.better-auth.com/docs/examples/next-js)[changelogs](https://www.better-auth.com/changelogs.html)[blogs](https://www.better-auth.com/blog.html)[community](https://www.better-auth.com/community.html)[enterprise](https://www.better-auth.com/enterprise.html)

# All of the changes made will be available here.

Better Auth is the most comprehensive authentication framework for TypeScript that provides a wide range of features to make authentication easier and more secure.

---

[Documentation](https://www.better-auth.com/docs.html)[GitHub](https://github.com/better-auth/better-auth)[Community](https://discord.gg/better-auth)

[BETTER-AUTH.](https://x.com/better_auth)

## Dec 14, 2025 [v1.4.7](https://www.better-auth.com/changelogs.html#v1.4.7) Dec 14, 2025

### 🚀 Features ---

* **admin**:
  + Add support role with permissions for user updates and enforce role change validation – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **one-time-token**:
  + Support setting session cookie on ott verify – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **phone-number**:
  + Add password length validation for reset functionality – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **saml**:
  + Assertion timestamp validation with per-provider clock skew – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)
* **sso**:
  + Add InResponseTo validation – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)
  + Add OIDC discovery – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Add URL normalization and validation to all discovery URLs – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines) [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)

### 🐞 Bug Fixes ---

* Prevent stateless refresh with database configured – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **api-key**: Check metadata is enabled for api key update endpoint – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **line**: Enforce nonce – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **saml**: Remove signature validation bypass – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)

### 🏎 Performance ---

* Add index on organizations slug field – [![@matteobad](https://github.com/matteobad.png)](https://github.com/matteobad)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.4.6...v1.4.7)

## Dec 9, 2025 [v1.4.6](https://www.better-auth.com/changelogs.html#v1.4.6) Dec 9, 2025

### 🚀 Features ---

* Add `ctx.isTrustedDomain` helper – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines)
* Drizzle pg supports JSON – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
* Add Refresh Token Support to Kick OAuth Provider – [![@CesarRodrigu](https://github.com/CesarRodrigu.png)](https://github.com/CesarRodrigu)
* **admin**: Prevent impersonating admins by default [breaking] – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **expo**: Last-login-method client plugin – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **multi-session**: Allow to infer additional fields – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)
* **organization**: Allow invited users to see organization name – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* **sso**: Use domain verified flag to trust providers automatically – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)

### 🐞 Bug Fixes ---

* Avoid throwing on client side – [![@landoncolburn](https://github.com/landoncolburn.png)](https://github.com/landoncolburn) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Export organization plugin types – [![@pffigueiredo](https://github.com/pffigueiredo.png)](https://github.com/pffigueiredo)
* Prematurely deleting active sessions in secondary storage – [![@DevDuki](https://github.com/DevDuki.png)](https://github.com/DevDuki)
* Pathname should be normalized when basePath is set to root – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Make sure non-chunked session data cookie is cleared – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Array field handling across adapters and schema generation – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* StoreStateStrategy default to database if provided – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Should always remove 2FA verification token after successful verification – [![@delfortrie](https://github.com/delfortrie.png)](https://github.com/delfortrie)
* **adapter**:
  + Add logger creation in adapter factory – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Allow run internal adapter outside context – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **admin**:
  + Clear admin session cookie on `stopImpersonating` – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)
* **cli**:
  + `secret` generates empty – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Deduplicate drizzle schema relationships – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **core**:
  + Allow returning null in getUserInfo in provider options – [![@Zollerboy1](https://github.com/Zollerboy1.png)](https://github.com/Zollerboy1)
* **db**:
  + Correctly unwrap validator result in schema parsing – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* **deps**:
  + Update dependency next to v16.0.7 [security]
  + Update dependency @react-email/components to v1
* **kysely**:
  + Wrong affected row count in updateMany & deleteMany – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)
* **magic-link**:
  + Handle query params in errorCallbackUrl – [![@martinriviere](https://github.com/martinriviere.png)](https://github.com/martinriviere)
* **oidc**:
  + Compatibility with exact-optional-property – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **openapi**:
  + Mark /get-session response as nullable – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* **prisma**:
  + Use findFirst instead of findMany for findOne – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **saml**:
  + Enforce trusted provider check – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)
* **sso**:
  + Safely parse provider configs on registration – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **username**:
  + Await username validator – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.4.5...v1.4.6)

## Nov 30, 2025 [v1.4.4](https://www.better-auth.com/changelogs.html#v1.4.4) Nov 30, 2025

### 🚀 Features ---

* **cli**: Better-auth-command – [![@Ridhim-RR](https://github.com/Ridhim-RR.png)](https://github.com/Ridhim-RR)
* **scim**: Add support to parse custom scim+json media type – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines)

### 🐞 Bug Fixes ---

* Customizing fields should be optional for rate limit options – [![@ceolinwill](https://github.com/ceolinwill.png)](https://github.com/ceolinwill)
* Chunk account data cookie when exceeding limit – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)
* Remove applying user-agent by default – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Additional fields default values should apply when creating session – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Return null early if userid isn't defined – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **logger**: Log level priority – [![@danielfinke](https://github.com/danielfinke.png)](https://github.com/danielfinke)
* **mcp**: Return origin url as authorization server – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)
* **multi-session**: Endpoints breaks with invalid signatures – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **oidc-provider**: Resolve getSignedCookie return type – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.4.3...v1.4.4)

## Nov 26, 2025 [v1.4.3](https://www.better-auth.com/changelogs.html#v1.4.3) Nov 26, 2025

### 🚀 Features ---

* Add Vercel as OAuth provider – [![@anatrajkovska](https://github.com/anatrajkovska.png)](https://github.com/anatrajkovska)
* Add support for trusted proxy headers in base URL inference – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)

### 🐞 Bug Fixes ---

* Support @tanstack/solid-start in tanstackStartCookies plugin " – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **open-api**: Clean up incorrect null type in OpenAPI – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* **two-factor**: Remove incorrect blocking logic in OTP setup and verification – [![@isaacriehm](https://github.com/isaacriehm.png)](https://github.com/isaacriehm)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.4.2...v1.4.3)

## Nov 25, 2025 [v1.4.2](https://www.better-auth.com/changelogs.html#v1.4.2) Nov 25, 2025

### 🚀 Features ---

* **cli**: Check `/auth` for `auth.ts` – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **github**: Add PKCE support for Github – [![@Shridhad](https://github.com/Shridhad.png)](https://github.com/Shridhad)
* **jwt**: Allow custom jwks endpoint – [![@luist18](https://github.com/luist18.png)](https://github.com/luist18)

### 🐞 Bug Fixes ---

* Support @tanstack/solid-start in tanstackStartCookies plugin – [![@jakst](https://github.com/jakst.png)](https://github.com/jakst)
* SignIn/signUp API returns user additional field – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **cli**:
  + Kysely migration fails due to chaining addIndex and addColumn on the same alterTable builder – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Prevent duplicate index creation in Prisma schema generation – [![@rovertrack](https://github.com/rovertrack.png)](https://github.com/rovertrack)
* **client**:
  + Get-session gets triggered twice on foucs – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **email-otp**:
  + Sign-in email-otp bugs with capitalized emails – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **oidc-provider**:
  + Session shouldn't be required – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **organization**:
  + Have deleteOrganization use adapter.deleteMany instead of delete – [![@kefimoto](https://github.com/kefimoto.png)](https://github.com/kefimoto)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.4.1...v1.4.2)

## Nov 22, 2025 [v1.4.1](https://www.better-auth.com/changelogs.html#v1.4.1) Nov 22, 2025

### 🚀 Features ---

* **api-key**: Support secondary storage – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)

### 🐞 Bug Fixes ---

* Custom fn field default values should be properly evaluted – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **jwt**: Retrieve latest keys from storage properly – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **passkey**: Change `generate-authenticate-options` from POST to GET – [![@mburumaxwell](https://github.com/mburumaxwell.png)](https://github.com/mburumaxwell)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.4.0...v1.4.1)

## Nov 22, 2025 [v1.4.0](https://www.better-auth.com/changelogs.html#v1.4.0) Nov 22, 2025

### 🚀 Features ---

* Bypass transaction with async local storage – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Add `returnHeaders` to `getSession` – [![@frectonz](https://github.com/frectonz.png)](https://github.com/frectonz)
* Waku integration guide – [![@rmarscher](https://github.com/rmarscher.png)](https://github.com/rmarscher)
* Add support for custom callback for authorization url – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Additional fields on account – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
* Add support for custom callback for token url – [![@acusti](https://github.com/acusti.png)](https://github.com/acusti)
* Enum support for drizzle schema – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Nextjs 16 guide – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Add `storeStateStrategy` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Enhance PostgreSQL support for non-public schema by respecting `search_path` configuration – [![@okisdev](https://github.com/okisdev.png)](https://github.com/okisdev)
* Add polar oauth provider – [![@ephraimduncan](https://github.com/ephraimduncan.png)](https://github.com/ephraimduncan)
* Session store chunking – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Stateless session management – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Esm only – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Implement automatic server-side IP detection – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* Async import in `getAdapter` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Improved API error page – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Add request state – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Add support for uuids – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Auto-index CLI – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Expose additional http methods – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* `better-auth/minimal` – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Add support for custom response status codes – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Support pass raw function as middleware – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Support pass raw function as middleware " – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Adapter join support – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Refactor fetch plugins config disableDefaultFetchPlugins to include userAgentPlugin – [![@kaandok](https://github.com/kaandok.png)](https://github.com/kaandok) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Utilize database joins across better-auth – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Support storing account data in a cookie – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Adding support for SCIM provisioning – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines)
* Add support for organization slug on list members – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **anonymous**:
  + Support phone number verification for account linking – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Allow customizing random email generator – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* **captcha**:
  + Add support for CaptchaFox – [![@tgrassl](https://github.com/tgrassl.png)](https://github.com/tgrassl)
* **cli**:
  + Add mcp client configs from `cli` – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Support Cloudflare Workers virtual module imports – [![@chhoumann](https://github.com/chhoumann.png)](https://github.com/chhoumann)
* **client**:
  + Refetch session when browser state changes – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Add type helper `AuthClient` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Introduce `disableSignal` client option – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **core**:
  + Replace ZodType with `@standard-schema/spec` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **db**:
  + Delete hooks – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **device-authorization**:
  + Add verification uri – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **discord**:
  + Allow specification of permissions – [![@TheUntraceable](https://github.com/TheUntraceable.png)](https://github.com/TheUntraceable) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **docs**:
  + Adding missing auth & colour in builder – [![@okisdev](https://github.com/okisdev.png)](https://github.com/okisdev)
* **email-otp**:
  + Allow returning undefined in `generateOTP` – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **expo**:
  + Support multiple cookie prefixes for better-auth detection – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **generic-oauth**:
  + Provide pre configured provider helpers – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)
  + Add custom token exchange support for non-standard providers – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* **jwt**:
  + Support custom adapter option for jwt – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Add JWT verification endpoint and refactor verification logic – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Add key rotation – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)
* **last-login-method**:
  + Update OAuth login method tracking for multiple auth type – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123)
  + Add support for 'siwe' as a last login method and added tests – [![@rovertrack](https://github.com/rovertrack.png)](https://github.com/rovertrack)
* **mongodb**:
  + Support string IDs over ObjectIDs – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@ahmedriad1](https://github.com/ahmedriad1.png)](https://github.com/ahmedriad1)
* **oauth-proxy**:
  + Stateless mode compatibility – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* **oidc-provider**:
  + Add RP-Initiated Logout endpoint – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **organization**:
  + Support createdAt on invitations – [![@iRoachie](https://github.com/iRoachie.png)](https://github.com/iRoachie) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Refactor organization schema to use BetterAuth types – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **passkey**:
  + Allow multiple passkey origins – [![@kevcube](https://github.com/kevcube.png)](https://github.com/kevcube)
* **paybin**:
  + Add Paybin OAuth provider – [![@redoh](https://github.com/redoh.png)](https://github.com/redoh)
* **phone-number**:
  + Allow custom verifyOTP implementation – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@zain](https://github.com/zain.png)](https://github.com/zain)
* **plugin-openapi**:
  + Allow passing nonce for CSP – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* **prisma**:
  + Enhance JSON default value handling for arrays and objects in schema generation – [![@rovertrack](https://github.com/rovertrack.png)](https://github.com/rovertrack)
* **session**:
  + Use JWE for cookie cache by default – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **sso**:
  + DefaultSSO options and ACS endpoint – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Provide default service provider metadata – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
  + Add option to provide login hint – [![@tnkuehne](https://github.com/tnkuehne.png)](https://github.com/tnkuehne)
  + Add domain verification for SSO providers – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **stripe**:
  + Upgrade stripe support to v19.1.0 – [![@okisdev](https://github.com/okisdev.png)](https://github.com/okisdev)
  + Add `StripePlugin` type – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Allow any scheme – [![@hyoban](https://github.com/hyoban.png)](https://github.com/hyoban) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Allow flexible types in plan limits – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)

### 🐞 Bug Fixes ---

* Device authorization plugin – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* Device authorization plugin – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* Reduce any type in generator.ts – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Refresh secondary storage sessions on user update – [![@frectonz](https://github.com/frectonz.png)](https://github.com/frectonz)
* Allow disable database transaction – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Wrap `Math.floor` around the division when calculating TTL – [![@DevDuki](https://github.com/DevDuki.png)](https://github.com/DevDuki) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Ttl sessions list expiration – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
* Tests failing due to clock drift – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
* Refresh secondary storage sessions on user update – [![@frectonz](https://github.com/frectonz.png)](https://github.com/frectonz)
* Refresh secondary storage sessions on user update – [![@frectonz](https://github.com/frectonz.png)](https://github.com/frectonz)
* Support compressed ipv6 format – [![@Velka-DEV](https://github.com/Velka-DEV.png)](https://github.com/Velka-DEV)
* Add required constraint to slug filed in org plugin – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* Use consistent messaging on `requestPasswordReset` – [![@Eazash](https://github.com/Eazash.png)](https://github.com/Eazash)
* Cookie size limit shouldn't throw error – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Handle symbols in proxy get trap to prevent TypeError – [![@zbeyens](https://github.com/zbeyens.png)](https://github.com/zbeyens) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Ttl for rate limited secondary storage – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
* Properly encode callback url for email verificaiton – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Session update database hook should expect partial session type – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Deprecate `options.advanced.generateId` type – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Api keys should properly check if a request is from client or server – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Refactor account deletion functions to trigger database hooks – [![@xuchenhao001](https://github.com/xuchenhao001.png)](https://github.com/xuchenhao001)
* Improve username transformation logic – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Ensure falsy values are valid default values – [![@ocherry341](https://github.com/ocherry341.png)](https://github.com/ocherry341)
* Import `node:async_hooks` directly – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Undeclared variable reference on docs – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123)
* Argument `where` of type TwoFactorWhereUniqueInput needs at least one of `id` arguments – [![@AlexStrNik](https://github.com/AlexStrNik.png)](https://github.com/AlexStrNik)
* Mobile ai search responsiveness – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123)
* Type compatibility with `exactOptionalPropertyTypes` – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Remove deprecated `ssoClient` export from client plugin – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123)
* GetAcccessToken refresh should properly refresh when oauth tokens are encrypted – [![@bsklaroff](https://github.com/bsklaroff.png)](https://github.com/bsklaroff)
* Resolve custom URL scheme origin matching with wildcards – [![@AntonVishal](https://github.com/AntonVishal.png)](https://github.com/AntonVishal)
* Respect additionalFields returned config for user data when setting cookie cache – [![@ahmed-abdat](https://github.com/ahmed-abdat.png)](https://github.com/ahmed-abdat) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Correct type `HookEndpointContext` and `InternalContext` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Add optional chaining for process.platform – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* User-agent requirement when fetching from clients – [![@dvanmali](https://github.com/dvanmali.png)](https://github.com/dvanmali)
* Unused peer dependency – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Rename `sha` to `branch` and made it `canary` by default – [![@max-programming](https://github.com/max-programming.png)](https://github.com/max-programming)
* Remove deprecated forgetPassword endpoints – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* Respect onAPIError.errorURL in OAuth callback flow – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Call db hooks when calling `deleteUser` – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Allow user update to handle additional fields and validation – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Missing email validation – [![@ahmedriad1](https://github.com/ahmedriad1.png)](https://github.com/ahmedriad1) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Urls without protocol shouldn't be able to satisfy a wildcard origin – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Use standard validator – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Add `undefined` type for optional property types – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Type mismatch for 'banned' on UserWithRole – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* Delete duplicate email existence check in changeEmail endpoint – [![@DevDuki](https://github.com/DevDuki.png)](https://github.com/DevDuki)
* Add missing userId in listAccounts response – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
* Trigger use session on revoke sessions – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* `string[]` inference for additionalFields – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* Unsanitized endpoints provided dates will cause DB insert failure – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Update hooks return should merge with original data – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* Dont trigger session refresh on magic-link sign-in – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Treat generateId "serial" as numeric ID and correct UUID column types across adapters – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Validate baseURL protocol and improve error messages – [![@dmmulroy](https://github.com/dmmulroy.png)](https://github.com/dmmulroy)
* Use `ctx` over `request` in plugin options – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Use `identity` instead of `serial` for pg schema – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Zoom refresh token – [![@borgoat](https://github.com/borgoat.png)](https://github.com/borgoat)
* `/change-email` should trigger session signal – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* Resolve SESSION\_IS\_NOT\_FRESH error with cookieCache – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* Preserve provided string IDs in the MongoDB adapter when they are not valid ObjectId – [![@udnes99](https://github.com/udnes99.png)](https://github.com/udnes99)
* GenericOAuth and SSO ignore discoveryUrl for authorization – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* Remove active session requirement for change email verification – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **adapter**:
  + Returning null as string for optional id references – [![@jslno](https://github.com/jslno.png)](https://github.com/jslno)
  + Use updated field values in WHERE clause during update – [![@QuintenStr](https://github.com/QuintenStr.png)](https://github.com/QuintenStr) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Foreign keys that are nullable on number ids can return string of `null` – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Ensure transaction function is implemented in the adapter – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Missing data type transformation on where clauses – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Inconsistent mongo `ends_with` query – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Kysely with `CamelCasePlugin` breaks for OIDC. – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Should not apply `defaultValue` during `find` calls – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Drizzle `deleteMany` result should be a number – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **adapters**:
  + Mongodb id issue – [![@okisdev](https://github.com/okisdev.png)](https://github.com/okisdev) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **admin**:
  + Stricter body validation with the setUserPassword api – [![@hieudien14310](https://github.com/hieudien14310.png)](https://github.com/hieudien14310) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Validate admin role updates against the configured roles to prevent setting a non-existent role – [![@hieudien14310](https://github.com/hieudien14310.png)](https://github.com/hieudien14310)
* **anonymous**:
  + Provide `ctx` on accountLink – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + `isAnonymous` should default to false instead of null – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **api-key**:
  + Cascade api keys on user deletion – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Cascade api keys on user deletion – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Calling client on server side – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Correct refill interval time calculation – [![@Pankaj3112](https://github.com/Pankaj3112.png)](https://github.com/Pankaj3112) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Shouldn't issue api key a mock session by default – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Don't update the `lastRequest` when calling updateApiKey – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Remove incorrect usage tracking in updateApiKey – [![@ahmed-abdat](https://github.com/ahmed-abdat.png)](https://github.com/ahmed-abdat) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **better-auth**:
  + Moved email verification check after password check – [![@QuintenStr](https://github.com/QuintenStr.png)](https://github.com/QuintenStr)
* **cli**:
  + DefaultNow is deprecated in schema for Drizzle with SQLite – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Timestamp in schema for Drizzle with SQLite – [![@zy1p](https://github.com/zy1p.png)](https://github.com/zy1p)
  + Move type dependencies to devDependencies – [![@bdkopen](https://github.com/bdkopen.png)](https://github.com/bdkopen)
* **client**:
  + BaseURL is undefined for SSR – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Add lynx client exports – [![@JagritGumber](https://github.com/JagritGumber.png)](https://github.com/JagritGumber)
  + Missing isRefetching type in react `useSession` – [![@ThibautCuchet](https://github.com/ThibautCuchet.png)](https://github.com/ThibautCuchet)
  + Ensure refetchInterval triggers active network request – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **cookie**:
  + SameSite to "none" for oauth state – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + SameSite to "none" for oauth state " – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **core**:
  + Correctly set typesVersions paths – [![@XiNiHa](https://github.com/XiNiHa.png)](https://github.com/XiNiHa)
* **create-adapter**:
  + Disable transaction by default – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **custom-session**:
  + Don't overwrite the `Set-Cookie` header – [![@frectonz](https://github.com/frectonz.png)](https://github.com/frectonz)
  + Infer.Session to infer the return type of the custom session – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **db**:
  + `onDelete` is ignored – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Postgres - explicitly define pg\_catalog for gen\_random\_uuid() – [![@mrl5](https://github.com/mrl5.png)](https://github.com/mrl5)
* **deps**:
  + Update dependency @nanostores/react to v1
* **device-authorization**:
  + Fix client error type for deny device – [![@3ddelano](https://github.com/3ddelano.png)](https://github.com/3ddelano)
  + Sanitize user code input on device approve – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **docs**:
  + Set default tab to next-js since react was not listed – [![@mohit4bug](https://github.com/mohit4bug.png)](https://github.com/mohit4bug)
  + Anchor link scrolling with conflict prevention – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123)
  + Enable code block copying in documentation page – [![@vagxrth](https://github.com/vagxrth.png)](https://github.com/vagxrth)
* **drizzle**:
  + Replace pgEnum with text enum type in Drizzle schema generation – [![@eni4sure](https://github.com/eni4sure.png)](https://github.com/eni4sure)
* **drizzle-adapter**:
  + Handle all operators in multiple `where` conditions – [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **email-otp**:
  + Call reset password callback – [![@HoshangDEV](https://github.com/HoshangDEV.png)](https://github.com/HoshangDEV)
  + Email-verification doesn't trigger session signal – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Fix openapi schema for /email-otp/verify-email endpoint – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines)
  + Prevent duplicate verification emails when override is enabled – [![@ephraimduncan](https://github.com/ephraimduncan.png)](https://github.com/ephraimduncan)
  + Prevent user enumeration on email OTP – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Use constant time equal for equality checks – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **expo**:
  + Set-header retrigger `$sessionSignal` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Store normalized cookie name in storage – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Origin check failing due to null origin in expo – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Account linking flow on mobile – [![@almadoro](https://github.com/almadoro.png)](https://github.com/almadoro)
  + Clear peer dependence and flag optional – [![@hyoban](https://github.com/hyoban.png)](https://github.com/hyoban)
  + Enhance cookie detection for better-auth cookies – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **generic-oauth**:
  + `overrideUserInfo` doesn't work – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Await async mapProfileToUser – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **gitlab**:
  + Fix the token endpoint – [![@Tobix99](https://github.com/Tobix99.png)](https://github.com/Tobix99)
* **haveibeenpwned**:
  + Check for limited set of paths – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **last-login-method**:
  + Custom resolver method default logic – [![@ThibautCuchet](https://github.com/ThibautCuchet.png)](https://github.com/ThibautCuchet)
  + LastLoginMethod cookie is not set when using a generic oauth provider – [![@nbifrye](https://github.com/nbifrye.png)](https://github.com/nbifrye)
  + Detect passkey login to set last used method – [![@GautamBytes](https://github.com/GautamBytes.png)](https://github.com/GautamBytes)
* **magic-link**:
  + Avoid returning error for disabled signup early – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Ensure emailVerified update is reflected in user object – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **mcp**:
  + Missing Content-Type header for mcp DCR – [![@Berndwl](https://github.com/Berndwl.png)](https://github.com/Berndwl)
  + Consent requirement should be respected – [![@okisdev](https://github.com/okisdev.png)](https://github.com/okisdev)
* **mongodb**:
  + Mongodb findOneAndUpdate should return `.value` – [![@Paola3stefania](https://github.com/Paola3stefania.png)](https://github.com/Paola3stefania)
* **multi-session**:
  + Reject cookies without valid signatures on signout hook – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **nuxt**:
  + Avoid load env base url for SSR – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **oauth**:
  + Redirect to GET for POST method – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **oauth-proxy**:
  + Should skip state check for oauth proxy – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Handle cross-origin flows – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Return multiple Set-Cookie headers instead of a single comma-separated header – [![@nakasyou](https://github.com/nakasyou.png)](https://github.com/nakasyou)
* **oauth2**:
  + Fix user data not reflecting provider updates with overrideUserInfo – [![@dandamian](https://github.com/dandamian.png)](https://github.com/dandamian)
* **odic**:
  + Case when `prompt=login` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Case when `prompt=login` " – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **odic-provider**:
  + Default options – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **oidc**:
  + Properly enforce consent requirements per OIDC spec – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **oidc-provider**:
  + OIDC token-type capitalization – [![@yutaka5](https://github.com/yutaka5.png)](https://github.com/yutaka5)
  + Use consistent iat claim and allow configurable issuer – [![@ephraimduncan](https://github.com/ephraimduncan.png)](https://github.com/ephraimduncan) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Improve typing – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + `oidc_login_prompt` not cleared after login – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Change updated\_at to be a UNIX numeric timestamp – [![@ShobhitPatra](https://github.com/ShobhitPatra.png)](https://github.com/ShobhitPatra) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Fix opts order – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + `oidc_login_prompt` not cleared after login " – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Missing options – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Implement proper OIDC prompt parameter handling – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Redirect to consent when scope changed – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **openapi**:
  + Add `operationId`s to routes – [![@thomasmol](https://github.com/thomasmol.png)](https://github.com/thomasmol) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@TheUntraceable](https://github.com/TheUntraceable.png)](https://github.com/TheUntraceable)
* **org**:
  + Use correct adapter during db tranaction – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Update type to include undefined – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **organization**:
  + Decouple client and server permission checks – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Decouple client and server permission checks – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Membership check for organizations with large member counts – [![@Badbird5907](https://github.com/Badbird5907.png)](https://github.com/Badbird5907) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Remove `autoCreateOnSignUp` option as it's not implemented yet – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Pass `ctx` to DB hooks – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Allow passing id through `beforeCreateOrganization` – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Prevent empty name and slug in create/update – [![@kira-1011](https://github.com/kira-1011.png)](https://github.com/kira-1011)
  + Certain parameters not showing in client types – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Prevent duplicate slug on organization update – [![@kira-1011](https://github.com/kira-1011.png)](https://github.com/kira-1011) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Kinfe123](https://github.com/Kinfe123.png)](https://github.com/Kinfe123)
  + Compatibility with declaration on tsconfig.json – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Compatibility with `exactOptionalPropertyTypes` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Typecheck node exceeds the maximum length – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Fix the schema type – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + RemoveTeamMember breaks for prisma – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Correct migration order when dynamicAccessControl is enabled – [![@AntonVishal](https://github.com/AntonVishal.png)](https://github.com/AntonVishal) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Deleting member from org doesn't delete them from teams – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + All endpoints should properly infer additional fields – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@ahmedriad1](https://github.com/ahmedriad1.png)](https://github.com/ahmedriad1)
  + ActiveOrgId no longer inferred after enabling dynamic AC – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **passkey**:
  + Remove `email` from query – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Atom listeners not working – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Passkey breaks with `throw: true` – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Wrong Session type being used on passkey – [![@ouwargui](https://github.com/ouwargui.png)](https://github.com/ouwargui)
  + Filter delete passkey with userId – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Ensure addPasskey returns passkey data instead of undefined – [![@mburumaxwell](https://github.com/mburumaxwell.png)](https://github.com/mburumaxwell)
* **phone-number**:
  + Shouldn't allow updating phone number on `/update-user` endpoint – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **session**:
  + Refresh cache before it expires – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Persist additionalFields in cookie cache – [![@Ridhim-RR](https://github.com/Ridhim-RR.png)](https://github.com/Ridhim-RR)
* **social-providers**:
  + Core module import – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **sso**:
  + Safe json parsing for saml/oidc configs – [![@natetewelde](https://github.com/natetewelde.png)](https://github.com/natetewelde) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Prevent duplicate SSO provider creation with same providerId – [![@xiaoyu2er](https://github.com/xiaoyu2er.png)](https://github.com/xiaoyu2er)
  + OIDC scopes should fallback to provider scopes – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Add deprecated flag to the old `sso` plugin export – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Move oauth2-mock-server dep into devDependencies for sso package – [![@rbayliss](https://github.com/rbayliss.png)](https://github.com/rbayliss)
  + Use the internalAdapter for user queries to avoid skipping database hooks – [![@hartbit](https://github.com/hartbit.png)](https://github.com/hartbit)
  + Respect disableImplicitSignUp in SAML callback – [![@kanarian](https://github.com/kanarian.png)](https://github.com/kanarian)
  + Prevent server instance from leaking to client – [![@rbayliss](https://github.com/rbayliss.png)](https://github.com/rbayliss)
  + Export SSOProvider type – [![@rbayliss](https://github.com/rbayliss.png)](https://github.com/rbayliss)
* **stripe**:
  + OnCustomerCreate should be called even if update user isn't returned – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Update with an existing subscription – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Sync customer email on db change – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + `getCustomerCreateParams` not actually being called – [![@ebalo55](https://github.com/ebalo55.png)](https://github.com/ebalo55) [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
  + Throw error if event failed to be constructed – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Check for reference IDs inside during Stripe reference validation – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Stripe error codes should be returned from the plugin – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Remove TS error suppression updating getCheckoutSessionParams – [![@mohebifar](https://github.com/mohebifar.png)](https://github.com/mohebifar)
  + Prevent duplicate customer creation on signup – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu)
  + Return updated subscription in onSubscriptionUpdate callback – [![@bytaesu](https://github.com/bytaesu.png)](https://github.com/bytaesu) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Throw error if query.referenceId is defined – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Cancel subscription fails with Prisma – [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
* **telemetry**:
  + Avoid async import if telemetry disabled, fix for esbuild – [![@erquhart](https://github.com/erquhart.png)](https://github.com/erquhart)
  + Avoid async import if telemetry disabled, fix for esbuild " – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **test**:
  + Use async import for db – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **two-factor**:
  + Return parsed array in viewBackupCodes – [![@ahmed-abdat](https://github.com/ahmed-abdat.png)](https://github.com/ahmed-abdat)
  + Backup codes shouldn't be encrypted twice – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Avoid GET endpoints with body – [![@jonathansamines](https://github.com/jonathansamines.png)](https://github.com/jonathansamines) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
  + Incorrect reference for server only actions – [![@okisdev](https://github.com/okisdev.png)](https://github.com/okisdev)
  + Improve error message for bad totp code in 2FA setup – [![@DevDuki](https://github.com/DevDuki.png)](https://github.com/DevDuki)
  + Trust device token refresh – [![@gregtjack](https://github.com/gregtjack.png)](https://github.com/gregtjack) [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru) [![@ping-maxwell](https://github.com/ping-maxwell.png)](https://github.com/ping-maxwell)
  + Use constant time equal for otp comparison – [![@Bekacru](https://github.com/Bekacru.png)](https://github.com/Bekacru)
* **types**:
  + Include null in getSession return type – [![@jcajuab](https://github.com/jcajuab.png)](https://github.com/jcajuab)
* **url**:
  + Handle empty and root path in withPath, prevent double slashes, add tests – [![@surafel58](https://github.com/surafel58.png)](https://github.com/surafel58)
* **username**:
  + Username should respect send on sign config – [![@QuintenStr](https://github.com/QuintenStr.png)](https://github.com/QuintenStr)
  + Compacity with `exactOptionalPropertyTypes` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* **vk**:
  + Check for empty email after user profile mapping – [![@ic4l4s9c](https://github.com/ic4l4s9c.png)](https://github.com/ic4l4s9c)

### 🏎 Performance ---

* Improve type `Auth` – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Lazy load create telemetry – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)
* Lazy load create telemetry " – [![@himself65](https://github.com/himself65.png)](https://github.com/himself65)

##### [View changes on GitHub](https://github.com/better-auth/better-auth/compare/v1.3.11...v1.4.0)
