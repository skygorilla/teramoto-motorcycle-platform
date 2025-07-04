
"use client";

import { SignInForm } from "@/components/auth/SignInForm";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  const t = useTranslations("Auth");

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 animate-in fade-in-0 duration-500">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-headline">{t("signInTitle")}</CardTitle>
          <CardDescription>Access your TERAMOTO account.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
