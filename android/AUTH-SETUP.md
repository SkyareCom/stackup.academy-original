# StackUp Academy — Production Authentication Setup

## Build 2.1.7 / 218

The Android/web hybrid uses Supabase Auth for the optional account layer while the Academy remains directly accessible during the current test phase.

### Implemented
- **Google:** Android Credential Manager obtains a Google ID token and `auth-production.js` exchanges it with Supabase Auth.
- **Biometrics:** Android BiometricPrompt unlocks an existing Supabase session. Raw fingerprint/face templates are never exposed to the app.
- **Session restore:** access/refresh session state is stored locally and refreshed when needed.
- **No mandatory login screen:** the Academy frontend continues to open directly; auth is an optional account capability.

### Not implemented end-to-end
- **WhatsApp OTP login:** do not present it as active until Supabase Phone Auth and an approved WhatsApp/Twilio flow are configured.
- **Coach message delivery:** plan entitlement/copy exists, but external message delivery requires its provider integration.

## Supabase
Android reads:
- `STACKUP_SUPABASE_URL`
- `STACKUP_SUPABASE_ANON_KEY`

Only a publishable/anonymous client key may be shipped. Never place a service-role key in Android or web assets.

## Google provider
Supabase Dashboard -> Authentication -> Providers -> Google.

Web OAuth Client ID used for ID-token audience validation:
`900430977321-mf76iecc9im76c53mh863shj9b29jk9p.apps.googleusercontent.com`

Android package:
`com.skyare.stackupacademy`

Before production, verify the Android OAuth client matches the production signing SHA-1/SHA-256 fingerprints.

## Biometrics
1. authenticate with Google;
2. Supabase creates a session;
3. session is stored locally;
4. later, BiometricPrompt validates the device user;
5. the app refreshes/resumes the Supabase session.

Biometrics are not a remote identity provider.

## Release verification
- Google account picker opens in the Android build;
- valid Google ID token creates/restores a Supabase session;
- failed/cancelled biometric checks do not authenticate;
- biometrics require an existing valid session;
- sign-out clears the local session.
