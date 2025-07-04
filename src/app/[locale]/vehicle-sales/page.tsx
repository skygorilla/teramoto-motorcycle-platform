
"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { siteImages } from "@/config/images";
import { EditableImage } from "@/components/shared/EditableImage";

export default function VehicleSalesPage() {
  const t = useTranslations("VehicleSalesPage");

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-300">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t("sellYourVehicleTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[3/2] overflow-hidden rounded-lg shadow-md mb-6">
              <EditableImage
                imageKey="sellVehicle"
                src={siteImages.sellVehicle}
                alt="Motorcycle for sale"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground mb-4">{t("sellYourVehicleDescription")}</p>
            <Button asChild className="w-full">
              <Link href="/appointments">
                {t("contactUs")}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-in fade-in-0 slide-in-from-right-10 duration-500 delay-400">
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t("lookingToBuyTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[3/2] overflow-hidden rounded-lg shadow-md mb-6">
              <EditableImage
                imageKey="buyVehicle"
                src={siteImages.buyVehicle}
                alt="Person looking at motorcycles"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground mb-4">{t("lookingToBuyDescription")}</p>
             <Button asChild className="w-full">
              <Link href="/appointments">
                {t("contactUs")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="text-center py-8 animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-500">
        <h2 className="text-2xl font-bold font-headline mb-3">{t("contactUs")}</h2>
        <p className="text-muted-foreground mb-6">
          Za detaljne informacije o našim uslugama prodaje i kupnje vozila, slobodno nas kontaktirajte.
        </p>
        <Button size="lg">
          <Link href="/appointments">Zakažite Konzultacije</Link>
        </Button>
      </section>
    </div>
  );
}
