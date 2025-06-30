"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  CalendarCheck,
  ShoppingBag,
  Sparkles,
  CircleUserRound,
  Truck, 
  CarFront,
  type LucideIcon 
} from "lucide-react";

// Map string keys to actual Lucide icon components
const iconMap: { [key: string]: LucideIcon | undefined } = {
  "Navigation.home": Home,
  "Navigation.appointments": CalendarCheck,
  "Navigation.marketplace": ShoppingBag,
  "Navigation.gear_advisor": Sparkles, // Changed from Navigation.ai_assistant
  "Navigation.vehicle_sales": CarFront,
  "Navigation.transport_roadside": Truck,
  "Navigation.my_account": CircleUserRound,
};

export function SidebarNav() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {siteConfig.mainNav.map((item) => {
        const IconComponent = iconMap[item.titleKey];
        return (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start font-nav tracking-wider text-base",
              pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
            )}
            asChild
          >
            <Link href={item.href}>
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {t(item.titleKey as any)}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
