
"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/marketplace/ProductCard";
import type { Product } from "@/types";

const placeholderProducts: Product[] = [
  {
    id: "1",
    name: "Pro Rider Helmet X1",
    price: 299.99,
    description: "High-performance helmet with advanced safety features and aerodynamic design. Perfect for track and road.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "motorcycle helmet",
  },
  {
    id: "2",
    name: "All-Weather Jacket",
    price: 199.50,
    description: "Durable and waterproof jacket with removable thermal liner, suitable for all riding conditions.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "motorcycle jacket",
  },
  {
    id: "3",
    name: "Leather Riding Gloves",
    price: 79.00,
    description: "Premium leather gloves offering excellent protection and grip, with reinforced knuckles.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "motorcycle gloves",
  },
  {
    id: "4",
    name: "Touring Boots Pro",
    price: 249.00,
    description: "Comfortable and protective touring boots, designed for long rides with waterproof membrane.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "motorcycle boots",
  },
  {
    id: "5",
    name: "Performance Exhaust System",
    price: 450.00,
    description: "Lightweight exhaust system to boost performance and sound for sport bikes.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "motorcycle exhaust",
  },
  {
    id: "6",
    name: "Motorcycle Cover XL",
    price: 49.99,
    description: "Heavy-duty, waterproof motorcycle cover to protect your bike from the elements.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "motorcycle cover",
  },
];

export default function MarketplacePage() {
  const t = useTranslations("MarketplacePage");

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold font-headline text-center mb-4 text-primary animate-in fade-in-0 slide-in-from-top-8 duration-500">
        {t("title")}
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-12 animate-in fade-in-0 slide-in-from-top-12 duration-500 delay-200">
        {t("browseProducts")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {placeholderProducts.map((product, index) => (
          <div key={product.id} className="animate-in fade-in-0 slide-in-from-bottom-10" style={{animationDelay: `${300 + index * 100}ms`}}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
