"use client";

import { signInWithRedirect, FacebookAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function FacebookSignInButton() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithFacebook = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Firebase is not configured.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error("Facebook sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: error.message || "Failed to sign in with Facebook.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full bg-[#1877F2] text-white hover:bg-[#166FE5]"
      onClick={signInWithFacebook}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )}
      Continue with Facebook
    </Button>
  );
}