---
title: "Expo Integration | Better Auth"
source_url: "https://www.better-auth.com/docs/integrations/expo"
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

# Expo Integration

Copy MarkdownOpen in

Expo is a popular framework for building cross-platform apps with React Native. Better Auth supports both Expo native and web apps.

## [Installation](https://www.better-auth.com/docs/integrations/expo.html#installation)

## [Configure A Better Auth Backend](https://www.better-auth.com/docs/integrations/expo.html#configure-a-better-auth-backend)

Before using Better Auth with Expo, make sure you have a Better Auth backend set up. You can either use a separate server or leverage Expo's new [API Routes](https://docs.expo.dev/router/reference/api-routes) feature to host your Better Auth instance.

To get started, check out our [installation](https://www.better-auth.com/docs/installation.html) guide for setting up Better Auth on your server. If you prefer to check out the full example, you can find it [here](https://github.com/better-auth/examples/tree/main/expo-example).

To use the new API routes feature in Expo to host your Better Auth instance you can create a new API route in your Expo app and mount the Better Auth handler.

app/api/auth/[...auth]+api.ts

```
import { auth } from "@/lib/auth"; // import Better Auth handler

const handler = auth.handler;
export { handler as GET, handler as POST }; // export handler for both GET and POST requests
```

## [Install Server Dependencies](https://www.better-auth.com/docs/integrations/expo.html#install-server-dependencies)

Install both the Better Auth package and Expo plugin into your server application.

npmpnpmyarnbun

```
npm install better-auth @better-auth/expo
```

## [Install Client Dependencies](https://www.better-auth.com/docs/integrations/expo.html#install-client-dependencies)

You also need to install both the Better Auth package and Expo plugin into your Expo application.

npmpnpmyarnbun

```
npm install better-auth @better-auth/expo
```

If you plan on using our social integrations (Google, Apple etc.) then there are a few more dependencies that are required in your Expo app. In the default Expo template these are already installed so you may be able to skip this step if you have these dependencies already.

npmpnpmyarnbun

```
npm install expo-linking expo-web-browser expo-constants
```

## [Add the Expo Plugin on Your Server](https://www.better-auth.com/docs/integrations/expo.html#add-the-expo-plugin-on-your-server)

Add the Expo plugin to your Better Auth server.

lib/auth.ts

```
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
    plugins: [expo()],
    emailAndPassword: {
        enabled: true, // Enable authentication using email and password.
      },
});
```

## [Initialize Better Auth Client](https://www.better-auth.com/docs/integrations/expo.html#initialize-better-auth-client)

To initialize Better Auth in your Expo app, you need to call `createAuthClient` with the base URL of your Better Auth backend. Make sure to import the client from `/react`.

Make sure you install the `expo-secure-store` package into your Expo app. This is used to store the session data and cookies securely.

npmpnpmyarnbun

```
npm install expo-secure-store
```

You need to also import client plugin from `@better-auth/expo/client` and pass it to the `plugins` array when initializing the auth client.

This is important because:

* **Social Authentication Support:** enables social auth flows by handling authorization URLs and callbacks within the Expo web browser.
* **Secure Cookie Management:** stores cookies securely and automatically adds them to the headers of your auth requests.

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://localhost:8081", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "myapp",
            storagePrefix: "myapp",
            storage: SecureStore,
        })
    ]
});
```

Be sure to include the full URL, including the path, if you've changed the default path from `/api/auth`.

## [Scheme and Trusted Origins](https://www.better-auth.com/docs/integrations/expo.html#scheme-and-trusted-origins)

Better Auth uses deep links to redirect users back to your app after authentication. To enable this, you need to add your app's scheme to the `trustedOrigins` list in your Better Auth config.

First, make sure you have a scheme defined in your `app.json` file.

app.json

```
{
    "expo": {
        "scheme": "myapp"
    }
}
```

Then, update your Better Auth config to include the scheme in the `trustedOrigins` list.

auth.ts

```
export const auth = betterAuth({
    trustedOrigins: ["myapp://"]
})
```

If you have multiple schemes or need to support deep linking with various paths, you can use specific patterns or wildcards:

auth.ts

```
export const auth = betterAuth({
    trustedOrigins: [
        // Basic scheme
        "myapp://",

        // Production & staging schemes
        "myapp-prod://",
        "myapp-staging://",

        // Wildcard support for all paths following the scheme
        "myapp://*"
    ]
})
```

### [Development Mode](https://www.better-auth.com/docs/integrations/expo.html#development-mode)

During development, Expo uses the `exp://` scheme with your device's local IP address. To support this, you can use wildcards to match common local IP ranges:

auth.ts

```
export const auth = betterAuth({
    trustedOrigins: [
        "myapp://",

        // Development mode - Expo's exp:// scheme with local IP ranges
        ...(process.env.NODE_ENV === "development" ? [
            "exp://*/*",                 // Trust all Expo development URLs
            "exp://10.0.0.*:*/*",        // Trust 10.0.0.x IP range
            "exp://192.168.*.*:*/*",     // Trust 192.168.x.x IP range
            "exp://172.*.*.*:*/*",       // Trust 172.x.x.x IP range
            "exp://localhost:*/*"        // Trust localhost
        ] : [])
    ]
})
```

The wildcard patterns for `exp://` should only be used in development. In production, use your app's specific scheme (e.g., `myapp://`).

## [Configure Metro Bundler](https://www.better-auth.com/docs/integrations/expo.html#configure-metro-bundler)

To resolve Better Auth exports you'll need to enable `unstable_enablePackageExports` in your metro config.

metro.config.js

```
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname)

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
```

In case you don't have a `metro.config.js` file in your project run `npx expo customize metro.config.js`.

If you can't enable `unstable_enablePackageExports` option, you can use [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) to manually resolve the paths.

babel.config.js

```
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "better-auth/react": "./node_modules/better-auth/dist/client/react/index.cjs",
                        "better-auth/client/plugins": "./node_modules/better-auth/dist/client/plugins/index.cjs",
                        "@better-auth/expo/client": "./node_modules/@better-auth/expo/dist/client.cjs",
                    },
                },
            ],
        ],
    }
}
```

In case you don't have a `babel.config.js` file in your project run `npx expo customize babel.config.js`.

Don't forget to clear the cache after making changes.

```
npx expo start --clear
```

## [Usage](https://www.better-auth.com/docs/integrations/expo.html#usage)

### [Authenticating Users](https://www.better-auth.com/docs/integrations/expo.html#authenticating-users)

With Better Auth initialized, you can now use the `authClient` to authenticate users in your Expo app.

sign-insign-up

app/sign-in.tsx

```
import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await authClient.signIn.email({
            email,
            password,
        })
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
```

app/sign-up.tsx

```
import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await authClient.signUp.email({
                email,
                password,
                name
        })
    };

    return (
        <View>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
```

#### [Social Sign-In](https://www.better-auth.com/docs/integrations/expo.html#social-sign-in)

For social sign-in, you can use the `authClient.signIn.social` method with the provider name and a callback URL.

app/social-sign-in.tsx

```
import { Button } from "react-native";

export default function SocialSignIn() {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard" // this will be converted to a deep link (eg. `myapp://dashboard`) on native
        })
    };
    return <Button title="Login with Google" onPress={handleLogin} />;
}
```

#### [IdToken Sign-In](https://www.better-auth.com/docs/integrations/expo.html#idtoken-sign-in)

If you want to make provider request on the mobile device and then verify the ID token on the server, you can use the `authClient.signIn.social` method with the `idToken` option.

app/social-sign-in.tsx

```
import { Button } from "react-native";

export default function SocialSignIn() {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider: "google", // only google, apple and facebook are supported for idToken signIn
            idToken: {
                token: "...", // ID token from provider
                nonce: "...", // nonce from provider (optional)
            }
            callbackURL: "/dashboard" // this will be converted to a deep link (eg. `myapp://dashboard`) on native
        })
    };
    return <Button title="Login with Google" onPress={handleLogin} />;
}
```

### [Session](https://www.better-auth.com/docs/integrations/expo.html#session)

Better Auth provides a `useSession` hook to access the current user's session in your app.

app/index.tsx

```
import { Text } from "react-native";
import { authClient } from "@/lib/auth-client";

export default function Index() {
    const { data: session } = authClient.useSession();

    return <Text>Welcome, {session?.user.name}</Text>;
}
```

On native, the session data will be cached in SecureStore. This will allow you to remove the need for a loading spinner when the app is reloaded. You can disable this behavior by passing the `disableCache` option to the client.

### [Making Authenticated Requests to Your Server](https://www.better-auth.com/docs/integrations/expo.html#making-authenticated-requests-to-your-server)

To make authenticated requests to your server that require the user's session, you have to retrieve the session cookie from `SecureStore` and manually add it to your request headers.

```
import { authClient } from "@/lib/auth-client";

const makeAuthenticatedRequest = async () => {
  const cookies = authClient.getCookie();
  const headers = {
    "Cookie": cookies,
  };
  const response = await fetch("http://localhost:8081/api/secure-endpoint", {
    headers,
    // 'include' can interfere with the cookies we just set manually in the headers
    credentials: "omit"
  });
  const data = await response.json();
  return data;
};
```

**Example: Usage With TRPC**

lib/trpc-provider.tsx

```
//...other imports
import { authClient } from "@/lib/auth-client";

export const api = createTRPCReact<AppRouter>();

export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          //...your other options
          headers() {
            const headers = new Map<string, string>();
            const cookies = authClient.getCookie();
            if (cookies) {
              headers.set("Cookie", cookies);
            }
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
```

## [Options](https://www.better-auth.com/docs/integrations/expo.html#options)

### [Expo Client](https://www.better-auth.com/docs/integrations/expo.html#expo-client)

**storage**: the storage mechanism used to cache the session data and cookies.

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import SecureStorage from "expo-secure-store";

const authClient = createAuthClient({
    baseURL: "http://localhost:8081",
    plugins: [
        expoClient({
            storage: SecureStorage,
            // ...
        })
    ],
});
```

**scheme**: scheme is used to deep link back to your app after a user has authenticated using oAuth providers. By default, Better Auth tries to read the scheme from the `app.json` file. If you need to override this, you can pass the scheme option to the client.

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";

const authClient = createAuthClient({
    baseURL: "http://localhost:8081",
    plugins: [
        expoClient({
            scheme: "myapp",
            // ...
        }),
    ],
});
```

**disableCache**: By default, the client will cache the session data in SecureStore. You can disable this behavior by passing the `disableCache` option to the client.

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";

const authClient = createAuthClient({
    baseURL: "http://localhost:8081",
    plugins: [
        expoClient({
            disableCache: true,
            // ...
        }),
    ],
});
```

**cookiePrefix**: Prefix(es) for server cookie names to identify which cookies belong to better-auth. This prevents infinite refetching when third-party cookies are set. Can be a single string or an array of strings to match multiple prefixes. Defaults to `"better-auth"`.

lib/auth-client.ts

```
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

const authClient = createAuthClient({
    baseURL: "http://localhost:8081",
    plugins: [
        expoClient({
            storage: SecureStore,
            // Single prefix
            cookiePrefix: "better-auth"
        })
    ]
});
```

You can also provide multiple prefixes to match cookies from different authentication systems:

lib/auth-client.ts

```
const authClient = createAuthClient({
    baseURL: "http://localhost:8081",
    plugins: [
        expoClient({
            storage: SecureStore,
            // Multiple prefixes
            cookiePrefix: ["better-auth", "my-app", "custom-auth"]
        })
    ]
});
```

**Important:** If you're using plugins like passkey with a custom `webAuthnChallengeCookie` option, make sure to include the cookie prefix in the `cookiePrefix` array. For example, if you set `webAuthnChallengeCookie: "my-app-passkey"`, include `"my-app"` in your `cookiePrefix`. See the [Passkey plugin documentation](https://www.better-auth.com/docs/plugins/passkey.html#expo-integration) for more details.

### [Expo Servers](https://www.better-auth.com/docs/integrations/expo.html#expo-servers)

Server plugin options:

**disableOriginOverride**: Override the origin for Expo API routes (default: false). Enable this if you're facing cors origin issues with Expo API routes.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/integrations/expo.mdx)

[Previous Page

Mobile & Desktop](https://www.better-auth.com/docs/integrations/expo.html)[Next Page

Lynx](https://www.better-auth.com/docs/integrations/lynx.html)

### On this page

[Installation](https://www.better-auth.com/docs/integrations/expo.html#installation)[Configure A Better Auth Backend](https://www.better-auth.com/docs/integrations/expo.html#configure-a-better-auth-backend)[Install Server Dependencies](https://www.better-auth.com/docs/integrations/expo.html#install-server-dependencies)[Install Client Dependencies](https://www.better-auth.com/docs/integrations/expo.html#install-client-dependencies)[Add the Expo Plugin on Your Server](https://www.better-auth.com/docs/integrations/expo.html#add-the-expo-plugin-on-your-server)[Initialize Better Auth Client](https://www.better-auth.com/docs/integrations/expo.html#initialize-better-auth-client)[Scheme and Trusted Origins](https://www.better-auth.com/docs/integrations/expo.html#scheme-and-trusted-origins)[Development Mode](https://www.better-auth.com/docs/integrations/expo.html#development-mode)[Configure Metro Bundler](https://www.better-auth.com/docs/integrations/expo.html#configure-metro-bundler)[Usage](https://www.better-auth.com/docs/integrations/expo.html#usage)[Authenticating Users](https://www.better-auth.com/docs/integrations/expo.html#authenticating-users)[Social Sign-In](https://www.better-auth.com/docs/integrations/expo.html#social-sign-in)[IdToken Sign-In](https://www.better-auth.com/docs/integrations/expo.html#idtoken-sign-in)[Session](https://www.better-auth.com/docs/integrations/expo.html#session)[Making Authenticated Requests to Your Server](https://www.better-auth.com/docs/integrations/expo.html#making-authenticated-requests-to-your-server)[Options](https://www.better-auth.com/docs/integrations/expo.html#options)[Expo Client](https://www.better-auth.com/docs/integrations/expo.html#expo-client)[Expo Servers](https://www.better-auth.com/docs/integrations/expo.html#expo-servers)

Ask AI
