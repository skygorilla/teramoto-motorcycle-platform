
# TERAMOTO Automated Deployment Guide

This document explains the continuous deployment (CD) pipeline for the TERAMOTO application, which uses GitHub Actions to automatically deploy to Firebase App Hosting.

## How It Works

The deployment process is configured in the `.github/workflows/deploy.yml` file. Here’s a summary of the workflow:

1.  **Trigger**: The workflow runs automatically whenever new code is pushed to the `main` branch of the GitHub repository.
2.  **Setup**: It sets up a clean Node.js (v20) environment.
3.  **Install & Build**: It securely installs all project dependencies (`npm ci`) and builds the Next.js application for production (`npm run build`). During this step, it uses secrets from your GitHub repository (like Firebase and Google API keys) as environment variables.
4.  **Deploy**: It uses the official `FirebaseExtended/action-hosting-deploy@v0` action to deploy the built application to Firebase App Hosting. Authentication is handled securely using a Firebase Service Account.

The `firebase.json` file is configured with a `rewrite` rule that directs all traffic from your custom domain (managed by Firebase Hosting) to your application running on Firebase App Hosting. This is what fixes the "Site Not Found" error for custom domains.

---

## Setup Instructions

To enable this automated deployment, you only need to add one secret to your GitHub repository.

### Step 1: Generate a Firebase Service Account

A service account is a secure identity that allows GitHub Actions to deploy to your Firebase project on your behalf.

1.  Go to the **Firebase Console**, select your `teramoto-yd0q5` project.
2.  Click the gear icon next to "Project Overview" and select **Project settings**.
3.  Go to the **Service accounts** tab.
4.  Click the **Generate new private key** button. A JSON file will be downloaded. **Treat this file like a password and do not commit it to your repository.**

### Step 2: Add the Service Account to GitHub Secrets

1.  In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret**.
3.  For the **Name**, enter exactly `FIREBASE_SERVICE_ACCOUNT`.
4.  For the **Secret**, copy the **entire contents** of the JSON file you downloaded in Step 1 and paste it into the text box.
5.  Click **Add secret**.

You will also need to add all the other environment variables (like `NEXT_PUBLIC_FIREBASE_API_KEY` and `GOOGLE_API_KEY`) as secrets so the build step can access them.

---

## Monitoring Deployments

-   **GitHub Actions**: You can watch the progress of your deployments in the "Actions" tab of your GitHub repository. Here you can see the build logs in real-time.
-   **Firebase Console**: In the Firebase console for your project, navigate to the **App Hosting** section. You will see a history of your rollouts, their status, and links to the build logs.

---

## Troubleshooting

-   **Build Failure**: Check the logs in the failed GitHub Actions run. The most common issues are missing dependencies in `package.json` or TypeScript/code errors that prevent the `npm run build` command from succeeding.
-   **Authentication Error / Unauthorized Domain**: This is the most common runtime error. It means the domain your app is running on (including preview URLs) is not added to the **Authorized domains** list in Firebase.
    -   **Fix**: Go to **Firebase Console** -> **Authentication** -> **Settings** -> **Authorized domains** and add the necessary domains (e.g., `tera-moto.hr`, `teramoto-yd0q5.web.app`, and any `*.hosted.app` preview URLs).
-   **"Site Not Found" on Custom Domain**: This means the `rewrite` rule in `firebase.json` is not working or the deployment failed. Ensure `firebase.json` is correct and that the `backendId` (`studio`) matches the one in your App Hosting console.
