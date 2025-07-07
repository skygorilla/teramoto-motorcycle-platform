# 🚨 Firebase Initialization Errors - Quick Fix

## Errors Identified:
1. **404**: `/__/firebase/init.json` not found
2. **401**: API key unauthorized for identitytoolkit
3. **Internal Error**: Firebase services not properly configured

## Root Cause:
Firebase project `teramoto-yd0q5` services not enabled in Firebase Console

## ⚡ IMMEDIATE FIXES NEEDED:

### 1. Enable Authentication (Firebase Console)
```
1. Go to Firebase Console → teramoto-yd0q5
2. Authentication → Get started
3. Sign-in method → Google → Enable
4. Add authorized domains:
   - teramoto-yd0q5.firebaseapp.com
   - tera-moto.hr
   - localhost
```

### 2. Enable Firestore Database
```
1. Firestore Database → Create database
2. Start in test mode
3. Select region: us-central1
```

### 3. Fix API Key Restrictions (Google Cloud Console)
```
1. APIs & Services → Credentials
2. API Key: AIzaSyBIXy-LgcODghnxFzwOpUiT6bTkP1Duey4
3. Add HTTP referrers:
   - https://teramoto-yd0q5.firebaseapp.com/*
   - https://*firebase-studio*.cloudworkstations.dev/*
   - http://localhost:9002/*
```

### 4. Enable Required APIs
```
Google Cloud Console → APIs & Services → Library
Enable:
- Identity and Access Management (IAM) API
- Firebase Authentication API
- Cloud Firestore API
```

## ✅ Expected Result:
After these configurations:
- Google Sign-In will work
- No more 404/401 errors
- Firebase services fully functional

## 🔧 Test After Setup:
1. Restart dev server: `npm run dev`
2. Visit: http://localhost:9002
3. Try Google Sign-In
4. Check console for errors