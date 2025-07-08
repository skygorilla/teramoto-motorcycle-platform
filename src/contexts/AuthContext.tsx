
"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/config"; // auth can be null if config is missing
import { Loader2 } from "lucide-react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  firebaseConfigError: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  firebaseConfigError: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firebaseConfigError, setFirebaseConfigError] = useState<string | null>(null);

  useEffect(() => {
    // If the auth object from firebase/config is not null, it means Firebase is configured.
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // Check if the current user is the admin
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        if (adminEmail && currentUser?.email === adminEmail) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
        setFirebaseConfigError(null); // Clear any previous errors
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If auth object is null, it means Firebase is not configured.
      // Set an error message and stop loading.
      setFirebaseConfigError(
        "Firebase is not configured. Please ensure environment variables are set and restart the server."
      );
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, []);

  // Display a clear error message if Firebase configuration is missing.
  if (firebaseConfigError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-2xl rounded-lg border border-destructive bg-card p-6 text-center shadow-2xl">
          <h1 className="text-2xl font-bold font-headline text-destructive">
            Firebase Configuration Error
          </h1>
          <p className="mt-2 text-muted-foreground">
            The application cannot connect to Firebase because the required environment variables are missing.
          </p>
          <div className="mt-4 rounded-md bg-muted p-4 text-left text-sm font-code">
            <p className="font-headline text-base font-semibold">Action Required:</p>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>Create a file named <code>.env</code> in the root of your project.</li>
              <li>Copy the contents from <code>.env.example</code> into the new <code>.env</code> file.</li>
              <li>Fill in the required values from your Firebase project settings.</li>
              <li>Restart the development server.</li>
            </ol>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Detailed Error: {firebaseConfigError}
          </p>
        </div>
      </div>
    );
  }

  // Show a global loading spinner while we check for the user's auth state.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, firebaseConfigError }}>
      {children}
    </AuthContext.Provider>
  );
}
