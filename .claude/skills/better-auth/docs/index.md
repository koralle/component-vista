---
title: "Better Auth"
source_url: "https://www.better-auth.com/index"
fetched_at: "2025-12-17T17:03:49.997163+00:00"
---



Introducing Better Auth Infrastructure|[Join the waitlist →](https://better-auth.build)[Join the waitlist →](https://better-auth.build)

Own Your Auth

The most comprehensive authentication framework for TypeScript.

git:(main)x

npm i better-auth

[Get Started](https://www.better-auth.com/docs.html)

Create Sign in Box

auth.tsclient.ts

Copy code

01

02

03

04

05

06

07

08

09

10

11

12

```
export const auth = betterAuth({

database: new Pool({

connectionString: DATABASE_URL,

}),

emailAndPassword: {

enabled: true,

},

plugins: [

organization(),

twoFactor(),

]

})
```

[Demo](https://demo.better-auth.com)

Framework Agnostic

Support for popular **frameworks**.

Supports popular frameworks, including React, Vue, Svelte, Astro, Solid, Next.js, Nuxt, Tanstack Start, Hono, and more.[Learn more](https://www.better-auth.com/docs.html)

Authentication

Email & Password **Authentication**.

Built-in support for email and password authentication, with session and account management features.[Learn more](https://www.better-auth.com/docs.html)

Social Sign-on

Support multiple **OAuth providers**.

Allow users to sign in with their accounts, including GitHub, Google, Discord, Twitter, and more.[Learn more](https://www.better-auth.com/docs.html)

Two Factor

Multi Factor **Authentication**.

Secure your users accounts with two factor authentication with a few lines of code.[Learn more](https://www.better-auth.com/docs.html)

Multi Tenant

**Organization** Members and Invitation.

Multi tenant support with members, organization, teams and invitation with access control.[Learn more](https://www.better-auth.com/docs.html)

Plugin Ecosystem

A lot more features with **plugins**.

Improve your application experience with our official plugins and those created by the community.[Learn more](https://www.better-auth.com/docs.html)

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

"i have been using better-auth for exon todo and it is like so fast, I set it up once and it just works."

![avatar](https://www.better-auth.com/people-say/ryan-vogel.jpg)

##### Ryan Vogel

Founder of exon

"@better\_auth exceeded all expectations, and it's just getting started."

![avatar](https://www.better-auth.com/people-say/dagmawi-babi.png)

##### Dagmawi Babi

Developer

"Using @better\_auth with custom components feels like having someone hand you the remote while you're comfortably on the sofa. The ease I'm feeling rn is insane Auth done in under 5 minutes 🤌⚡️.."

![avatar](https://www.better-auth.com/people-say/tech-nerd.png)

##### Tech Nerd

Developer

"if you're building a code project in 2025 use @better\_auth. It has everything you need now and everything you'll need at scale. dont take this suggestion lightly..."

![avatar](https://www.better-auth.com/people-say/omar-mcadam.png)

##### Omar McAdam

Creator of AugmentedHQ

"Great project & maintainer."

![avatar](https://www.better-auth.com/people-say/guillermo-rauch.png)

##### Guillermo Rauch

CEO of Vercel

"i cant believe how easy @better\_auth is compared to @authjs all i had to do was connect it to my drizzle schema and create a sign up page w the auth :)))."

![avatar](https://www.better-auth.com/people-say/nizzy.png)

##### Nizzy

Co-founder of Zero

"better-auth is a work of art.."

![avatar](https://www.better-auth.com/people-say/vybhav-bhargav.png)

##### Vybhav Bhargav

Founding engineer @glyfspace

Own your auth

**Roll your own auth with confidence in minutes!**

[Star on GitHub

24.2K+](https://github.com/better-auth/better-auth)

---
