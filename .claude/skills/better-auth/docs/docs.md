---
title: "Introduction | Better Auth"
source_url: "https://www.better-auth.com/docs"
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

# Introduction

Better Auth is a framework-agnostic, universal authentication and authorization framework for TypeScript. It provides a comprehensive set of features out of the box and includes a plugin ecosystem that simplifies adding advanced functionalities. Whether you need 2FA, passkey, multi-tenancy, multi-session support, or even enterprise features like SSO, creating your own IDP, it lets you focus on building your application instead of reinventing the wheel.

## [Features](https://www.better-auth.com/docs.html#features)

Better Auth aims to be the most comprehensive auth library. It provides a wide range of features out of the box and allows you to extend it with plugins. Here are some of the features:

Framework Agnostic

Support for most popular frameworks

Email & Password

Built-in support for secure email and password authentication

Account & Session Management

Manage user accounts and sessions with ease

Built-In Rate Limiter

Built-in rate limiter with custom rules

Automatic Database Management

Automatic database management and migrations

Social Sign-on

Multiple social sign-on providers

Organization & Access Control

Manage organizations and access control

Two Factor Authentication

Secure your users with two factor authentication

Plugin Ecosystem

Even more capabilities with plugins

...and much more!

---

## [AI tooling](https://www.better-auth.com/docs.html#ai-tooling)

### [LLMs.txt](https://www.better-auth.com/docs.html#llmstxt)

Better Auth exposes an `LLMs.txt` that helps AI models understand how to integrate and interact with your authentication system. See it at <https://better-auth.com/llms.txt>.

### [MCP](https://www.better-auth.com/docs.html#mcp)

Better Auth provides an MCP server so you can use it with any AI model that supports the Model Context Protocol (MCP).

[![Add Better Auth MCP to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=Better%20Auth&config=eyJ1cmwiOiJodHRwczovL21jcC5jaG9ua2llLmFpL2JldHRlci1hdXRoL2JldHRlci1hdXRoLWJ1aWxkZXIvbWNwIn0%3D)[![Add Better Auth MCP to Cursor](https://cursor.com/deeplink/mcp-install-light.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=Better%20Auth&config=eyJ1cmwiOiJodHRwczovL21jcC5jaG9ua2llLmFpL2JldHRlci1hdXRoL2JldHRlci1hdXRoLWJ1aWxkZXIvbWNwIn0%3D)

#### [CLI Options](https://www.better-auth.com/docs.html#cli-options)

Use the Better Auth CLI to easily add the MCP server to your preferred client:

CursorClaude CodeOpen CodeManual

terminal

```
npx @better-auth/cli mcp --cursor
```

terminal

```
npx @better-auth/cli mcp --claude-code
```

terminal

```
npx @better-auth/cli mcp --open-code
```

terminal

```
npx @better-auth/cli mcp --manual
```

#### [Manual Configuration](https://www.better-auth.com/docs.html#manual-configuration)

Alternatively, you can manually configure the MCP server for each client:

Claude CodeOpen CodeManual

terminal

```
claude mcp add --transport http better-auth https://mcp.chonkie.ai/better-auth/better-auth-builder/mcp
```

opencode.json

```
  {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
          "Better Auth": {
              "type": "remote",
              "url": "https://mcp.chonkie.ai/better-auth/better-auth-builder/mcp",
              "enabled": true,
          }
      }
  }
```

mcp.json

```
{
   "Better Auth": {
       "url": "https://mcp.chonkie.ai/better-auth/better-auth-builder/mcp"
   }
}
```

We provide a first‑party MCP, powered by [Chonkie](https://chonkie.ai). You can alternatively use [`context7`](https://context7.com/) and other MCP providers.

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/introduction.mdx)

[Next Page

Comparison](https://www.better-auth.com/docs/comparison.html)

### On this page

[Features](https://www.better-auth.com/docs.html#features)[AI tooling](https://www.better-auth.com/docs.html#ai-tooling)[LLMs.txt](https://www.better-auth.com/docs.html#llmstxt)[MCP](https://www.better-auth.com/docs.html#mcp)[CLI Options](https://www.better-auth.com/docs.html#cli-options)[Manual Configuration](https://www.better-auth.com/docs.html#manual-configuration)

Ask AI
