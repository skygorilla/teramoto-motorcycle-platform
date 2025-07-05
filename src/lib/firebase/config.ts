import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIXy-LgcODghnxFzwOpUiT6bTkP1Duey4",
  authDomain: "teramoto-yd0q5.firebaseapp.com",
  projectId: "teramoto-yd0q5",
  storageBucket: "teramoto-yd0q5.appspot.com",
  messagingSenderId: "163038206054",
  appId: "1:163038206054:web:cec06c9e480e1982bcf5a7"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// This check ensures that all necessary Firebase environment variables are available.
// If they are, Firebase is initialized.
if (
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
) {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
} else {
  // A clear error for developers if the config is incomplete.
  console.error(
    "CRITICAL ERROR: Firebase configuration is incomplete. "
  );
}

// Export the initialized app and auth services. They will be null if config is missing.
export { app, auth };
