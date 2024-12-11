# Expo Router Deep Linking Examples

This project demonstrates deep linking functionality in Expo using expo-router. It includes examples of nested navigation and proper back button handling for deep links.

Links for reference:

- [Expo Router](https://docs.expo.dev/router/introduction)
- [Expo Linking Overview](https://docs.expo.dev/linking/overview/)
- [Expo Router Settings](https://docs.expo.dev/router/advanced/router-settings/)

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Build the Android app:
```bash
npx expo run:android
```

## Deep Linking Examples

The app uses the scheme `rhino://` and supports the following deep link patterns:

- Main categories screen: `rhino://categories`
- Specific category: `rhino://categories/electronics`
- Specific product: `rhino://categories/electronics/123`

Test deep links using the uri-scheme command:
```bash
# Open main categories screen
npx uri-scheme open rhino://categories --android

# Open specific category
npx uri-scheme open rhino://categories/electronics --android

# Open specific product
npx uri-scheme open rhino://categories/electronics/123 --android

# Open specific product with color
npx uri-scheme open 'rhino://categories/electronics/123?color=red' --android
```

## Implementation Details

### 1. Initial Route Configuration
In `app/(shop)/_layout.tsx`, we use `unstable_settings` to define the initial route:
```typescript
export const unstable_settings = {
  initialRouteName: 'categories/index',
};
```
This ensures proper navigation stack initialization when deep linking.

### 2. Back Button Handling
For deep links that bypass intermediate screens (e.g., linking directly to a product), we implement custom back button handling in the categories index screen:

- Check if we can go back using `router.canGoBack()`
- If we can't go back (deep linked), show a custom back button that navigates to the root
- Use the native `HeaderBackButton` component for consistent UI

Example from `app/(shop)/categories/index.tsx`:
```typescript
const screenOptions = router.canGoBack()
  ? {}
  : {
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => router.replace('/')}
        tintColor="#007AFF"
      />
    ),
  };
```

### 3. Navigation Stack Configuration
In `app/_layout.tsx`, we configure the root stack to handle the shop navigation group:
```typescript
<Stack.Screen name="(shop)" options={{ headerShown: false }} />
```

## Deep Links vs Android App Links

There are two main types of links for Android applications:

### Deep Links
- Use custom URL schemes (e.g., `rhino://`)
- Don't require verification of ownership
- Can be intercepted by multiple apps
- Work immediately after implementation
- Example: `rhino://categories/electronics`

### Android App Links
- Use HTTPS URLs (e.g., `https://rhino.fi/categories/electronics`)
- Require verification of domain ownership
- Are unique to your app (if verified)
- Provide a more seamless user experience
- Example: `https://rhino.fi/categories/electronics`

## Configuring Android App Links

To set up Android App Links for rhino.fi:

1. Add the following to your `app.json`:
```json
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "rhino.fi",
              "pathPrefix": "/categories"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

2. Host the Digital Asset Links JSON file:
Create a file at `https://rhino.fi/.well-known/assetlinks.json` with the following content:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "fi.rhino.app",
    "sha256_cert_fingerprints": [
      "YOUR:APP:FINGERPRINT"
    ]
  }
}]
```

To get your app's SHA-256 fingerprint:
```bash
keytool -list -v -keystore my-release-key.keystore
```

3. Configure your web server:
- Ensure the `.well-known` directory is accessible
- Add proper MIME type for JSON files:
  ```nginx
  # Nginx configuration
  location /.well-known/assetlinks.json {
      default_type application/json;
      add_header Content-Type application/json;
  }
  ```

4. Test your App Links:
```bash
# Test a product page link
adb shell am start -a android.intent.action.VIEW \
  -c android.intent.category.BROWSABLE \
  -d "https://rhino.fi/categories/electronics/123"
```

## Notes
- This example is configured for Android only
- The app must be built (`npx expo run:android`) to test deep links
- Deep links won't work in Expo Go due to scheme restrictions
- Back button behavior is customized to handle deep linking edge cases
- Android App Links require a production build signed with your release key