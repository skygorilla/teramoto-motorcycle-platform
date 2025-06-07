
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const requiredEnvVars: Array<keyof typeof process.env> = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  // Add other essential vars if needed, e.g., appId, storageBucket, messagingSenderId,
  // depending on what Firebase services you use and their minimum requirements.
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  const message = `ERROR: Firebase configuration is incomplete. The following environment variables are missing: ${missingEnvVars.join(', ')}. Please ensure they are set in your .env file or environment. App may not function correctly.`;
  console.error(message);
  // Optionally, you could throw an error here to halt execution if a completely non-functional state is preferred over a partially broken one.
  // throw new Error(message);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

// Check if all essential config values are present before initializing
// This provides a clearer error than the generic Firebase SDK error sometimes.
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error("CRITICAL ERROR: Firebase apiKey, authDomain, or projectId is missing. Firebase cannot be initialized.");
  // Depending on desired behavior, you might throw an error or ensure `app` and `auth` are handled gracefully.
  // For now, we let initializeApp attempt and potentially throw its own error,
  // but the console logs above should provide earlier warnings.
}


if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("Firebase initialization failed:", e);
    // Gracefully handle the error, e.g., by setting app to a state that can be checked elsewhere
    // or by re-throwing to ensure the app doesn't proceed in a broken state.
    // For this example, we'll let the error propagate if not caught by higher-level components.
    throw e; 
  }
} else {
  app = getApps()[0];
}

// Ensure app is initialized before calling getAuth
let auth: Auth;
try {
  auth = getAuth(app);
} catch (e) {
  console.error("Failed to initialize Firebase Auth:", e);
  // Handle the case where app might not have been initialized successfully
  // This is a fallback, ideally initializeApp would have thrown clearly.
  // @ts-ignore
  auth = null; // Or some other placeholder/error state
  throw e;
}


export { app, auth };
