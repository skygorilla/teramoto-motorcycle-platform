
"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Link } from '@/navigation';
import { MapPin, PhoneIcon, Mail, Clock } from "lucide-react"; // Added icons

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card text-card-foreground py-12 px-4 md:px-8 border-t border-border/40">
      <div className="container mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-headline text-primary mb-2">
            {t("companyName")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto md:mx-0">
            {t("tagline")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4 text-primary">{t("quickLinksTitle")}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">{tNav("home")}</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">{t("linkMotorcycles")}</Link></li>
              <li><Link href="/appointments" className="hover:text-primary transition-colors">{tNav("appointments")}</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("linkAboutUs")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("linkFinancing")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("linkWarranty")}</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4 text-primary">{t("servicesTitle")}</h3>
            <ul className="space-y-2">
              <li><Link href="/appointments" className="hover:text-primary transition-colors">{t("serviceMaintenance")}</Link></li>
              <li><Link href="/appointments" className="hover:text-primary transition-colors">{t("servicePerformanceUpgrades")}</Link></li>
              <li><Link href="/appointments" className="hover:text-primary transition-colors">{t("serviceCustomDesign")}</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">{t("servicePartsAccessories")}</Link></li>
              <li><Link href="/appointments" className="hover:text-primary transition-colors">{t("serviceTestRides")}</Link></li>
              <li><Link href="/vehicle-sales" className="hover:text-primary transition-colors">{t("serviceTradeIns")}</Link></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4 text-primary">{t("contactInfoTitle")}</h3>
            <address className="not-italic space-y-3 text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-primary shrink-0" />
                <span>{t("addressLine1")}<br />{t("addressLine2")}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a href={`tel:${t("phone")}`} className="hover:text-primary transition-colors">{t("phone")}</a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a href={`mailto:${t("email")}`} className="hover:text-primary transition-colors">{t("email")}</a>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-1 text-primary shrink-0" />
                <span>{t("hoursMonFri")}<br />{t("hoursSatSun")}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} {t("companyName")}. {t("copyright")}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("privacyPolicy")}</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("termsOfService")}</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("cookiePolicy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
