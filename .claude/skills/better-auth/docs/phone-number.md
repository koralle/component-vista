---
title: "Phone Number | Better Auth"
source_url: "https://www.better-auth.com/docs/plugins/phone-number"
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

# Phone Number

Copy MarkdownOpen in

The phone number plugin extends the authentication system by allowing users to sign in and sign up using their phone number. It includes OTP (One-Time Password) functionality to verify phone numbers.

## [Installation](https://www.better-auth.com/docs/plugins/phone-number.html#installation)

### [Add Plugin to the server](https://www.better-auth.com/docs/plugins/phone-number.html#add-plugin-to-the-server)

auth.ts

```
import { betterAuth } from "better-auth"
import { phoneNumber } from "better-auth/plugins"

const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Implement sending OTP code via SMS
            }
        })
    ]
})
```

### [Migrate the database](https://www.better-auth.com/docs/plugins/phone-number.html#migrate-the-database)

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

See the [Schema](https://www.better-auth.com/docs/plugins/phone-number.html#schema) section to add the fields manually.

### [Add the client plugin](https://www.better-auth.com/docs/plugins/phone-number.html#add-the-client-plugin)

auth-client.ts

```
import { createAuthClient } from "better-auth/client"
import { phoneNumberClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        phoneNumberClient()
    ]
})
```

## [Usage](https://www.better-auth.com/docs/plugins/phone-number.html#usage)

### [Send OTP for Verification](https://www.better-auth.com/docs/plugins/phone-number.html#send-otp-for-verification)

To send an OTP to a user's phone number for verification, you can use the `sendVerificationCode` endpoint.

ClientServer

POST

/phone-number/send-otp

```
const { data, error } = await authClient.phoneNumber.sendOtp({    phoneNumber: "+1234567890", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | Phone number to send OTP. | `string` |

POST

/phone-number/send-otp

```
const data = await auth.api.sendPhoneNumberOTP({    body: {        phoneNumber: "+1234567890", // required    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | Phone number to send OTP. | `string` |

### [Verify Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#verify-phone-number)

After the OTP is sent, users can verify their phone number by providing the code.

ClientServer

POST

/phone-number/verify

```
const { data, error } = await authClient.phoneNumber.verify({    phoneNumber: "+1234567890", // required    code: "123456", // required    disableSession: false,    updatePhoneNumber: true,});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | Phone number to verify. | `string` |
| `code` | OTP code. | `string` |
| `disableSession?` | Disable session creation after verification. | `boolean` |
| `updatePhoneNumber?` | Check if there is a session and update the phone number. | `boolean` |

POST

/phone-number/verify

```
const data = await auth.api.verifyPhoneNumber({    body: {        phoneNumber: "+1234567890", // required        code: "123456", // required        disableSession: false,        updatePhoneNumber: true,    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | Phone number to verify. | `string` |
| `code` | OTP code. | `string` |
| `disableSession?` | Disable session creation after verification. | `boolean` |
| `updatePhoneNumber?` | Check if there is a session and update the phone number. | `boolean` |

When the phone number is verified, the `phoneNumberVerified` field in the user table is set to `true`. If `disableSession` is not set to `true`, a session is created for the user. Additionally, if `callbackOnVerification` is provided, it will be called.

### [Allow Sign-Up with Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#allow-sign-up-with-phone-number)

To allow users to sign up using their phone number, you can pass `signUpOnVerification` option to your plugin configuration. It requires you to pass `getTempEmail` function to generate a temporary email for the user.

auth.ts

```
export const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Implement sending OTP code via SMS
            },
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@my-site.com`
                },
                //optionally, you can also pass `getTempName` function to generate a temporary name for the user
                getTempName: (phoneNumber) => {
                    return phoneNumber //by default, it will use the phone number as the name
                }
            }
        })
    ]
})
```

We highly recommend not awaiting the `sendOTP` function. If you await it, it'll slow down the request and could cause timing attacks. For serverless platforms, you can use `waitUntil` to ensure the OTP is sent.

### [Sign In with Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#sign-in-with-phone-number)

In addition to signing in a user using send-verify flow, you can also use phone number as an identifier and sign in a user using phone number and password.

ClientServer

POST

/sign-in/phone-number

```
const { data, error } = await authClient.signIn.phoneNumber({    phoneNumber: "+1234567890", // required    password, // required    rememberMe: true,});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | Phone number to sign in. | `string` |
| `password` | Password to use for sign in. | `string` |
| `rememberMe?` | Remember the session. | `boolean` |

POST

/sign-in/phone-number

```
const data = await auth.api.signInPhoneNumber({    body: {        phoneNumber: "+1234567890", // required        password, // required        rememberMe: true,    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | Phone number to sign in. | `string` |
| `password` | Password to use for sign in. | `string` |
| `rememberMe?` | Remember the session. | `boolean` |

### [Update Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#update-phone-number)

Updating phone number uses the same process as verifying a phone number. The user will receive an OTP code to verify the new phone number.

auth-client.ts

```
await authClient.phoneNumber.sendOtp({
    phoneNumber: "+1234567890" // New phone number
})
```

Then verify the new phone number with the OTP code.

auth-client.ts

```
const isVerified = await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    updatePhoneNumber: true // Set to true to update the phone number
})
```

If a user session exist the phone number will be updated automatically.

### [Disable Session Creation](https://www.better-auth.com/docs/plugins/phone-number.html#disable-session-creation)

By default, the plugin creates a session for the user after verifying the phone number. You can disable this behavior by passing `disableSession: true` to the `verify` method.

auth-client.ts

```
const isVerified = await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    disableSession: true
})
```

### [Request Password Reset](https://www.better-auth.com/docs/plugins/phone-number.html#request-password-reset)

To initiate a request password reset flow using `phoneNumber`, you can start by calling `requestPasswordReset` on the client to send an OTP code to the user's phone number.

ClientServer

POST

/phone-number/request-password-reset

```
const { data, error } = await authClient.phoneNumber.requestPasswordReset({    phoneNumber: "+1234567890", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | The phone number which is associated with the user. | `string` |

POST

/phone-number/request-password-reset

```
const data = await auth.api.requestPasswordResetPhoneNumber({    body: {        phoneNumber: "+1234567890", // required    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `phoneNumber` | The phone number which is associated with the user. | `string` |

Then, you can reset the password by calling `resetPassword` on the client with the OTP code and the new password.

ClientServer

POST

/phone-number/reset-password

```
const { data, error } = await authClient.phoneNumber.resetPassword({    otp: "123456", // required    phoneNumber: "+1234567890", // required    newPassword: "new-and-secure-password", // required});
```

| Prop | Description | Type |
| --- | --- | --- |
| `otp` | The one time password to reset the password. | `string` |
| `phoneNumber` | The phone number to the account which intends to reset the password for. | `string` |
| `newPassword` | The new password. | `string` |

POST

/phone-number/reset-password

```
const data = await auth.api.resetPasswordPhoneNumber({    body: {        otp: "123456", // required        phoneNumber: "+1234567890", // required        newPassword: "new-and-secure-password", // required    },});
```

| Prop | Description | Type |
| --- | --- | --- |
| `otp` | The one time password to reset the password. | `string` |
| `phoneNumber` | The phone number to the account which intends to reset the password for. | `string` |
| `newPassword` | The new password. | `string` |

## [Options](https://www.better-auth.com/docs/plugins/phone-number.html#options)

### [`otpLength`](https://www.better-auth.com/docs/plugins/phone-number.html#otplength)

The length of the OTP code to be generated. Default is `6`.

### [`sendOTP`](https://www.better-auth.com/docs/plugins/phone-number.html#sendotp)

A function that sends the OTP code to the user's phone number. It takes the phone number and the OTP code as arguments.

### [`expiresIn`](https://www.better-auth.com/docs/plugins/phone-number.html#expiresin)

The time in seconds after which the OTP code expires. Default is `300` seconds.

### [`callbackOnVerification`](https://www.better-auth.com/docs/plugins/phone-number.html#callbackonverification)

A function that is called after the phone number is verified. It takes the phone number and the user object as the first argument and a request object as the second argument.

```
export const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Implement sending OTP code via SMS
            },
            callbackOnVerification: async ({ phoneNumber, user }, ctx) => {
                // Implement callback after phone number verification
            }
        })
    ]
})
```

### [`sendPasswordResetOTP`](https://www.better-auth.com/docs/plugins/phone-number.html#sendpasswordresetotp)

A function that sends the OTP code to the user's phone number for password reset. It takes the phone number and the OTP code as arguments.

### [`phoneNumberValidator`](https://www.better-auth.com/docs/plugins/phone-number.html#phonenumbervalidator)

A custom function to validate the phone number. It takes the phone number as an argument and returns a boolean indicating whether the phone number is valid.

### [`verifyOTP`](https://www.better-auth.com/docs/plugins/phone-number.html#verifyotp)

A custom function to verify the OTP code. When provided, this function will be used instead of the default internal verification logic. This is useful when you want to integrate with external SMS providers that handle OTP verification (e.g., Twilio Verify, AWS SNS). The function takes an object with `phoneNumber` and `code` properties and a request object, and returns a boolean or a promise that resolves to a boolean indicating whether the OTP is valid.

```
export const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Send OTP via your SMS provider
            },
            verifyOTP: async ({ phoneNumber, code }, ctx) => {
                // Verify OTP with your desired logic (e.g., Twilio Verify)
                // This is just an example, not a real implementation.
                const isValid = await twilioClient.verify
                    .services('YOUR_SERVICE_SID')
                    .verificationChecks
                    .create({ to: phoneNumber, code });
                return isValid.status === 'approved';
            }
        })
    ]
})
```

When using this option, ensure that proper validation is implemented, as it overrides our internal verification logic.

### [`signUpOnVerification`](https://www.better-auth.com/docs/plugins/phone-number.html#signuponverification)

An object with the following properties:

* `getTempEmail`: A function that generates a temporary email for the user. It takes the phone number as an argument and returns the temporary email.
* `getTempName`: A function that generates a temporary name for the user. It takes the phone number as an argument and returns the temporary name.

### [`requireVerification`](https://www.better-auth.com/docs/plugins/phone-number.html#requireverification)

When enabled, users cannot sign in with their phone number until it has been verified. If an unverified user attempts to sign in, the server will respond with a 401 error (PHONE\_NUMBER\_NOT\_VERIFIED) and automatically trigger an OTP send to start the verification process.

## [Schema](https://www.better-auth.com/docs/plugins/phone-number.html#schema)

The plugin requires 2 fields to be added to the user table

### [User Table](https://www.better-auth.com/docs/plugins/phone-number.html#user-table)

| Field Name | Type | Key | Description |
| --- | --- | --- | --- |
| phoneNumber | string | ? | The phone number of the user |
| phoneNumberVerified | boolean | ? | Whether the phone number is verified or not |

### [OTP Verification Attempts](https://www.better-auth.com/docs/plugins/phone-number.html#otp-verification-attempts)

The phone number plugin includes a built-in protection against brute force attacks by limiting the number of verification attempts for each OTP code.

```
phoneNumber({
  allowedAttempts: 3, // default is 3
  // ... other options
})
```

When a user exceeds the allowed number of verification attempts:

* The OTP code is automatically deleted
* Further verification attempts will return a 403 (Forbidden) status with "Too many attempts" message
* The user will need to request a new OTP code to continue

Example error response after exceeding attempts:

```
{
  "error": {
    "status": 403,
    "message": "Too many attempts"
  }
}
```

When receiving a 403 status, prompt the user to request a new OTP code

[Edit on GitHub](https://github.com/better-auth/better-auth/blob/canary/docs/content/docs/plugins/phone-number.mdx)

[Previous Page

Anonymous](https://www.better-auth.com/docs/plugins/anonymous.html)[Next Page

Magic Link](https://www.better-auth.com/docs/plugins/magic-link.html)

### On this page

[Installation](https://www.better-auth.com/docs/plugins/phone-number.html#installation)[Add Plugin to the server](https://www.better-auth.com/docs/plugins/phone-number.html#add-plugin-to-the-server)[Migrate the database](https://www.better-auth.com/docs/plugins/phone-number.html#migrate-the-database)[Add the client plugin](https://www.better-auth.com/docs/plugins/phone-number.html#add-the-client-plugin)[Usage](https://www.better-auth.com/docs/plugins/phone-number.html#usage)[Send OTP for Verification](https://www.better-auth.com/docs/plugins/phone-number.html#send-otp-for-verification)[Verify Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#verify-phone-number)[Allow Sign-Up with Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#allow-sign-up-with-phone-number)[Sign In with Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#sign-in-with-phone-number)[Update Phone Number](https://www.better-auth.com/docs/plugins/phone-number.html#update-phone-number)[Disable Session Creation](https://www.better-auth.com/docs/plugins/phone-number.html#disable-session-creation)[Request Password Reset](https://www.better-auth.com/docs/plugins/phone-number.html#request-password-reset)[Options](https://www.better-auth.com/docs/plugins/phone-number.html#options)[`otpLength`](https://www.better-auth.com/docs/plugins/phone-number.html#otplength)[`sendOTP`](https://www.better-auth.com/docs/plugins/phone-number.html#sendotp)[`expiresIn`](https://www.better-auth.com/docs/plugins/phone-number.html#expiresin)[`callbackOnVerification`](https://www.better-auth.com/docs/plugins/phone-number.html#callbackonverification)[`sendPasswordResetOTP`](https://www.better-auth.com/docs/plugins/phone-number.html#sendpasswordresetotp)[`phoneNumberValidator`](https://www.better-auth.com/docs/plugins/phone-number.html#phonenumbervalidator)[`verifyOTP`](https://www.better-auth.com/docs/plugins/phone-number.html#verifyotp)[`signUpOnVerification`](https://www.better-auth.com/docs/plugins/phone-number.html#signuponverification)[`requireVerification`](https://www.better-auth.com/docs/plugins/phone-number.html#requireverification)[Schema](https://www.better-auth.com/docs/plugins/phone-number.html#schema)[User Table](https://www.better-auth.com/docs/plugins/phone-number.html#user-table)[OTP Verification Attempts](https://www.better-auth.com/docs/plugins/phone-number.html#otp-verification-attempts)

Ask AI
