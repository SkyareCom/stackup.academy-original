# Google Play Data Safety — build 2.1.7 / 218

This is a release-audit checklist; Play Console declarations must be completed from the exact release candidate.

## Android permissions
The package requests only:
- `android.permission.INTERNET`

It does not request contacts, location, microphone, camera, storage, SMS, phone, advertising ID or background-location permissions.

Android backup is disabled. Android 12+ data extraction rules exclude application data from cloud backup and device-to-device transfer.

## Services in the build
- Google Credential Manager can obtain a Google ID token.
- `auth-production.js` can exchange that token with Supabase Auth.
- Supabase session data is stored locally under `stackup.supabase.session.v1`.
- BiometricPrompt only unlocks an existing authenticated session.
- Google Play Billing Library 9.1.0 manages the `academy_access` subscription.
- Billing base plans are `monthly`, `six-month` and `annual`.
- Study progress, training history, preferences and evolution data are stored locally unless a future sync service is explicitly enabled.

## WhatsApp / Coach
WhatsApp OTP is not an active login path. Coach message delivery is separate and must not be declared active until its provider is configured and tested.

## Data categories to review before production
- name/email when Google sign-in is used;
- Supabase account/session identifiers;
- local training/progress/history/preferences;
- Google Play subscription status;
- technical connection data processed by hosting/auth/billing providers.

## Release gate
Before production, re-check:
- permissions and dependencies;
- auth providers actually enabled;
- Google Play Billing products/base plans;
- privacy policy and deletion flow;
- analytics/crash SDKs, if added;
- exact production AAB behavior.
