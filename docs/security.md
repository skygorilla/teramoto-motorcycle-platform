# Project Security & Secrets Management

This document provides a guide to setting up the necessary environment variables and security credentials for the TERAMOTO application.

## 🔑 Environment Variables

This project uses environment variables to manage secret keys and configuration settings. This is a security best practice that prevents sensitive information from being hardcoded and committed to version control.

### Setup Process

1.  **Copy the Template:** In the root of the project, find the `.env.example` file. Make a copy of this file and rename it to `.env`.
2.  **Fill in the Values:** Open your new `.env` file and fill in the values for each variable as described below.
3.  **Keep it Secret:** The `.env` file is listed in `.gitignore` and should **never** be committed to your GitHub repository.

---

## 🔥 Firebase Credentials

These keys connect your web application to your Firebase project for features like Authentication and Firestore.

**Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Where to find them:**
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project (`teramoto-yd0q5`).
3.  Click the gear icon ⚙️ next to "Project Overview" and select **Project settings**.
4.  Under the **General** tab, scroll down to the "Your apps" section.
5.  Select your web app (if you don't have one, create one).
6.  Choose the **Config** option to view the `firebaseConfig` object.
7.  Copy the corresponding values into your `.env` file.

---

## 🤖 Google AI (Genkit) Credentials

This key is required for the AI Assistant features, powered by Google's Gemini models.

**Variable:**
```
GOOGLE_API_KEY=...
```

**Where to find it:**
1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Click on the **"Get API key"** button.
3.  Create a new API key in a new or existing Google Cloud project.
4.  Copy the key and paste it into your `.env` file.

---

## 🛡️ Google reCAPTCHA Enterprise Credentials

This is critical for securing your sign-in and sign-up forms against bots and abuse.

**Important:** The reCAPTCHA settings in the Firebase Console (under Authentication > Settings) are for protecting built-in Firebase services like Phone Auth. For our custom forms, we need to create a dedicated key in the **Google Cloud Console**.

**Variable:**
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
```

**How to get the Site Key:**
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Make sure you have selected the correct project (the one associated with your Firebase project, `teramoto-yd0q5`).
3.  Use the search bar at the top to find and navigate to **"reCAPTCHA Enterprise"**.
4.  If it's your first time, you may need to **Enable** the API.
5.  Click **"+ Create Key"** at the top.
6.  **Display Name:** Give it a memorable name, like `TERAMOTO Web App`.
7.  **Choose platform type:** Select **Website**.
8.  **Domains:** Add all the domains where your app will run. This is the most important step.
    *   `tera-moto.hr` (your production domain)
    *   `studio--teramoto-yd0q5.us-central1.hosted.app` (your App Hosting preview domain)
    *   `localhost` (for local development)
9.  **Use reCAPTCHA v3:** This option is usually the default. It works in the background without user interaction.
10. **Disable "Verify domains" checkbox:** For development and preview environments like Firebase Studio, it's often easier to disable domain verification. You can enable it later for production if you wish.
11. Click **Create Key**.
12. After the key is created, you will see your **Site Key**. Copy this value and paste it into the `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` variable in your `.env` file.

By following these steps, you will have a secure and correctly configured application.
