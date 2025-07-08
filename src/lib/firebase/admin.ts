import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

// This logic runs only on the server, where environment variables are secure.
// It will only initialize if the full service account is provided.
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  if (getApps().length === 0) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });

      adminAuth = getAuth(adminApp);
      adminDb = getFirestore(adminApp);
      
      console.log("Firebase Admin SDK initialized successfully.");

    } catch (error) {
      console.error("Firebase Admin initialization error:", error);
    }
  } else {
    adminApp = getApps()[0];
    adminAuth = getAuth(adminApp);
    adminDb = getFirestore(adminApp);
  }
} else {
    console.warn(
        "FIREBASE_SERVICE_ACCOUNT environment variable is not set. " +
        "Firebase Admin features will be unavailable in this environment."
    );
}

export { adminAuth, adminDb };
