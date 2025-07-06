"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AudioManager } from "@/components/admin/AudioManager";
import { ShieldAlert, Image as ImageIcon, Music, Code } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const t = useTranslations("AdminPage");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // For developer convenience, any logged-in user can access this page.
  // In a production app, you would have a more robust role-based access control system.
  if (!user) {
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
    <div className="container mx-auto py-12 px-4 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
          {t("description")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <Card className="lg:col-span-1 animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ImageIcon className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">{t("manageImagesTitle")}</CardTitle>
            </div>
            <CardDescription>{t("manageImagesDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">1. {t("step1Title")}</h4>
              <p className="text-muted-foreground">{t("imageStep1Description")}</p>
              <pre className="mt-2 p-2 bg-muted rounded-md text-sm font-code">public/images/</pre>
            </div>
            <div>
              <h4 className="font-semibold mb-1">2. {t("step2Title")}</h4>
              <p className="text-muted-foreground">{t("imageStep2Description")}</p>
              <pre className="mt-2 p-2 bg-muted rounded-md text-sm font-code">src/config/images.ts</pre>
            </div>
            <div>
                <h4 className="font-semibold mb-1">3. {t("step3Title")}</h4>
                <p className="text-muted-foreground">{t("imageStep3Description")}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-400">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Music className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-xl">Audio Playlist Manager</CardTitle>
            </div>
            <CardDescription>Drag & drop MP3 files to add background music</CardDescription>
          </CardHeader>
          <CardContent>
            <AudioManager />
          </CardContent>
        </Card>
      </div>
      
      <Alert>
          <Code className="h-4 w-4" />
          <AlertTitle>{t("developerNoteTitle")}</AlertTitle>
          <AlertDescription>
            {t("developerNoteDescription")}
          </AlertDescription>
      </Alert>
    </div>
  );
}
