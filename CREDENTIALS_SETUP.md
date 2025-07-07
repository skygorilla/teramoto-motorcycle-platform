# 🔐 TERAMOTO Credentials Setup Guide

## Required Actions:

### 1. API Key Configuration
**Current**: `New Browser key (auto created by Firebase)`
**Action**: Rename to `TERAMOTO-Production-Key`

**Restrictions to Add**:
```
HTTP referrers:
- https://tera-moto.hr/*
- https://*.firebaseapp.com/*
- https://*.web.app/*
- http://localhost:9002/*
```

### 2. OAuth 2.0 Client Setup
**Current**: `tera moto` (638858662134-e165...)
**Action**: Update authorized domains

**Authorized JavaScript origins**:
```
https://tera-moto.hr
https://moto-program.firebaseapp.com
https://moto-program.web.app
http://localhost:9002
```

**Authorized redirect URIs**:
```
https://tera-moto.hr/__/auth/handler
https://moto-program.firebaseapp.com/__/auth/handler
http://localhost:9002/__/auth/handler
```

### 3. Service Account Permissions
**firebase-adminsdk-fbsvc@moto-program.iam.gserviceaccount.com**

Required roles:
- Firebase Admin SDK Administrator Service Agent
- Cloud Datastore User
- Storage Admin

### 4. Environment Variables to Set

#### In Firebase App Hosting:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAEz9SG9MJSIgC0nXGATbrVs5M9xp5tyY4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=moto-program.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=moto-program
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=moto-program.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=638858662134
NEXT_PUBLIC_FIREBASE_APP_ID=1:638858662134:web:YOUR_ACTUAL_APP_ID
NEXT_PUBLIC_ADMIN_EMAIL=info.teramoto@gmail.com
GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
```

#### In GitHub Secrets:
```bash
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAEz9SG9MJSIgC0nXGATbrVs5M9xp5tyY4
# ... (all other env vars)
```

### 5. Security Checklist
- [ ] API key restricted to authorized domains only
- [ ] OAuth client configured with correct redirect URIs
- [ ] Service account has minimal required permissions
- [ ] Environment variables set in Firebase App Hosting
- [ ] GitHub secrets configured for CI/CD
- [ ] Test authentication flow on all domains

### 6. Quick Fix Commands

```bash
# Update local environment
cp .env.example .env
# Edit .env with actual values

# Test Firebase connection
npm run dev
# Visit http://localhost:9002 and test sign-in

# Deploy to production
git push origin main
# GitHub Actions will auto-deploy
```

## 🚨 Security Notes:
- Never commit real API keys to repository
- Use Firebase App Hosting environment variables for production
- Regularly rotate service account keys
- Monitor API usage for unusual activity