
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// All environment variables that Firebase SDK will use from firebaseConfig
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firebaseConfigError: string | null = null;

// This is a simpler and more direct check. It verifies that the essential variables are present.
const isFirebaseConfigured =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.authDomain &&
  !!firebaseConfig.projectId;

if (isFirebaseConfigured) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
  } catch (e: any) {
    firebaseConfigError = `Firebase initialization failed: ${e.message}`;
    console.error(firebaseConfigError, e);
    app = null;
    auth = null;
  }
} else {
  // A clear error message for the developer console.
  firebaseConfigError = `CRITICAL ERROR: Firebase configuration is incomplete. Please ensure all NEXT_PUBLIC_FIREBASE_ variables are set in your .env file and that you have RESTARTED the development server.`;
  console.error(firebaseConfigError);
}

export { app, auth, isFirebaseConfigured, firebaseConfigError };
