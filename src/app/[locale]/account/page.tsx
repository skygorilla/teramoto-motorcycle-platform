
"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";
import { Loader2, LogIn } from "lucide-react"; // Added LogIn

export default function AccountPage() {
  const t = useTranslations("AccountPage");
  const { user, loading } = useAuth();
  const tNav = useTranslations("Navigation"); // For signin text

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-3xl font-bold font-headline mb-4 text-primary">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t("notLoggedIn")}
        </p>
        <Button asChild>
          <Link href="/signin">
            <LogIn className="mr-2 h-4 w-4" /> {/* Added icon */}
            {tNav("signin")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-2 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
          {t("description")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t("profileSection")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {user.email}</p>
            {user.displayName && <p><strong>Name:</strong> {user.displayName}</p>}
            {/* Add more profile editing options here */}
          </CardContent>
        </Card>

        <Card className="animate-in fade-in-0 slide-in-from-right-10 duration-500 delay-400">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t("settingsSection")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Account settings will be available here.</p>
            {/* Add settings options like change password, notification preferences, etc. */}
          </CardContent>
        </Card>
      </div>
      
      <Card className="animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-500">
        <CardHeader>
          <CardTitle className="font-headline text-xl">{t("appointmentsSection")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your past and upcoming appointments will be listed here.</p>
          {/* Placeholder for appointments list */}
        </CardContent>
      </Card>

      <Card className="animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-600">
        <CardHeader>
          <CardTitle className="font-headline text-xl">{t("ordersSection")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your marketplace order history will be shown here.</p>
          {/* Placeholder for orders list */}
        </CardContent>
      </Card>

    </div>
  );
}
