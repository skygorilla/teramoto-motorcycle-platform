
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { BookingForm } from "@/components/appointments/BookingForm";

export default function AppointmentsPage() {
  const t = useTranslations("AppointmentsPage");

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline text-center mb-10 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500">
        {t("title")}
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
        <Card className="animate-in fade-in-0 slide-in-from-left-10 duration-500 delay-300">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t("workshopInfoTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-primary" />
              <span>{t("address")}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-primary" />
              <span>{t("phone")}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              <span>{t("email")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary" />
              <span>{t("openingHours")}</span>
            </div>
          </CardContent>
        </Card>
        
        <div className="animate-in fade-in-0 slide-in-from-right-10 duration-500 delay-400">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt={t("workshopImageAlt")} 
            width={600} 
            height={400} 
            className="rounded-lg shadow-xl object-cover w-full"
            data-ai-hint="mechanic working" 
          />
        </div>
      </div>
      
      <BookingForm />

    </div>
  );
}
