# Security policy

## Production model
StackUp Hold'em Academy uses a native Android WebView shell with a bundled copy of the modular web release and the official hosted origin:

`https://skyarecom.github.io/stackup.academy-original/`

The native shell restricts in-app navigation to this Academy path. External links open in the device browser.

## Critical assets
Treat these as production-critical:
- `.github/workflows/**`
- `android/**`
- `index.html`
- `sw.js`
- `manifest.webmanifest`
- `auth-production.js`
- `billing-production.js`
- `src/services/**`

## Secrets
Never commit upload keystores, private keys, service-role keys, passwords, API secrets, service-account credentials, `.env` files or Play signing material.

The Supabase key shipped to the client must be publishable/anonymous only. Android signing credentials remain in GitHub Actions Secrets or a protected environment.

## Change control
Production changes must pass:
- repository security guard;
- JavaScript syntax and product tests;
- typography/layout/release UI guards;
- Android native shell contract;
- Android lint/build/smoke tests for release candidates.

Workflows are pinned to immutable action SHAs and do not self-modify the repository.

## Reporting
If a credential leak or unauthorized change is suspected, rotate the affected credential, pause the related workflow if needed, and review recent commits and Actions logs before restoring deployment.
