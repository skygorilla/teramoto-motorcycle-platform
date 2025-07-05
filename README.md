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
*   **Authentication & Hosting**: Firebase App Hosting
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
    Create a file named `.env` in the root of the project. A `.gitignore` file is included to prevent this file from being committed.
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

3.  **Install dependencies and run:**
    ```bash
    npm install
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

---

## 🔧 Version Control & Best Practices

### `.gitignore`
To keep the repository clean and lightweight, we use a `.gitignore` file to exclude unnecessary files and folders. Key exclusions include:
```gitignore
# Node.js & Build Artifacts
node_modules/
.next/
dist/
out/
.env*

# Archives & Logs
*.tar.gz
*.log

# OS generated
.DS_Store
Thumbs.db
```

### Git LFS for Large Files
This repository uses **Git Large File Storage (LFS)** to handle media files like images, audio, and large archives. This keeps the main repository fast and avoids push failures.

The `.gitattributes` file is already configured to track common large file types:
```
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.mp3 filter=lfs diff=lfs merge=lfs -text
*.tar.gz filter=lfs diff=lfs merge=lfs -text
```
To contribute, ensure you have Git LFS installed on your system: `git lfs install`.

---

## 🚀 Deployment & Linking to `tera-moto.hr`

This project is set up for easy deployment with **Firebase App Hosting**. Firebase will automatically build and deploy your site whenever you push to the `main` branch.

### Step 1: Connect Firebase to GitHub
1.  Go to the **[Firebase Console](https://console.firebase.google.com/)** and select your project (`teramoto-yd0q5`).
2.  Navigate to the **App Hosting** section.
3.  Connect your GitHub account and select the `skygorilla/teramoto-motorcycle-platform` repository.
4.  Configure the deployment settings to build from your main branch.

### Step 2: Set Environment Variables in Firebase
Your local `.env` file is not pushed to GitHub for security. You must configure your secrets in the Firebase Console:
1.  In App Hosting, go to the settings for your backend.
2.  Find the **Environment variables** section.
3.  Add all the same keys and values from your local `.env` file.

### Step 3: Add Your Custom Domain
1.  In the Firebase App Hosting dashboard, click **Add custom domain**.
2.  Enter `tera-moto.hr` and follow the instructions to add the provided DNS records to your domain registrar.

---

## ⚠️ Troubleshooting Common Git Issues

### Issue 1: Push Fails (File > 100MB)
If you see `File X is ... MB; this exceeds GitHub's file size limit`, you've tried to commit a large file that isn't tracked by Git LFS.

**Solution: Move the File to Git LFS**
1.  **Install Git LFS:** `git lfs install`
2.  **Track the file type:** `git lfs track "*.filetype"` (e.g., `*.zip`)
3.  **Remove the large file from Git's cache:** `git rm --cached <your-large-file>`
4.  **Re-add the file:** `git add .gitattributes <your-large-file>`
5.  **Commit and push:** `git commit -m "Move large file to LFS"` and `git push origin main`

### Issue 2: Push Fails (Timeout or `remote end hung up`)
This happens if the total push size is too large. The best fix is to use a more stable SSH connection.

**Solution: Use SSH**
```bash
# Check your remote URL
git remote -v

# If it's an https:// URL, switch it
git remote set-url origin git@github.com:skygorilla/teramoto-motorcycle-platform.git

# Then try your push again
git push origin main
```

### Issue 3: Branch Configuration Error ("no such ref was fetched")
This means your local branch isn't tracking the remote branch correctly.

**Solution: Reset your branch tracking**
```bash
git remote set-head origin -a
git branch --set-upstream-to=origin/main main
```

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo and create a pull request from a separate branch. Before committing, ensure you’ve run:

```bash
npm run lint && npm run build
```
This will check for code style issues and verify that the project builds successfully.
