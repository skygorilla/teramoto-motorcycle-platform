
"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProductForm } from "@/components/admin/AddProductForm";
import { ImageManager } from "@/components/admin/ImageManager";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, PackageOpen, CalendarClock } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const t = useTranslations("AdminPage");
  const { user, loading } = useAuth();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.email !== adminEmail) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-lg">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>{t("accessDeniedTitle")}</AlertTitle>
          <AlertDescription>
            {t("accessDeniedDescription")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
          {t("description")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-2 animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-200">
          <CardHeader>
            <CardTitle className="font-headline text-xl">How to Manage Site Images</CardTitle>
            <CardDescription>Instructions for adding and changing permanent site images.</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageManager />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t("addProductTitle")}</CardTitle>
            <CardDescription>{t("addProductDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <AddProductForm />
          </CardContent>
        </Card>

        <Card className="animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("productsTitle")}</CardTitle>
                <PackageOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{t("productsDescription")}</p>
                {/* Product list would be rendered here */}
            </CardContent>
        </Card>

        <Card className="animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("appointmentsTitle")}</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{t("appointmentsDescription")}</p>
                {/* Appointments list would be rendered here */}
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
