---
title: "Contributing to BetterAuth | Better Auth"
source_url: "https://www.better-auth.com/docs/reference/contributing"
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

# Contributing to BetterAuth

Copy MarkdownOpen in

Thank you for your interest in contributing to Better Auth! This guide is a concise guide to contributing to Better Auth.

## [Getting Started](https://www.better-auth.com/docs/reference/contributing.html#getting-started)

Before diving in, here are a few important resources:

* Take a look at our existing [issues](https://github.com/better-auth/better-auth/issues) and [pull requests](https://github.com/better-auth/better-auth/pulls)
* Join our community discussions in [Discord](https://discord.gg/better-auth)

## [Development Setup](https://www.better-auth.com/docs/reference/contributing.html#development-setup)

To get started with development:

Make sure you have [Node.JS](https://nodejs.org/en/download)
installed, preferably on LTS.

### [1. Fork the repository](https://www.better-auth.com/docs/reference/contributing.html#1-fork-the-repository)

Visit <https://github.com/better-auth/better-auth>

Click the "Fork" button in the top right.

### [2. Clone your fork](https://www.better-auth.com/docs/reference/contributing.html#2-clone-your-fork)

```
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/better-auth.git
cd better-auth
```

### [3. Install dependencies](https://www.better-auth.com/docs/reference/contributing.html#3-install-dependencies)

Make sure you have [pnpm](https://pnpm.io/installation) installed!

```
pnpm install
```

### [4. Prepare ENV files](https://www.better-auth.com/docs/reference/contributing.html#4-prepare-env-files)

Copy the example env file to create your new `.env` file.

```
cp -n ./docs/.env.example ./docs/.env
```

## [Making changes](https://www.better-auth.com/docs/reference/contributing.html#making-changes)

Once you have an idea of what you want to contribute, you can start making changes. Here are some steps to get started:

### [1. Create a new branch](https://www.better-auth.com/docs/reference/contributing.html#1-create-a-new-branch)

```
# Make sure you're on main
git checkout main

# Pull latest changes
git pull upstream main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

### [2. Start development server](https://www.better-auth.com/docs/reference/contributing.html#2-start-development-server)

Start the development server:

```
pnpm dev
```

To start the docs server:

```
pnpm -F docs dev
```

### [3. Make Your Changes](https://www.better-auth.com/docs/reference/contributing.html#3-make-your-changes)

* Make your changes to the codebase.
* Write tests if needed. (Read more about testing [here](https://www.better-auth.com/docs/reference/contributing.html#testing))
* Update documentation. (Read more about documenting [here](https://www.better-auth.com/docs/reference/contributing.html#documentation))

### [Issues and Bug Fixes](https://www.better-auth.com/docs/reference/contributing.html#issues-and-bug-fixes)

* Check our [GitHub issues](https://github.com/better-auth/better-auth/issues) for tasks labeled `good first issue`
* When reporting bugs, include steps to reproduce and expected behavior
* Comment on issues you'd like to work on to avoid duplicate efforts

### [Framework Integrations](https://www.better-auth.com/docs/reference/contributing.html#framework-integrations)

We welcome contributions to support more frameworks:

* Focus on framework-agnostic solutions where possible
* Keep integrations minimal and maintainable
* All integrations currently live in the main package

### [Plugin Development](https://www.better-auth.com/docs/reference/contributing.html#plugin-development)

* For core plugins: Open an issue first to discuss your idea
* For community plugins: Feel free to develop independently
* Follow our plugin architecture guidelines

### [Documentation](https://www.better-auth.com/docs/reference/contributing.html#documentation)

* Fix typos and errors
* Add examples and clarify existing content
* Ensure documentation is up to date with code changes

## [Testing](https://www.better-auth.com/docs/reference/contributing.html#testing)

We use Vitest for testing. Place test files next to the source files they test:

```
import { describe, it, expect } from "vitest";
import { getTestInstance } from "./test-utils/test-instance";

describe("Feature", () => {
    it("should work as expected", async () => {
        const { client } = await getTestInstance();
        // Test code here
        expect(result).toBeDefined();
    });
});
```

### [Using the Test Instance Helper](https://www.better-auth.com/docs/reference/contributing.html#using-the-test-instance-helper)

The test instance helper now includes improved async context support for managing user sessions:

```
const { client, runWithUser, signInWithTestUser } = await getTestInstance();

// Run tests with a specific user context
await runWithUser("user@example.com", "password", async (headers) => {
    // All client calls within this block will use the user's session
    const response = await client.getSession();
    // headers are automatically applied
});

// Or use the test user with async context
const { runWithDefaultUser } = await signInWithTestUser();
await runWithDefaultUser(async (headers) => {
    // Code here runs with the test user's session context
});
```

### [Testing Best Practices](https://www.better-auth.com/docs/reference/contributing.html#testing-best-practices)

* Write clear commit messages
* Update documentation to reflect your changes
* Add tests for new features
* Follow our coding standards
* Keep pull requests focused on a single change

## [Need Help?](https://www.better-auth.com/docs/reference/contributing.html#need-help)

Don't hesitate to ask for help! You can:

* Open an [issue](https://github.com/better-auth/better-auth/issues) with questions
* Join our [community discussions](https://discord.gg/better-auth)
* Reach out to project maintainers

Thank you for contributing to Better Auth!

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/reference/contributing.mdx)

[Previous Page

Options](https://www.better-auth.com/docs/reference/options.html)[Next Page

Resources](https://www.better-auth.com/docs/reference/resources.html)

### On this page

[Getting Started](https://www.better-auth.com/docs/reference/contributing.html#getting-started)[Development Setup](https://www.better-auth.com/docs/reference/contributing.html#development-setup)[1. Fork the repository](https://www.better-auth.com/docs/reference/contributing.html#1-fork-the-repository)[2. Clone your fork](https://www.better-auth.com/docs/reference/contributing.html#2-clone-your-fork)[3. Install dependencies](https://www.better-auth.com/docs/reference/contributing.html#3-install-dependencies)[4. Prepare ENV files](https://www.better-auth.com/docs/reference/contributing.html#4-prepare-env-files)[Making changes](https://www.better-auth.com/docs/reference/contributing.html#making-changes)[1. Create a new branch](https://www.better-auth.com/docs/reference/contributing.html#1-create-a-new-branch)[2. Start development server](https://www.better-auth.com/docs/reference/contributing.html#2-start-development-server)[3. Make Your Changes](https://www.better-auth.com/docs/reference/contributing.html#3-make-your-changes)[Issues and Bug Fixes](https://www.better-auth.com/docs/reference/contributing.html#issues-and-bug-fixes)[Framework Integrations](https://www.better-auth.com/docs/reference/contributing.html#framework-integrations)[Plugin Development](https://www.better-auth.com/docs/reference/contributing.html#plugin-development)[Documentation](https://www.better-auth.com/docs/reference/contributing.html#documentation)[Testing](https://www.better-auth.com/docs/reference/contributing.html#testing)[Using the Test Instance Helper](https://www.better-auth.com/docs/reference/contributing.html#using-the-test-instance-helper)[Testing Best Practices](https://www.better-auth.com/docs/reference/contributing.html#testing-best-practices)[Need Help?](https://www.better-auth.com/docs/reference/contributing.html#need-help)

Ask AI
