"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { auth, isFirebaseConfigured, firebaseConfigError as coreFirebaseConfigError } from "@/lib/firebase/config";
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
  const [configError, setConfigError] = useState<string | null>(coreFirebaseConfigError);

  useEffect(() => {
    // Update local configError state if the imported one changes (e.g. during HMR)
    if (coreFirebaseConfigError !== configError) {
      setConfigError(coreFirebaseConfigError);
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If Firebase is not configured, or auth object is null,
      // we are not "loading" Firebase auth state.
      setUser(null); 
      setLoading(false); 
      // Ensure configError state reflects the imported error status if not already set
      if (coreFirebaseConfigError && !configError) {
        setConfigError(coreFirebaseConfigError);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreFirebaseConfigError]); // Rerun if the imported error status changes

  // This initial loading state is for the auth check.
  // It will show until the useEffect determines the auth state.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, firebaseConfigError: configError }}>
      {children}
    </AuthContext.Provider>
  );
}
