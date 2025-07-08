"use client";

import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function GoogleSignInButton() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRedirectResult = async () => {
      if (!auth) return;
      
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Google sign-in successful:", result.user.email);
          toast({
            title: "Signed In",
            description: "Successfully signed in with Google.",
          });
          router.push("/dashboard");
        }
      } catch (error: any) {
        console.error("Google redirect error:", error);
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: error.message || "Failed to complete Google sign-in.",
        });
      }
    };
    
    handleRedirectResult();
  }, [toast, router]);

  const signInWithGoogle = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Firebase is not configured. Please check your .env file.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      console.log("Starting Google sign-in redirect...");
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      let errorMessage = "Failed to sign in with Google.";
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Google Sign-In not configured in Firebase Console.";
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "Domain not authorized. Add your domain to Firebase Console.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={signInWithGoogle}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      Continue with Google
    </Button>
  );
}