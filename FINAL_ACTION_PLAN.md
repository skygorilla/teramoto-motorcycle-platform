
# 🚀 TERAMOTO - Final Action Plan

You are just a few steps away from having a fully functional, auto-deploying application. Please follow this guide carefully.

## Step 1: Configure Your Firebase Project

These actions must be done in the **[Firebase Console](https://console.firebase.google.com)** for project `teramoto-yd0q5`.

### A. Enable Authentication

1.  Go to **Authentication** -> **Sign-in method**.
2.  Click on the **Google** provider and **Enable** it.
3.  Go to the **Settings** tab within Authentication.
4.  Under **Authorized domains**, click **Add domain** and add the following (if they are not already there):
    *   `tera-moto.hr`
    *   `teramoto-yd0q5.web.app`
    *   `teramoto-yd0q5.firebaseapp.com`
    *   `localhost`

### B. Create Firestore Database

1.  Go to **Firestore Database**.
2.  Click **Create database**.
3.  Select **Start in test mode** (you can change security rules later).
4.  Choose a location (e.g., `us-central1`) and click **Enable**.

### C. Connect Your Custom Domain (The Right Way)

This step fixes the "Site Not Found" error.

1.  Go to the **Hosting** section (NOT App Hosting).
2.  Click **Add custom domain**.
3.  Enter `tera-moto.hr` and follow the wizard to verify ownership by adding the DNS records it provides to your domain registrar (where you bought the domain).
4.  **Crucially**, ensure that Firebase Hosting is configured to show your app. My recent change to `firebase.json` handles this automatically, but a successful deployment is needed to apply it.

---

## Step 2: Configure GitHub for Automated Deployment

These actions are done in your **[GitHub Repository Settings](https://github.com/skygorilla/teramoto-motorcycle-platform/settings/secrets/actions)**.

### A. Generate a Service Account Key

The deployment workflow needs a secure key to act on your behalf.

1.  In the **Firebase Console**, go to **Project settings** (click the gear icon) -> **Service accounts**.
2.  Click **Generate new private key**. A JSON file will download. **Keep this file secure.**

### B. Add Secrets to GitHub

1.  In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret** for each of the following:

| Secret Name                | Value                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| `FIREBASE_SERVICE_ACCOUNT` | Copy and paste the **entire content** of the JSON file you just downloaded. |
| `GOOGLE_API_KEY`           | Your Google AI API key (for Genkit).                               |
| `NEXT_PUBLIC_...`          | Add all the `NEXT_PUBLIC_` variables from your `.env` file here.   |

---

## Step 3: Trigger Your First Automated Deployment

Now that everything is configured, simply push your latest code changes to the `main` branch of your GitHub repository.

```bash
git add .
git commit -m "Final configuration setup"
git push origin main
```

You can watch the deployment progress in the **Actions** tab of your GitHub repository. Once it completes successfully, your site will be live and all features should be functional.
