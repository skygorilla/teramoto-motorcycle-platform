
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
  LayoutDashboard,
  type LucideIcon 
} from "lucide-react";

// Map string keys to actual Lucide icon components
const iconMap: { [key: string]: LucideIcon | undefined } = {
  "Navigation.home": Home,
  "Navigation.appointments": CalendarCheck,
  "Navigation.marketplace": ShoppingBag,
  "Navigation.gear_advisor": Sparkles,
  "Navigation.vehicle_sales": CarFront,
  "Navigation.transport_roadside": Truck,
  "Navigation.admin": LayoutDashboard,
  "Navigation.my_account": CircleUserRound,
};

export function SidebarNav() {
  const t = useTranslations();
  const pathname = usePathname();
  // const { isAdmin } = useAuth(); // Removed auth dependency
  const isAdmin = false; // Default to false

  return (
    <nav className="flex flex-col gap-2 p-4">
      {siteConfig.mainNav.map((item) => {
        // Hide admin link for now
        if (item.href === '/admin') {
          return null;
        }
        
        const IconComponent = iconMap[item.titleKey];
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start font-nav tracking-wider text-base",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            asChild
          >
            <Link href={item.href as any}>
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {t(item.titleKey as any)}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
