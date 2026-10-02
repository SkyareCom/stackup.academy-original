# Google Play release checklist — Academy 2.1.7 / 218

## Repository state
- package `com.skyare.stackupacademy`;
- native WebView launcher, no TWA;
- official origin `https://skyarecom.github.io/stackup.academy-original/`;
- target/compile SDK 36;
- bundled modular web assets;
- build 218 cache recovery;
- INTERNET only and cleartext disabled;
- Android backup/data transfer disabled;
- Billing 9.1.0 with `academy_access`;
- Google + biometric account infrastructure prepared;
- CI security guard and immutable Action SHAs;
- API 36 + API 34 emulator smoke tests;
- Data Safety audit document present.

## Before Play production
1. Confirm package is `com.skyare.stackupacademy`.
2. Keep Play App Signing enabled and protect the upload key.
3. Verify the four signing secrets and `signed=true` in `RELEASE-INFO.txt`.
4. Upload build 218 to Internal/Closed Testing before Production.
5. Confirm subscription product `academy_access` and base plans `monthly`, `six-month`, `annual`.
6. Complete privacy, content rating, target audience, app access and ads declarations.
7. Re-run Data Safety from the exact AAB.
8. Verify Google OAuth production SHA-1/SHA-256.
9. Review the Play pre-launch report.
10. Confirm Store Listing text/media in all supported locales.

Expected release:
- versionName: 2.1.7
- versionCode: 218
- targetSdk: 36
- shell: native WebView
