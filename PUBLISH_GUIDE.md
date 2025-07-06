# 🚀 TERAMOTO Publishing Guide

This guide covers the essential steps for configuring and deploying the TERAMOTO application.

### 1. Firebase App Hosting Setup

**Go to the Firebase Console for your project (`teramoto-yd0q5`):**
1.  **App Hosting** → Create a new backend.
2.  **Connect to GitHub:** Select the `skygorilla/teramoto-motorcycle-platform` repository.
3.  **Deployment Branch:** Set to `main`.
4.  Pushes to the `main` branch will now trigger automatic builds and deployments.

### 2. Environment Variables (CRITICAL)

For the application to function correctly, you **MUST** set the following environment variables in your Firebase App Hosting backend settings:

```
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAEz9SG9MJSIgC0nXGATbrVs5M9xp5tyY4
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

**IMPORTANT:** You will add your custom domain in the **HOSTING** section of the Firebase console, **NOT** the App Hosting section. If you have already added `tera-moto.hr` to the App Hosting domains list, please remove it to avoid conflicts.

**Step 1: Go to the Firebase Hosting Section**
1.  In the Firebase Console, navigate to the **Hosting** section from the side menu.
2.  Click **"Add custom domain"**.
3.  Enter `tera-moto.hr` and follow the setup wizard.

**Step 2: Get DNS Records**
1.  Firebase will provide you with DNS records (usually two `A` records). Copy these values.

**Step 3: Configure DNS at Your Registrar**
1.  Go to the website where you purchased `tera-moto.hr`.
2.  Find the DNS management panel.
3.  Add the `A` records provided by Firebase. This points your domain to Firebase's servers.

**Step 4: Link Hosting to Your App (Fix for "Site Not Found" error)**
The `firebase.json` file in this project contains a critical `rewrite` rule that tells Firebase Hosting to serve your application from App Hosting. This is already configured. A fresh deployment will ensure this rule is active and prevent the "Site Not Found" error.

### 4. Authentication Fix (Authorize Domains)

For users to be able to sign in, you must authorize your domains. A missing domain will cause an `auth/requests-from-referer...are-blocked` error.

**Firebase Console → Authentication → Settings → Authorized domains:**
Make sure this list includes:
-   `localhost` (for local development)
-   `tera-moto.hr` (your custom domain)
-   `teramoto-yd0q5.firebaseapp.com`
-   `teramoto-yd0q5.web.app`
-   `studio--teramoto-yd0q5.us-central1.hosted.app` (and other preview URLs)

### 5. Final Checklist

- [ ] GitHub repository is connected to App Hosting.
- [ ] All environment variables are configured in the App Hosting backend.
- [ ] Custom domain (`tera-moto.hr`) is added and verified in the **Firebase Hosting** section.
- [ ] DNS records from Firebase Hosting are correctly set at your domain registrar.
- [ ] All necessary domains are added to the "Authorized domains" list in Firebase Authentication.
- [ ] `firebase.json` has the correct rewrite rule (this is already done for you).
- [ ] A fresh push to `main` has been successfully deployed.
