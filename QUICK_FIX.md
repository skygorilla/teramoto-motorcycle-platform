# 🚨 URGENT FIXES NEEDED

## 1. API Key Restrictions (CRITICAL)
**Error**: `auth/requests-from-referer-https://9000-firebase-studio-...are-blocked`

**Fix in Google Cloud Console**:
```
API Key: AIzaSyBDrQpXuIlGvB0pzTceohCFq0Cl5zOiB9k
Add HTTP referrer:
- https://*firebase-studio*.cloudworkstations.dev/*
- https://*firebase-studio*.cluster-*.cloudworkstations.dev/*
```

## 2. Enable Firestore Database
**Error**: `firestore.clients6.google.com/.../GetDatabase: 404`

**Fix in Firebase Console**:
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode"
4. Select region (us-central1)

## 3. Port Configuration
**Error**: App fetching from port 9000 instead of 9002

**Already Fixed**: Dev server configured for port 9002

## 4. Missing Images
**Error**: 400 errors for workshop.jpg, sell-vehicle.jpg, buy-vehicle.jpg

**Quick Fix**:
```bash
mkdir -p public/images
# Add placeholder images or update image paths
```