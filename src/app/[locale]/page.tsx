
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Zap, PackageCheck, ArrowRight, BatteryWarning, Gauge, ShieldAlert, KeyRound, TrendingUp, Palette, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { siteImages } from "@/config/images";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const commonProblems = [
    {
      icon: BatteryWarning,
      titleKey: "problemBatteryTitle",
      descriptionKey: "problemBatteryDescription",
      ctaKey: "problemBatteryCTA",
      dataAiHint: "motorcycle battery",
    },
    {
      icon: Gauge,
      titleKey: "problemTireTitle",
      descriptionKey: "problemTireDescription",
      ctaKey: "problemTireCTA",
      dataAiHint: "motorcycle tire",
    },
    {
      icon: ShieldAlert,
      titleKey: "problemBrakeTitle",
      descriptionKey: "problemBrakeDescription",
      ctaKey: "problemBrakeCTA",
      dataAiHint: "motorcycle brakes",
    },
    {
      icon: KeyRound,
      titleKey: "problemStartingTitle",
      descriptionKey: "problemStartingDescription",
      ctaKey: "problemStartingCTA",
      dataAiHint: "motorcycle ignition",
    },
  ];

  const premiumServices = [
    {
      icon: Wrench,
      titleKey: "premiumServiceExpertMaintenanceTitle",
      descriptionKey: "premiumServiceExpertMaintenanceDescription",
      itemsKey: "premiumServiceExpertMaintenanceItems",
      dataAiHint: "motorcycle maintenance",
    },
    {
      icon: TrendingUp,
      titleKey: "premiumServicePerformanceUpgradesTitle",
      descriptionKey: "premiumServicePerformanceUpgradesDescription",
      itemsKey: "premiumServicePerformanceUpgradesItems",
      dataAiHint: "motorcycle performance",
    },
    {
      icon: Palette,
      titleKey: "premiumServiceCustomDesignTitle",
      descriptionKey: "premiumServiceCustomDesignDescription",
      itemsKey: "premiumServiceCustomDesignItems",
      dataAiHint: "motorcycle custom design",
    },
    {
      icon: ShieldCheck,
      titleKey: "premiumServiceExtendedWarrantyTitle",
      descriptionKey: "premiumServiceExtendedWarrantyDescription",
      itemsKey: "premiumServiceExtendedWarrantyItems",
      dataAiHint: "motorcycle warranty",
    },
  ];

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-4 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500 drop-shadow-primary-glow-md">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 delay-300">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105">
            <Link href="/appointments">
              {t("ctaAppointments")} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-all transform hover:scale-105">
            <Link href="/marketplace">
              {t("ctaMarketplace")} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full mb-16">
        <Image 
          src={siteImages.heroBanner}
          alt="Motorcycle banner" 
          width={1200} 
          height={400} 
          className="rounded-lg shadow-xl object-cover w-full animate-in fade-in-0 scale-95 duration-700 delay-500"
          priority
        />
      </section>

      <section className="w-full mb-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-4 animate-in fade-in-0 duration-500 delay-600">
          {t("commonProblemsTitle")}
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto animate-in fade-in-0 duration-500 delay-650">
          {t("commonProblemsSubtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commonProblems.map((problem, index) => (
            <Card 
              key={problem.titleKey} 
              className="bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col animate-in fade-in-0 slide-in-from-bottom-10" 
              style={{animationDelay: `${700 + index * 100}ms`}}
            >
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <problem.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{t(problem.titleKey as any)}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <CardDescription>{t(problem.descriptionKey as any)}</CardDescription>
              </CardContent>
              <CardFooter className="mt-auto p-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/appointments">
                    {t(problem.ctaKey as any)} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full">
        <h2 className="text-3xl font-bold font-headline text-center mb-4 animate-in fade-in-0 duration-500 delay-\[1100ms\]">
          {t("premiumServicesTitle")}
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto animate-in fade-in-0 duration-500 delay-\[1150ms\]">
          {t("premiumServicesSubtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumServices.map((service, index) => (
            <Card 
              key={t(service.titleKey as any)} 
              className="bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col group animate-in fade-in-0 slide-in-from-bottom-10" 
              style={{animationDelay: `${1200 + index * 150}ms`}}
              data-ai-hint={service.dataAiHint}
            >
              <CardContent className="p-6 space-y-3 text-center flex flex-col flex-grow">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="font-headline text-xl text-foreground mb-1">{t(service.titleKey as any)}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground mb-2 flex-grow">{t(service.descriptionKey as any)}</CardDescription>
                
                <ul className="space-y-1.5 text-left self-start w-full pt-2 mt-auto">
                  {(t.raw(service.itemsKey as any) as string[]).map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2.5 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
