# 🚀 TERAMOTO Publishing Guide

## Current Issues & Solutions

### 1. Firebase App Hosting Setup

**Go to Firebase Console:**
1. **App Hosting** → Create new backend
2. **Connect GitHub:** `skygorilla/teramoto-motorcycle-platform`
3. **Branch:** `main`
4. **Build settings:**
   ```
   Build command: npm run build
   Output directory: .next
   Install command: npm ci
   ```

### 2. Environment Variables (CRITICAL)

**In Firebase App Hosting backend settings, add ALL of the following:**
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

### 3. Custom Domain (tera-moto.hr)

**Firebase Hosting:**
1. **Hosting** → Add custom domain
2. **Domain:** `tera-moto.hr`
3. **DNS Records:** Add provided A records to your domain registrar

**Link Hosting to App (Fix for "Site Not Found"):**
The "Site Not Found" error means Firebase Hosting is not linked to your App Hosting backend. You must link them with a `rewrite` rule.

**This rule has been correctly configured in `firebase.json`. Deploying the latest code will resolve this issue.**

### 4. Authentication Fix

**Firebase Console → Authentication → Settings → Authorized domains:**
It is critical to add all domains your app is served from. A missing domain will cause an `auth/requests-from-referer...are-blocked` error.

Make sure this list includes:
- `localhost`
- `tera-moto.hr`
- `teramoto-yd0q5.firebaseapp.com`
- `teramoto-yd0q5.web.app`
- `studio--teramoto-yd0q5.us-central1.hosted.app` (and other preview URLs)

### 5. API Key Security

**Google Cloud Console → Credentials:**
- **TERAMOTO Firebase Web Key** is properly restricted
- **Websites:** `https://tera-moto.hr`, `https://*.firebaseapp.com`
- **APIs:** Identity Toolkit, Firebase Hosting, Cloud Storage

## 🔧 Deployment Steps

1. **Push latest code:**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Firebase App Hosting will auto-deploy**

3. **Test authentication on live site**

4. **Configure custom domain DNS**

## 🚨 Common Issues

**Authentication not working:**
- Missing environment variables in Firebase App Hosting
- Domain not in authorized list
- Wrong API key being used

**Build failures:**
- Missing dependencies
- Environment variables not set
- Next.js configuration issues

**Domain not working:**
- DNS records not propagated (takes 24-48 hours)
- SSL certificate pending
- Firebase Hosting not connected to App Hosting backend (fixed by the rewrite rule in `firebase.json`)

## ✅ Success Checklist

- [ ] GitHub repository updated
- [ ] Firebase App Hosting connected
- [ ] Environment variables configured
- [ ] Custom domain added
- [ ] DNS records configured
- [ ] Authentication domains authorized
- [ ] API key properly restricted
- [ ] `firebase.json` has correct rewrite rule
- [ ] Site accessible at tera-moto.hr
- [ ] Login/signup working
