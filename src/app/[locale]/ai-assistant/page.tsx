"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { gearRecommendation, type GearRecommendationInput, type GearRecommendationOutput } from "@/ai/flows/gear-recommendation";
import { GearRecommendationForm } from "@/components/ai/GearRecommendationForm";
import { GearRecommendationDisplay } from "@/components/ai/GearRecommendationDisplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AIAssistantPage() {
  const t = useTranslations("AIAssistantPage");
  const [recommendations, setRecommendations] = useState<GearRecommendationOutput['recommendedGear'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: GearRecommendationInput) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await gearRecommendation(data);
      setRecommendations(result.recommendedGear);
    } catch (e) {
      console.error(e);
      setError(t("errorRecommendations"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline text-center mb-4 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500">
        {t("title")}
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t("formTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <GearRecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>

        <div className="md:col-span-2 animate-in fade-in-0 slide-in-from-right-10 duration-500 delay-400">
          <h2 className="text-2xl font-bold font-headline mb-6">{t("recommendationsTitle")}</h2>
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {recommendations && recommendations.length > 0 && (
            <GearRecommendationDisplay recommendations={recommendations} />
          )}
          {recommendations && recommendations.length === 0 && !isLoading && (
             <p className="text-muted-foreground">{t("noRecommendations")}</p>
          )}
          {!recommendations && !isLoading && !error && (
            <p className="text-muted-foreground">{t("noRecommendations")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
