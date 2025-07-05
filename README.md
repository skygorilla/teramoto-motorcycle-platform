# TERAMOTO - Motorcycle Service Platform

This is the official repository for the TERAMOTO motorcycle service platform, built with Next.js, Firebase, and Genkit AI.

## About The Project

TERAMOTO is a comprehensive platform designed for motorcycle enthusiasts, combining:
-   **Workshop Booking**: Schedule service appointments easily.
-   **Parts Marketplace**: Browse and purchase gear and parts.
-   **AI Gear Advisor**: Get intelligent recommendations for the right equipment.
-   **Vehicle Sales**: Assistance with buying or selling a motorcycle.
-   **User Accounts**: Manage your profile, appointments, and orders.

## Tech Stack

*   **Framework**: Next.js 14 (with App Router)
*   **Authentication & Hosting**: Firebase
*   **AI**: Google's Genkit
*   **UI**: Shadcn UI & Tailwind CSS
*   **Language**: TypeScript
*   **Internationalization**: `next-intl` for English & Croatian

---

## Getting Started (Local Development)

To run this project locally, you'll need to set up your environment variables.

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:skygorilla/teramoto-motorcycle-platform.git
    cd teramoto-motorcycle-platform
    ```
2.  **Create an environment file:**
    Create a file named `.env` in the root of the project.

3.  **Add Firebase & Genkit Credentials:**
    Populate the `.env` file with your Firebase and Google AI credentials. You can get these from your Firebase project settings and Google AI Studio.
    ```env
    # Firebase Client-side Config
    NEXT_PUBLIC_FIREBASE_API_KEY=AIz...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=teramoto-yd0q5
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...

    # Firebase Admin Email
    NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com

    # reCAPTCHA
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdpgHcrAAAAACxK1VEg3HtmhQmuRguFkgZcJdfS

    # Google AI (Genkit)
    GOOGLE_API_KEY=AIz...
    ```

4.  **Install dependencies and run:**
    ```bash
    npm install
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

---

## Deployment & Linking to `tera-moto.hr`

This project is set up for easy deployment with **Firebase App Hosting**.

### Step 1: Push Your Code to GitHub

First, make sure all your code is pushed to this GitHub repository.
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
*(Note: Your main branch might be called `main`, `master`, or `tera`. Adjust the command accordingly.)*

### Step 2: Connect Firebase to GitHub

1.  Go to the **[Firebase Console](https://console.firebase.google.com/)** and select your project (`teramoto-yd0q5`).
2.  Navigate to the **App Hosting** section.
3.  Connect your GitHub account and select the `skygorilla/teramoto-motorcycle-platform` repository.
4.  Configure the deployment settings to build from your main branch.

### Step 3: Set Environment Variables in Firebase

Your local `.env` file is not pushed to GitHub for security. You must configure your secrets in the Firebase Console:
1.  In App Hosting, go to the settings for your backend.
2.  Find the **Environment variables** section.
3.  Add all the same keys and values from your local `.env` file (`GOOGLE_API_KEY`, `NEXT_PUBLIC_FIREBASE_API_KEY`, etc.).

### Step 4: Add Your Custom Domain

1.  In the Firebase App Hosting dashboard, click **Add custom domain**.
2.  Enter `tera-moto.hr`.
3.  Firebase will give you DNS records (usually A records or TXT records). You need to add these records in the DNS settings panel of your domain registrar (where you purchased `tera-moto.hr`).
4.  Once the DNS changes are verified by Firebase (this can take a few hours), your site will be live at `https://tera-moto.hr`!

---

## Troubleshooting Common Git Issues

### Issue 1: Push Fails (File > 100MB)

If you see an error like `File X is 256.00 MB; this exceeds GitHub's file size limit of 100.00 MB`, it means a large file was committed.

**Solution: Move the File to Git LFS**

This repository is configured to handle large files using Git LFS. If you've already accidentally committed a large file, you need to remove it from your Git history and re-add it correctly.

1.  **Install Git LFS (if you haven't already):**
    ```bash
    git lfs install
    ```
2.  **Remove the large file from Git's cache (but keep the file):**
    Let's say the large file is `teramoto-complete.tar.gz`. Run:
    ```bash
    git rm --cached teramoto-complete.tar.gz
    ```
3.  **Re-add the file:**
    Git will now see that `.tar.gz` files should be handled by LFS (thanks to the `.gitattributes` file).
    ```bash
    git add teramoto-complete.tar.gz
    ```
4.  **Commit and push:**
    ```bash
    git commit -m "Move large .tar.gz file to Git LFS"
    git push origin main
    ```

### Issue 2: Push Fails (Timeout or `remote end hung up`)

This often happens if the total push size is too large for GitHub's default HTTP connection.

**Solution: Use SSH**

An SSH connection is more stable for large pushes. Check your current remote URL:
```bash
git remote -v
```
If it shows an `https://` URL, switch it to SSH:
```bash
git remote set-url origin git@github.com:skygorilla/teramoto-motorcycle-platform.git
```
Then try your push again.

### Issue 3: Branch Configuration Error ("no such ref was fetched")

If you see this error, it means your local branch isn't tracking the remote branch correctly.

**Solution: Reset your branch tracking**
```bash
# Tell git to update its knowledge of remote branches
git remote set-head origin -a

# Link your local 'main' branch to the remote 'origin/main'
git branch --set-upstream-to=origin/main main
```
After applying these fixes, your `git pull` and `git push origin main` commands should work reliably.
