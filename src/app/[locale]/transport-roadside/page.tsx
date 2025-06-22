
"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Phone, AlertTriangle } from "lucide-react";
import { Link } from "@/navigation";

export default function TransportRoadsidePage() {
  const t = useTranslations("TransportRoadsidePage");
  const tAppointments = useTranslations("AppointmentsPage"); // For accessing the general phone number
  const phoneNumber = tAppointments("phone");

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

      <Card className="animate-in fade-in-0 slide-in-from-bottom-10 duration-500 delay-300">
        <CardHeader>
          <CardTitle className="font-headline text-xl">{t("serviceDetailsTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="md:flex md:items-center md:gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Motorcycle transport"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover w-full"
              data-ai-hint="motorcycle transport van"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <p className="text-muted-foreground">{t("serviceDetailsDescription")}</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Prijevoz motocikala, skutera i quadova</li>
              <li>Pomoć na cesti u slučaju kvara</li>
              <li>Siguran prijevoz do servisa ili željene lokacije</li>
              <li>Dostupnost po dogovoru</li>
            </ul>
            <Button size="lg" className="w-full md:w-auto mt-4" asChild>
              <Link href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" /> {t("requestService")}
              </Link>
            </Button>
             <p className="text-sm text-muted-foreground mt-2">
              Za hitne slučajeve pomoći na cesti, molimo nazovite nas direktno.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-destructive/10 border-destructive animate-in fade-in-0 duration-500 delay-400">
        <CardHeader className="flex flex-row items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <CardTitle className="font-headline text-xl text-destructive">Hitna Pomoć na Cesti</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive/90">
            U slučaju hitne potrebe za pomoći na cesti, nazovite nas odmah na broj: <strong>-</strong>.
            Dostupni smo za hitne intervencije.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
