# 🔐 Service Account Key Setup

## Current Key Information:
- **Service Account**: `moto-858@moto-program.iam.gserviceaccount.com`
- **Key ID**: `7e04040982dfe083c7e361da7915956f8204b25e`
- **Status**: Active
- **Created**: Jun 20, 2025

## Setup Steps:

### 1. Download Service Account Key
1. Click on the key ID: `7e04040982dfe083c7e361da7915956f8204b25e`
2. Download the JSON file
3. **DO NOT** commit this file to Git

### 2. Configure for Local Development
```bash
# Save the downloaded JSON as:
src/lib/firebase/service-account.json

# The file should look like:
{
  "type": "service_account",
  "project_id": "moto-program",
  "private_key_id": "7e04040982dfe083c7e361da7915956f8204b25e",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "moto-858@moto-program.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

### 3. Update Environment Variables
```bash
# Add to .env (for local development only):
FIREBASE_SERVICE_ACCOUNT_PATH=./src/lib/firebase/service-account.json

# For production (Firebase App Hosting):
# Copy the entire JSON content as FIREBASE_SERVICE_ACCOUNT environment variable
```

### 4. Required IAM Roles for moto-858@moto-program.iam.gserviceaccount.com:
- Firebase Admin SDK Administrator Service Agent
- Cloud Datastore User
- Storage Admin
- Authentication Admin

### 5. Security Checklist:
- [ ] JSON file added to .gitignore
- [ ] Environment variable set in Firebase App Hosting
- [ ] Service account has minimal required permissions
- [ ] Key rotation scheduled (recommended: every 90 days)

## ⚠️ Security Warning:
Never commit the service account JSON file to your repository. It's already in .gitignore.