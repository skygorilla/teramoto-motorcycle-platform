
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
  }, []); // Run once on mount

  // This initial loading state is for the auth check.
  // If firebase is not configured, loading should become false quickly via useEffect.
  if (loading && isFirebaseConfigured) { 
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, firebaseConfigError: configError }}>
      {configError && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, 
          backgroundColor: 'rgb(139, 0, 0, 0.95)', /* DarkRed with slight transparency */
          color: 'white', padding: '12px', textAlign: 'center', zIndex: 9999,
          fontSize: '0.9rem', borderBottom: '3px solid #660000',
          maxHeight: '30vh', overflowY: 'auto',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Application Configuration Error
          </h3>
          <p style={{margin: '0 0 8px 0'}}>
            Firebase is not correctly configured. Authentication and related features will be disabled.
          </p>
          <p style={{margin: '0 0 10px 0'}}>
            Please check your <code>.env</code> file for the required Firebase credentials and <strong>restart the server</strong>.
          </p>
          <details style={{
            background: 'rgba(0,0,0,0.2)', 
            padding: '8px', 
            borderRadius: '4px', 
            cursor: 'pointer'
          }}>
            <summary style={{fontWeight: 'bold', userSelect: 'none'}}>Show Error Details</summary>
            <pre style={{
              fontSize: '0.75rem', textAlign: 'left', background: 'rgba(0,0,0,0.3)', color: '#f0f0f0',
              padding: '8px', borderRadius: '4px', marginTop: '8px', whiteSpace: 'pre-wrap', 
              wordBreak: 'break-all', maxHeight: '10vh', overflowY: 'auto'
            }}>
              {configError}
            </pre>
          </details>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}
