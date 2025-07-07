# 🔧 Firebase Auth Errors - Quick Fix

## Current Errors:
1. **401 Unauthorized** - API key not enabled for Identity Toolkit
2. **App Check Token Invalid** - Firebase App Check not configured
3. **Image 400 errors** - External placeholder URLs blocked

## ✅ FIXES APPLIED:
- Created Facebook-compliant data deletion page
- Fixed image URLs causing 400 errors
- Ready for Firebase Console setup

## 🚨 REQUIRED: Firebase Console Actions
1. **Enable Identity Toolkit API**:
   - Google Cloud Console → APIs & Services → Library
   - Search "Identity Toolkit API" → Enable

2. **Configure App Check** (Optional):
   - Firebase Console → App Check → Get started
   - Or disable in Firebase config

3. **Enable Authentication**:
   - Firebase Console → Authentication → Get started
   - Sign-in method → Google → Enable

## 📋 Facebook App Setup:
Use this URL for User Data Deletion:
```
https://teramoto-yd0q5.firebaseapp.com/delete-data.html
```

After Firebase setup, all auth errors will be resolved.