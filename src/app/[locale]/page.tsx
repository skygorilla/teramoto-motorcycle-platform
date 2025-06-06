import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Zap, PackageCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const services = [
    {
      icon: Wrench,
      title: t("service1Title"),
      description: t("service1Description"),
      dataAiHint: "motorcycle repair",
    },
    {
      icon: Zap,
      title: t("service2Title"),
      description: t("service2Description"),
      dataAiHint: "custom motorcycle",
    },
    {
      icon: PackageCheck,
      title: t("service3Title"),
      description: t("service3Description"),
      dataAiHint: "motorcycle gear",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col items-center py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold font-headline mb-4 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500 drop-shadow-primary-glow-md">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
          {t("subtitle")}
        </p>
        <div className="flex justify-center gap-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 delay-300">
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
          src="https://placehold.co/1200x400.png" 
          alt="Motorcycle banner" 
          width={1200} 
          height={400} 
          className="rounded-lg shadow-xl object-cover w-full animate-in fade-in-0 duration-700 delay-500"
          data-ai-hint="motorcycle workshop" 
        />
      </section>

      <section className="w-full">
        <h2 className="text-3xl font-bold font-headline text-center mb-10 animate-in fade-in-0 duration-500 delay-700">
          {t("servicesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={service.title} className="bg-card hover:shadow-2xl transition-shadow duration-300 animate-in fade-in-0 slide-in-from-bottom-10" style={{animationDelay: `${800 + index * 150}ms`}}>
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
