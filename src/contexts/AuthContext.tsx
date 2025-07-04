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
  firebaseConfigError: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  firebaseConfigError: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseConfigError, setFirebaseConfigError] = useState<string | null>(null);

  useEffect(() => {
    // If the auth object from firebase/config is not null, it means Firebase is configured.
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        setFirebaseConfigError(null); // Clear any previous errors
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If auth object is null, it means Firebase is not configured.
      // Set an error message and stop loading.
      setFirebaseConfigError(
        "Firebase is not configured. Please check your .env file and restart the server."
      );
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Show a global loading spinner while we check for the user's auth state.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, firebaseConfigError }}>
      {children}
    </AuthContext.Provider>
  );
}
