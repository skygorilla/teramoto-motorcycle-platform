# TERAMOTO Deployment & Domain Setup Guide

## 🚨 CRITICAL: Authentication Issues Fix

### 1. Firebase Console Setup (REQUIRED)
Go to [Firebase Console](https://console.firebase.google.com) → `teramoto-yd0q5` project:

**Authentication → Settings → Authorized domains:**
Add these domains:
- `localhost` (for development)
- `tera-moto.hr` (your custom domain)
- `teramoto-yd0q5.firebaseapp.com` (Firebase default)
- Any Firebase App Hosting URLs

### 2. Firebase App Hosting Deployment

**Step 1: Connect GitHub Repository**
1. Firebase Console → App Hosting
2. Create new backend
3. Connect to `skygorilla/teramoto-motorcycle-platform`
4. Branch: `main`

**Step 2: Environment Variables (CRITICAL)**
In Firebase App Hosting backend settings, add:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBDrQpXuIlGvB0pzTceohCFq0Cl5zOiB9k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=teramoto-yd0q5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=teramoto-yd0q5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=teramoto-yd0q5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=163038206054
NEXT_PUBLIC_FIREBASE_APP_ID=1:163038206054:web:cec06c9e480e1982bcf5a7
NEXT_PUBLIC_ADMIN_EMAIL=info.teramoto@gmail.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdpgHcrAAAAACxK1VEg3HtmhQmuRguFkgZcJdfS
```

### 3. Custom Domain Setup (tera-moto.hr)

**Step 1: Firebase Hosting**
1. Firebase Console → Hosting
2. Add custom domain: `tera-moto.hr`
3. Get DNS records (A records or CNAME)

**Step 2: DNS Configuration**
Add these records to your domain registrar:
```
Type: A
Name: @
Value: [Firebase IP addresses provided]

Type: A  
Name: www
Value: [Firebase IP addresses provided]
```

### 4. Authentication Troubleshooting

**If users can't sign in/up:**

1. **Check authorized domains** in Firebase Console
2. **Verify environment variables** are set in deployment
3. **Test locally first:** `npm run dev`
4. **Check browser console** for specific errors

**Common Issues:**
- Domain not in authorized list
- Missing environment variables in production
- API key restrictions too strict
- CORS issues

### 5. Testing Checklist

✅ Local development works: `npm run dev`
✅ Firebase Console has all domains authorized
✅ Environment variables set in Firebase App Hosting
✅ Custom domain DNS configured
✅ Authentication works on production domain

## 🔧 Quick Fix Commands

**Test locally:**
```bash
npm run dev
```

**Deploy to Firebase:**
```bash
firebase deploy
```

**Check environment:**
```bash
echo $NEXT_PUBLIC_FIREBASE_API_KEY
```