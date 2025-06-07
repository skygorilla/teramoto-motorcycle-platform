
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// All environment variables that Firebase SDK will use from firebaseConfig
const allFirebaseEnvVars: Array<keyof NodeJS.ProcessEnv> = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const missingEnvVars = allFirebaseEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  const message = `
CRITICAL ERROR: Firebase configuration is incomplete.
The following environment variables are MISSING:
${missingEnvVars.join('\n')}

Please ensure these are correctly set in your .env file at the root of your project.
Example .env file content:
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890

After adding these to your .env file, you MUST RESTART your Next.js development server for the changes to take effect.
The application will not function correctly until this is resolved.
`;
  console.error(message);
  // Throwing an error here will halt execution, making it very clear the app can't proceed.
  // This is often better than letting it fail silently or in unexpected ways later.
  throw new Error("Firebase configuration environment variables are missing. See console for details.");
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

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("Firebase initialization failed during initializeApp:", e);
    throw e; 
  }
} else {
  app = getApps()[0];
}

let auth: Auth;
try {
  auth = getAuth(app);
} catch (e) {
  console.error("Failed to initialize Firebase Auth:", e);
  throw e;
}

export { app, auth };
