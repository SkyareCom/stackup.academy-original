# StackUp Hold'em Academy Android

Android production packaging for StackUp Hold'em Academy.

- Application ID: `com.skyare.stackupacademy`
- Version: `2.1.7` / `versionCode 218`
- compileSdk / targetSdk: 36
- minSdk: 24
- Java: 17
- Architecture: native Android shell + restricted WebView + bundled modular web assets
- Official content origin: `https://skyarecom.github.io/stackup.academy-original/`

## Why native WebView
The production shell does not use a TWA or Custom Tab. It therefore does not depend on Digital Asset Links to launch the application UI.

The app bundles the Academy web release in the AAB/APK for startup/recovery while retaining the official Academy origin and restricted navigation policy.

## Safeguards
- INTERNET only;
- cleartext HTTP disabled;
- mixed content blocked;
- file/content access restricted;
- Safe Browsing enabled when supported;
- one bounded renderer-recovery attempt;
- cache schema 218;
- external URLs open outside the app;
- Android Back uses WebView history before closing.

## Billing
- Play Billing Library: 9.1.0
- Product: `academy_access`
- Base plans: `monthly`, `six-month`, `annual`
- purchases are acknowledged;
- active subscriptions are restored.

## Authentication
Google Credential Manager and BiometricPrompt are integrated with the optional Supabase account layer. The Academy does not require login during the current test phase.

## Build
`gradle -p android :app:bundleRelease`

Expected bundle:
`android/app/build/outputs/bundle/release/app-release.aab`

CI also builds a debug APK `com.skyare.stackupacademy.test218` and smoke-tests API 36 and API 34.
