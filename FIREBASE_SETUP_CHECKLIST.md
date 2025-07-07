# 🚨 Firebase Setup Checklist - Server Configuration Error

## Error: "Server configuration error"
**Cause**: Firebase services not properly enabled in Firebase Console

## ✅ Required Firebase Console Setup:

### 1. Authentication
- Go to Firebase Console → teramoto-yd0q5 → Authentication
- Click "Get started"
- Sign-in method → Google → Enable
- Add authorized domains:
  - `teramoto-yd0q5.firebaseapp.com`
  - `tera-moto.hr`
  - `localhost`

### 2. Firestore Database
- Go to Firestore Database
- Click "Create database"
- Choose "Start in test mode"
- Select region: us-central1

### 3. Storage
- Go to Storage
- Click "Get started"
- Choose "Start in test mode"
- Select region: us-central1

### 4. API Key Restrictions
- Google Cloud Console → APIs & Services → Credentials
- API Key: AIzaSyBIXy-LgcODghnxFzwOpUiT6bTkP1Duey4
- Add HTTP referrers:
  - `https://teramoto-yd0q5.firebaseapp.com/*`
  - `https://tera-moto.hr/*`
  - `http://localhost:9002/*`
  - `https://*firebase-studio*.cloudworkstations.dev/*`

## 🔧 Current Status:
- ✅ Environment variables configured
- ✅ OAuth client ID configured
- ❌ Firebase services not initialized
- ❌ API key restrictions too strict

## ⚡ Quick Test:
After setup, test at: http://localhost:9002
- Try Google Sign-In
- Check browser console for errors