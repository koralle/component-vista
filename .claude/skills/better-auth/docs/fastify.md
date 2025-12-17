---
title: "Better Auth Fastify Integration Guide | Better Auth"
source_url: "https://www.better-auth.com/docs/integrations/fastify"
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

# Better Auth Fastify Integration Guide

Copy MarkdownOpen in

This guide provides step-by-step instructions for configuring both essential handlers and CORS settings.

A configured Better Auth instance is required before proceeding. If you haven't set this up yet, please consult our [Installation Guide](https://www.better-auth.com/docs/installation.html).

### [Prerequisites](https://www.better-auth.com/docs/integrations/fastify.html#prerequisites)

Verify the following requirements before integration:

* **Node.js Environment**: v16 or later installed
* **ES Module Support**: Enable ES modules in either:
  + `package.json`: `{ "type": "module" }`
  + TypeScript `tsconfig.json`: `{ "module": "ESNext" }`
* **Fastify Dependencies**:

  npmpnpmyarnbun

  ```
  npm install fastify @fastify/cors
  ```

For TypeScript: Ensure your `tsconfig.json` includes `"esModuleInterop": true` for optimal compatibility.

### [Authentication Handler Setup](https://www.better-auth.com/docs/integrations/fastify.html#authentication-handler-setup)

Configure Better Auth to process authentication requests by creating a catch-all route:

server.ts

```
import Fastify from "fastify";
import { auth } from "./auth"; // Your configured Better Auth instance

const fastify = Fastify({ logger: true });

// Register authentication endpoint
fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);

      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });

      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      // Process authentication request
      const response = await auth.handler(req);

      // Forward response to client
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);

    } catch (error) {
      fastify.log.error("Authentication Error:", error);
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE"
      });
    }
  }
});

// Initialize server
fastify.listen({ port: 4000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 4000");
});
```

### [Trusted origins](https://www.better-auth.com/docs/integrations/fastify.html#trusted-origins)

When a request is made from a different origin, the request will be blocked by default. You can add trusted origins to the `auth` instance.

```
export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000", "https://example.com"],
});
```

### [Configuring CORS](https://www.better-auth.com/docs/integrations/fastify.html#configuring-cors)

Secure your API endpoints with proper CORS configuration:

```
import fastifyCors from "@fastify/cors";

// Configure CORS policies
fastify.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],
  credentials: true,
  maxAge: 86400
});

// Mount authentication handler after CORS registration
// (Use previous handler configuration here)
```

Always restrict CORS origins in production environments. Use environment variables for dynamic configuration.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/integrations/fastify.mdx)

[Previous Page

Hono](https://www.better-auth.com/docs/integrations/hono.html)[Next Page

Express](https://www.better-auth.com/docs/integrations/express.html)

### On this page

[Prerequisites](https://www.better-auth.com/docs/integrations/fastify.html#prerequisites)[Authentication Handler Setup](https://www.better-auth.com/docs/integrations/fastify.html#authentication-handler-setup)[Trusted origins](https://www.better-auth.com/docs/integrations/fastify.html#trusted-origins)[Configuring CORS](https://www.better-auth.com/docs/integrations/fastify.html#configuring-cors)

Ask AI
