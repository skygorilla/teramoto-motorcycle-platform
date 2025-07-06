# TERAMOTO Deployment & Domain Setup Guide

## 🚨 CRITICAL: Authentication Issues Fix

### 1. Firebase Console Setup (REQUIRED)
Go to [Firebase Console](https://console.firebase.google.com) → `teramoto-yd0q5` project:

**Authentication → Settings → Authorized domains:**
You **MUST** add all of the domains your app is served from. The error `auth/requests-from-referer...are-blocked` means a domain is missing from this list.

Add these domains:
- `localhost` (for local development)
- `tera-moto.hr` (your custom domain)
- `teramoto-yd0q5.firebaseapp.com` (Firebase default)
- `teramoto-yd0q5.web.app` (Firebase default)
- `studio--teramoto-yd0q5.us-central1.hosted.app` (The App Hosting preview URL from the error)
- Any other Firebase App Hosting URLs you use.

### 2. Firebase App Hosting Deployment

**Step 1: Connect GitHub Repository**
1. Firebase Console → App Hosting
2. Create new backend
3. Connect to `skygorilla/teramoto-motorcycle-platform`
4. Branch: `main`

**Step 2: Environment Variables (CRITICAL)**
In your Firebase App Hosting backend settings, add ALL of the following variables:
```
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBDrQpXuIlGvB0pzTceohCFq0Cl5zOiB9k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=teramoto-yd0q5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=teramoto-yd0q5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=teramoto-yd0q5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=163038206054
NEXT_PUBLIC_FIREBASE_APP_ID=1:163038206054:web:cec06c9e480e1982bcf5a7

# Application Config
NEXT_PUBLIC_ADMIN_EMAIL=info.teramoto@gmail.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdpgHcrAAAAACxK1VEg3HtmhQmuRguFkgZcJdfS

# Google AI & reCAPTCHA Server-side Key
GOOGLE_API_KEY=AIz...
```

### 3. Custom Domain Setup (`tera-moto.hr`)

To connect your custom domain, you will use **Firebase Hosting** to serve your **App Hosting** backend. This is the recommended setup.

**IMPORTANT:** You will add your custom domain in the **HOSTING** section of the Firebase console, **NOT** the App Hosting section. If you have already added `tera-moto.hr` to the App Hosting domains list (where it shows "Needs setup"), please remove it from there first to avoid conflicts.

**Step 1: Go to the Firebase Hosting Section**
1. In the Firebase Console, navigate to the **Hosting** section from the side menu.
2. Click **"Add custom domain"**.
3. Enter `tera-moto.hr` and follow the setup wizard.

**Step 2: Get DNS Records**
1. Firebase will provide you with DNS records (usually two `A` records). Copy these values.

**Step 3: Configure DNS at Your Registrar**
1. Go to the website where you purchased `tera-moto.hr`.
2. Find the DNS management panel.
3. Add the `A` records provided by Firebase. This points your domain to Firebase's servers. It may take some time to propagate.

**Step 4: Linking Hosting to Your App (CRITICAL)**
The `firebase.json` file in this project is already configured to link Firebase Hosting to your app. The `rewrite` rule inside it tells Hosting to show your dynamic application instead of looking for a static `index.html` file. This prevents the "Site Not Found" error. A fresh deployment will ensure this rule is active.

### 4. Authentication Troubleshooting

**If users can't sign in/up:**

1. **Check authorized domains** in Firebase Console.
2. **Verify environment variables** are set in deployment.
3. **Test locally first:** `npm run dev`
4. **Check browser console** for specific errors.

**Common Issues:**
- Domain not in authorized list
- Missing environment variables in production
- API key restrictions too strict
- CORS issues

### 5. Testing Checklist

✅ Local development works: `npm run dev`
✅ Firebase Console has all domains authorized
✅ Environment variables set in Firebase App Hosting
✅ Custom domain DNS configured in **Hosting** section
✅ Authentication works on production domain
