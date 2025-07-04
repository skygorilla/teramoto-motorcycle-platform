
"use client";

import { SignUpForm } from "@/components/auth/SignUpForm";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  const t = useTranslations("Auth");

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 animate-in fade-in-0 duration-500">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-headline">{t("signUpTitle")}</CardTitle>
          <CardDescription>Join TERAMOTO and access exclusive services.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
