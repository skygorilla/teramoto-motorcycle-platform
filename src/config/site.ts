
export type NavItem = {
  titleKey: string; // Key for translation
  href: string;
  icon?: React.ElementType; // Lucide icon component
};

export const siteConfig = {
  name: "TERAMOTO",
  description: "Motorcycle services, marketplace, and AI gear assistance.",
  mainNav: [
    { titleKey: "Navigation.home", href: "/" },
    { titleKey: "Navigation.appointments", href: "/appointments" },
    { titleKey: "Navigation.marketplace", href: "/marketplace" },
    { titleKey: "Navigation.ai_assistant", href: "/ai-assistant" },
    { titleKey: "Navigation.vehicle_sales", href: "/vehicle-sales" },
    { titleKey: "Navigation.transport_roadside", href: "/transport-roadside" },
    { titleKey: "Navigation.my_account", href: "/account" },
  ] as NavItem[],
};
