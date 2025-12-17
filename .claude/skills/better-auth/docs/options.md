---
title: "Options | Better Auth"
source_url: "https://www.better-auth.com/docs/reference/options"
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

# Options

Copy MarkdownOpen in

List of all the available options for configuring Better Auth. See [Better Auth Options](https://github.com/better-auth/better-auth/blob/main/packages/core/src/types/init-options.ts).

## [`appName`](https://www.better-auth.com/docs/reference/options.html#appname)

The name of the application.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	appName: "My App",
})
```

## [`baseURL`](https://www.better-auth.com/docs/reference/options.html#baseurl)

Base URL for Better Auth. This is typically the root URL where your application server is hosted. Note: If you include a path in the baseURL, it will take precedence over the default path.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	baseURL: "https://example.com",
})
```

If not explicitly set, the system will check for the environment variable `process.env.BETTER_AUTH_URL`

## [`basePath`](https://www.better-auth.com/docs/reference/options.html#basepath)

Base path for Better Auth. This is typically the path where the Better Auth routes are mounted. It will be overridden if there is a path component within `baseURL`.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	basePath: "/api/auth",
})
```

Default: `/api/auth`

## [`trustedOrigins`](https://www.better-auth.com/docs/reference/options.html#trustedorigins)

List of trusted origins. You can provide a static array of origins, a function that returns origins dynamically, or use wildcard patterns to match multiple domains.

### [Static Origins](https://www.better-auth.com/docs/reference/options.html#static-origins)

You can provide a static array of origins:

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	trustedOrigins: ["http://localhost:3000", "https://example.com"],
})
```

### [Dynamic Origins](https://www.better-auth.com/docs/reference/options.html#dynamic-origins)

You can provide a function that returns origins dynamically:

```
export const auth = betterAuth({
	trustedOrigins: async (request: Request) => {
		// Return an array of trusted origins based on the request
		return ["https://dynamic-origin.com"];
	}
})
```

### [Wildcard Support](https://www.better-auth.com/docs/reference/options.html#wildcard-support)

You can use wildcard patterns in trusted origins:

```
export const auth = betterAuth({
	trustedOrigins: [
		"https://*.example.com", // trust all HTTPS subdomains of example.com
		"http://*.dev.example.com" // trust all HTTP subdomains of dev.example.com
	]
})
```

Make sure to provide the protocol prefix when using wildcard patterns. For example, `https://*.example.com` instead of `*.example.com`.

## [`secret`](https://www.better-auth.com/docs/reference/options.html#secret)

The secret used for encryption, signing, and hashing.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	secret: "your-secret-key",
})
```

By default, Better Auth will look for the following environment variables:

* `process.env.BETTER_AUTH_SECRET`
* `process.env.AUTH_SECRET`

If none of these environment variables are set, it will default to `"better-auth-secret-123456789"`. In production, if it's not set, it will throw an error.

You can generate a good secret using the following command:

```
openssl rand -base64 32
```

## [`database`](https://www.better-auth.com/docs/reference/options.html#database)

Database configuration for Better Auth.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	database: {
		dialect: "postgres",
		type: "postgres",
		casing: "camel"
	},
})
```

Better Auth supports various database configurations including [PostgreSQL](https://www.better-auth.com/docs/adapters/postgresql.html), [MySQL](https://www.better-auth.com/docs/adapters/mysql.html), and [SQLite](https://www.better-auth.com/docs/adapters/sqlite.html).

Read more about databases [here](https://www.better-auth.com/docs/concepts/database.html).

## [`secondaryStorage`](https://www.better-auth.com/docs/reference/options.html#secondarystorage)

Secondary storage configuration used to store session and rate limit data.

```
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	// ... other options
    secondaryStorage: {
    	// Your implementation here
    },
})
```

Read more about secondary storage [here](https://www.better-auth.com/docs/concepts/database.html#secondary-storage).

## [`emailVerification`](https://www.better-auth.com/docs/reference/options.html#emailverification)

Email verification configuration.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }) => {
			// Send verification email to user
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600 // 1 hour
	},
})
```

* `sendVerificationEmail`: Function to send verification email
* `sendOnSignUp`: Send verification email automatically after sign up (default: `false`)
* `sendOnSignIn`: Send verification email automatically on sign in when the user's email is not verified (default: `false`)
* `autoSignInAfterVerification`: Auto sign in the user after they verify their email
* `expiresIn`: Number of seconds the verification token is valid for (default: `3600` seconds)

## [`emailAndPassword`](https://www.better-auth.com/docs/reference/options.html#emailandpassword)

Email and password authentication configuration.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		disableSignUp: false,
		requireEmailVerification: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		autoSignIn: true,
		sendResetPassword: async ({ user, url, token }) => {
			// Send reset password email
		},
		resetPasswordTokenExpiresIn: 3600, // 1 hour
		password: {
			hash: async (password) => {
				// Custom password hashing
				return hashedPassword;
			},
			verify: async ({ hash, password }) => {
				// Custom password verification
				return isValid;
			}
		}
	},
})
```

* `enabled`: Enable email and password authentication (default: `false`)
* `disableSignUp`: Disable email and password sign up (default: `false`)
* `requireEmailVerification`: Require email verification before a session can be created
* `minPasswordLength`: Minimum password length (default: `8`)
* `maxPasswordLength`: Maximum password length (default: `128`)
* `autoSignIn`: Automatically sign in the user after sign up
* `sendResetPassword`: Function to send reset password email
* `resetPasswordTokenExpiresIn`: Number of seconds the reset password token is valid for (default: `3600` seconds)
* `password`: Custom password hashing and verification functions

## [`socialProviders`](https://www.better-auth.com/docs/reference/options.html#socialproviders)

Configure social login providers.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	socialProviders: {
		google: {
			clientId: "your-client-id",
			clientSecret: "your-client-secret",
			redirectURI: "https://example.com/api/auth/callback/google"
		},
		github: {
			clientId: "your-client-id",
			clientSecret: "your-client-secret",
			redirectURI: "https://example.com/api/auth/callback/github"
		}
	},
})
```

## [`plugins`](https://www.better-auth.com/docs/reference/options.html#plugins)

List of Better Auth plugins.

```
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
	plugins: [
		emailOTP({
			sendVerificationOTP: async ({ email, otp, type }) => {
				// Send OTP to user's email
			}
		})
	],
})
```

## [`user`](https://www.better-auth.com/docs/reference/options.html#user)

User configuration options.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	user: {
		modelName: "users",
		fields: {
			email: "emailAddress",
			name: "fullName"
		},
		additionalFields: {
			customField: {
				type: "string",
			}
		},
		changeEmail: {
			enabled: true,
			sendChangeEmailConfirmation: async ({ user, newEmail, url, token }) => {
				// Send change email confirmation to the old email
			},
			updateEmailWithoutVerification: false // Update email without verification if user is not verified
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url, token }) => {
				// Send delete account verification
			},
			beforeDelete: async (user) => {
				// Perform actions before user deletion
			},
			afterDelete: async (user) => {
				// Perform cleanup after user deletion
			}
		}
	},
})
```

* `modelName`: The model name for the user (default: `"user"`)
* `fields`: Map fields to different column names
* `additionalFields`: Additional fields for the user table
* `changeEmail`: Configuration for changing email
* `deleteUser`: Configuration for user deletion

## [`session`](https://www.better-auth.com/docs/reference/options.html#session)

Session configuration options.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	session: {
		modelName: "sessions",
		fields: {
			userId: "user_id"
		},
		expiresIn: 604800, // 7 days
		updateAge: 86400, // 1 day
		disableSessionRefresh: true, // Disable session refresh so that the session is not updated regardless of the `updateAge` option. (default: `false`)
		additionalFields: { // Additional fields for the session table
			customField: {
				type: "string",
			}
		},
		storeSessionInDatabase: true, // Store session in database when secondary storage is provided (default: `false`)
		preserveSessionInDatabase: false, // Preserve session records in database when deleted from secondary storage (default: `false`)
		cookieCache: {
			enabled: true, // Enable caching session in cookie (default: `false`)
			maxAge: 300 // 5 minutes
		}
	},
})
```

* `modelName`: The model name for the session (default: `"session"`)
* `fields`: Map fields to different column names
* `expiresIn`: Expiration time for the session token in seconds (default: `604800` - 7 days)
* `updateAge`: How often the session should be refreshed in seconds (default: `86400` - 1 day)
* `additionalFields`: Additional fields for the session table
* `storeSessionInDatabase`: Store session in database when secondary storage is provided (default: `false`)
* `preserveSessionInDatabase`: Preserve session records in database when deleted from secondary storage (default: `false`)
* `cookieCache`: Enable caching session in cookie

## [`account`](https://www.better-auth.com/docs/reference/options.html#account)

Account configuration options.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	account: {
		modelName: "accounts",
		fields: {
			userId: "user_id"
		},
		encryptOAuthTokens: true, // Encrypt OAuth tokens before storing them in the database
		storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github", "email-password"],
			allowDifferentEmails: false
		}
	},
})
```

* `modelName`: The model name for the account
* `fields`: Map fields to different column names

### [`encryptOAuthTokens`](https://www.better-auth.com/docs/reference/options.html#encryptoauthtokens)

Encrypt OAuth tokens before storing them in the database. Default: `false`.

### [`updateAccountOnSignIn`](https://www.better-auth.com/docs/reference/options.html#updateaccountonsignin)

If enabled (true), the user account data (accessToken, idToken, refreshToken, etc.)
will be updated on sign in with the latest data from the provider.

### [`storeAccountCookie`](https://www.better-auth.com/docs/reference/options.html#storeaccountcookie)

Store account data after OAuth flow in a cookie. This is useful for database-less flows where you want to store account information (access tokens, refresh tokens, etc.) in a cookie instead of the database.

* Default: `false`
* Automatically set to `true` if no database is provided

### [`accountLinking`](https://www.better-auth.com/docs/reference/options.html#accountlinking)

Configuration for account linking.

* `enabled`: Enable account linking (default: `false`)
* `trustedProviders`: List of trusted providers
* `allowDifferentEmails`: Allow users to link accounts with different email addresses
* `allowUnlinkingAll`: Allow users to unlink all accounts

## [`verification`](https://www.better-auth.com/docs/reference/options.html#verification)

Verification configuration options.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	verification: {
		modelName: "verifications",
		fields: {
			userId: "user_id"
		},
		disableCleanup: false
	},
})
```

* `modelName`: The model name for the verification table
* `fields`: Map fields to different column names
* `disableCleanup`: Disable cleaning up expired values when a verification value is fetched

## [`rateLimit`](https://www.better-auth.com/docs/reference/options.html#ratelimit)

Rate limiting configuration.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	rateLimit: {
		enabled: true,
		window: 10,
		max: 100,
		customRules: {
			"/example/path": {
				window: 10,
				max: 100
			}
		},
		storage: "memory",
		modelName: "rateLimit"
	}
})
```

* `enabled`: Enable rate limiting (defaults: `true` in production, `false` in development)
* `window`: Time window to use for rate limiting. The value should be in seconds. (default: `10`)
* `max`: The default maximum number of requests allowed within the window. (default: `100`)
* `customRules`: Custom rate limit rules to apply to specific paths.
* `storage`: Storage configuration. If you passed a secondary storage, rate limiting will be stored in the secondary storage. (options: `"memory", "database", "secondary-storage"`, default: `"memory"`)
* `modelName`: The name of the table to use for rate limiting if database is used as storage. (default: `"rateLimit"`)

## [`advanced`](https://www.better-auth.com/docs/reference/options.html#advanced)

Advanced configuration options.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	advanced: {
		ipAddress: {
			ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
			disableIpTracking: false
		},
		useSecureCookies: true,
		disableCSRFCheck: false,
		crossSubDomainCookies: {
			enabled: true,
			additionalCookies: ["custom_cookie"],
			domain: "example.com"
		},
		cookies: {
			session_token: {
				name: "custom_session_token",
				attributes: {
					httpOnly: true,
					secure: true
				}
			}
		},
		defaultCookieAttributes: {
			httpOnly: true,
			secure: true
		},
		// OAuth state configuration has been moved to account option
		// Use account.storeStateStrategy and account.skipStateCookieCheck instead
		cookiePrefix: "myapp",
		database: {
			// Use your own custom ID generator,
			// disable generating IDS so your database will generate them,
			// or use "serial" to use your database's auto-incrementing ID, or "uuid" to use a random UUID.
			generateId: (((options: {
				model: LiteralUnion<Models, string>;
				size?: number;
			}) => {
				return "my-super-unique-id";
			})) | false | "serial" | "uuid",
			defaultFindManyLimit: 100,
			experimentalJoins: false,
		}
	},
})
```

* `ipAddress`: IP address configuration for rate limiting and session tracking
* `useSecureCookies`: Use secure cookies (default: `false`)
* `disableCSRFCheck`: Disable trusted origins check (⚠️ security risk)
* `crossSubDomainCookies`: Configure cookies to be shared across subdomains
* `cookies`: Customize cookie names and attributes
* `defaultCookieAttributes`: Default attributes for all cookies
* `cookiePrefix`: Prefix for cookies
* `database`: Database configuration options
* OAuth state configuration options (`storeStateStrategy`, `skipStateCookieCheck`) are now part of the `account` option

## [`logger`](https://www.better-auth.com/docs/reference/options.html#logger)

Logger configuration for Better Auth.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	logger: {
		disabled: false,
		disableColors: false,
		level: "error",
		log: (level, message, ...args) => {
			// Custom logging implementation
			console.log(`[${level}] ${message}`, ...args);
		}
	}
})
```

The logger configuration allows you to customize how Better Auth handles logging. It supports the following options:

* `disabled`: Disable all logging when set to `true` (default: `false`)
* `disableColors`: Disable colors in the default logger implementation (default: determined by the terminal's color support)
* `level`: Set the minimum log level to display. Available levels are:
  + `"info"`: Show all logs
  + `"warn"`: Show warnings and errors
  + `"error"`: Show only errors
  + `"debug"`: Show all logs including debug information
* `log`: Custom logging function that receives:
  + `level`: The log level (`"info"`, `"warn"`, `"error"`, or `"debug"`)
  + `message`: The log message
  + `...args`: Additional arguments passed to the logger

Example with custom logging:

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	logger: {
		level: "info",
		log: (level, message, ...args) => {
			// Send logs to a custom logging service
			myLoggingService.log({
				level,
				message,
				metadata: args,
				timestamp: new Date().toISOString()
			});
		}
	}
})
```

## [`databaseHooks`](https://www.better-auth.com/docs/reference/options.html#databasehooks)

Database lifecycle hooks for core operations.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					// Modify user data before creation
					return { data: { ...user, customField: "value" } };
				},
				after: async (user) => {
					// Perform actions after user creation
				}
			},
			update: {
				before: async (userData) => {
					// Modify user data before update
					return { data: { ...userData, updatedAt: new Date() } };
				},
				after: async (user) => {
					// Perform actions after user update
				}
			}
		},
		session: {
			// Session hooks
		},
		account: {
			// Account hooks
		},
		verification: {
			// Verification hooks
		}
	},
})
```

## [`onAPIError`](https://www.better-auth.com/docs/reference/options.html#onapierror)

API error handling configuration.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	onAPIError: {
		throw: true,
		onError: (error, ctx) => {
			// Custom error handling
			console.error("Auth error:", error);
		},
		errorURL: "/auth/error",
		customizeDefaultErrorPage: {
			colors: {
				background: "#ffffff",
				foreground: "#000000",
				primary: "#0070f3",
				primaryForeground: "#ffffff",
				mutedForeground: "#666666",
				border: "#e0e0e0",
				destructive: "#ef4444",
				titleBorder: "#0070f3",
				titleColor: "#000000",
				gridColor: "#f0f0f0",
				cardBackground: "#ffffff",
				cornerBorder: "#0070f3"
			},
			size: {
				radiusSm: "0.25rem",
				radiusMd: "0.5rem",
				radiusLg: "1rem",
				textSm: "0.875rem",
				text2xl: "1.5rem",
				text4xl: "2.25rem",
				text6xl: "3.75rem"
			},
			font: {
				defaultFamily: "system-ui, sans-serif",
				monoFamily: "monospace"
			},
			disableTitleBorder: false,
			disableCornerDecorations: false,
			disableBackgroundGrid: false
		}
	},
})
```

* `throw`: Throw an error on API error (default: `false`)
* `onError`: Custom error handler
* `errorURL`: URL to redirect to on error (default: `/api/auth/error`)
* `customizeDefaultErrorPage`: Configure the default error page provided by Better Auth. Start your dev server and go to `/api/auth/error` to see the error page.
  + `colors`: Customize color scheme for the error page
    - `background`: Background color
    - `foreground`: Foreground/text color
    - `primary`: Primary accent color
    - `primaryForeground`: Text color on primary background
    - `mutedForeground`: Muted text color
    - `border`: Border color
    - `destructive`: Error/destructive color
    - `titleBorder`: Border color for the title
    - `titleColor`: Title text color
    - `gridColor`: Background grid color
    - `cardBackground`: Card background color
    - `cornerBorder`: Corner decoration border color
  + `size`: Customize sizing and spacing
    - `radiusSm`: Small border radius
    - `radiusMd`: Medium border radius
    - `radiusLg`: Large border radius
    - `textSm`: Small text size
    - `text2xl`: 2xl text size
    - `text4xl`: 4xl text size
    - `text6xl`: 6xl text size
  + `font`: Customize font families
    - `defaultFamily`: Default font family
    - `monoFamily`: Monospace font family
  + `disableTitleBorder`: Disable the border around the title (default: `false`)
  + `disableCornerDecorations`: Disable corner decorations (default: `false`)
  + `disableBackgroundGrid`: Disable the background grid pattern (default: `false`)

## [`hooks`](https://www.better-auth.com/docs/reference/options.html#hooks)

Request lifecycle hooks.

```
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			// Execute before processing the request
			console.log("Request path:", ctx.path);
		}),
		after: createAuthMiddleware(async (ctx) => {
			// Execute after processing the request
			console.log("Response:", ctx.context.returned);
		})
	},
})
```

For more details and examples, see the [Hooks documentation](https://www.better-auth.com/docs/concepts/hooks.html).

## [`disabledPaths`](https://www.better-auth.com/docs/reference/options.html#disabledpaths)

Disable specific auth paths.

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
	disabledPaths: ["/sign-up/email", "/sign-in/email"],
})
```

## [`telemetry`](https://www.better-auth.com/docs/reference/options.html#telemetry)

Enable or disable Better Auth's telemetry collection. (default: `false`)

```
import { betterAuth } from "better-auth";
export const auth = betterAuth({
  telemetry: {
    enabled: false,
  }
})
```

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/reference/options.mdx)

[Previous Page

WorkOS Migration Guide](https://www.better-auth.com/docs/guides/workos-migration-guide.html)[Next Page

Contributing](https://www.better-auth.com/docs/reference/contributing.html)

### On this page

[`appName`](https://www.better-auth.com/docs/reference/options.html#appname)[`baseURL`](https://www.better-auth.com/docs/reference/options.html#baseurl)[`basePath`](https://www.better-auth.com/docs/reference/options.html#basepath)[`trustedOrigins`](https://www.better-auth.com/docs/reference/options.html#trustedorigins)[Static Origins](https://www.better-auth.com/docs/reference/options.html#static-origins)[Dynamic Origins](https://www.better-auth.com/docs/reference/options.html#dynamic-origins)[Wildcard Support](https://www.better-auth.com/docs/reference/options.html#wildcard-support)[`secret`](https://www.better-auth.com/docs/reference/options.html#secret)[`database`](https://www.better-auth.com/docs/reference/options.html#database)[`secondaryStorage`](https://www.better-auth.com/docs/reference/options.html#secondarystorage)[`emailVerification`](https://www.better-auth.com/docs/reference/options.html#emailverification)[`emailAndPassword`](https://www.better-auth.com/docs/reference/options.html#emailandpassword)[`socialProviders`](https://www.better-auth.com/docs/reference/options.html#socialproviders)[`plugins`](https://www.better-auth.com/docs/reference/options.html#plugins)[`user`](https://www.better-auth.com/docs/reference/options.html#user)[`session`](https://www.better-auth.com/docs/reference/options.html#session)[`account`](https://www.better-auth.com/docs/reference/options.html#account)[`encryptOAuthTokens`](https://www.better-auth.com/docs/reference/options.html#encryptoauthtokens)[`updateAccountOnSignIn`](https://www.better-auth.com/docs/reference/options.html#updateaccountonsignin)[`storeAccountCookie`](https://www.better-auth.com/docs/reference/options.html#storeaccountcookie)[`accountLinking`](https://www.better-auth.com/docs/reference/options.html#accountlinking)[`verification`](https://www.better-auth.com/docs/reference/options.html#verification)[`rateLimit`](https://www.better-auth.com/docs/reference/options.html#ratelimit)[`advanced`](https://www.better-auth.com/docs/reference/options.html#advanced)[`logger`](https://www.better-auth.com/docs/reference/options.html#logger)[`databaseHooks`](https://www.better-auth.com/docs/reference/options.html#databasehooks)[`onAPIError`](https://www.better-auth.com/docs/reference/options.html#onapierror)[`hooks`](https://www.better-auth.com/docs/reference/options.html#hooks)[`disabledPaths`](https://www.better-auth.com/docs/reference/options.html#disabledpaths)[`telemetry`](https://www.better-auth.com/docs/reference/options.html#telemetry)

Ask AI
