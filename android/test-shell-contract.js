const fs=require('fs');
const assert=require('node:assert/strict');

const gradle=fs.readFileSync('android/app/build.gradle.kts','utf8');
const manifest=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');
const main=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/MainActivity.java','utf8');
const billing=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/BillingManager.java','utf8');

assert(gradle.includes('versionCode = 218'),'release versionCode must be 218');
assert(gradle.includes('versionName = "2.1.7"'),'release versionName must be 2.1.7');
assert(gradle.includes('applicationIdSuffix = ".test218"'),'debug package must be test218');
assert(main.includes('APP_URL = "https://skyarecom.github.io/stackup.academy-original/"'),'native shell must load Academy Original');
assert(main.includes('APP_PATH = "/stackup.academy-original/"'),'native shell path must match Academy Original');
assert(main.includes('index.html?android_build=218'),'bundled entry must identify build 218');
assert(main.includes('CACHE_SCHEMA = 218'),'native cache schema must match build 218');
assert(main.includes('WebViewAssetLoader'),'native shell must serve bundled web assets');
assert(main.includes('onRenderProcessGone'),'renderer loss must be handled');
assert(main.includes('auth-production.js?v=218'),'native shell must load auth bridge 218');
assert(main.includes('billing-production.js?v=218'),'native shell must load billing bridge 218');
assert(gradle.includes('androidx.webkit:webkit:1.14.0'),'WebView dependency must be pinned');
assert(gradle.includes('syncAcademyWebAssets'),'Android build must package Academy web assets');
assert(gradle.includes('"src/**"'),'modular src assets must be bundled');
assert(manifest.includes('android:name="com.skyare.stackupacademy.MainActivity"'),'production launcher must be native MainActivity');
assert(!manifest.includes('com.google.androidbrowserhelper.trusted'),'production manifest must not use TWA launcher');
assert(!gradle.includes('com.google.androidbrowserhelper'),'Android Browser Helper must be removed');
assert(gradle.includes('com.android.billingclient:billing:9.1.0'),'Play Billing must be included');
assert(billing.includes('PRODUCT_ID = "academy_access"'),'subscription product must be academy_access');
assert(billing.includes('BASE_MONTHLY = "monthly"'),'monthly base plan must be wired');
assert(billing.includes('BASE_SIX_MONTH = "six-month"'),'six-month base plan must be wired');
assert(billing.includes('BASE_ANNUAL = "annual"'),'annual base plan must be wired');
assert(billing.includes('acknowledgePurchase'),'purchases must be acknowledged');
assert(billing.includes('queryPurchasesAsync'),'subscriptions must be restored');

console.log('Android shell contract OK: Academy Original 2.1.7/218, native WebView, billing/auth and bundled modular frontend.');
