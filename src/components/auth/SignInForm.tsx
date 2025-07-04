"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useRouter } from "@/navigation";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { verifyRecaptcha } from "@/actions/auth";

declare const grecaptcha: any;

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function SignInForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      if (!auth) {
        throw new Error("Firebase is not configured.");
      }
      
      if (typeof grecaptcha === 'undefined' || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        throw new Error("reCAPTCHA script not loaded or site key not configured.");
      }

      await grecaptcha.enterprise.ready();
      const token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'SIGNIN' });

      const recaptchaResult = await verifyRecaptcha({ token, action: 'SIGNIN' });

      if (!recaptchaResult.success) {
        throw new Error(`reCAPTCHA verification failed: ${recaptchaResult.message}`);
      }

      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Signed In",
        description: "Successfully signed in to TERAMOTO.",
      });
      router.push("/");

    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full max-w-sm">
      <GoogleSignInButton />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordLabel")}</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("signInButton")}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            {t("signUpButton")}
          </Link>
        </p>
        </form>
      </Form>
    </div>
  );
}
