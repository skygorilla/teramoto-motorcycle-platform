
"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/marketplace/ProductCard";
import type { Product } from "@/types";
import { PackageOpen } from "lucide-react";

// The product list is now empty, ready for real products to be added from a database.
const products: Product[] = [];

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

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="animate-in fade-in-0 slide-in-from-bottom-10" style={{animationDelay: `${300 + index * 100}ms`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-border rounded-lg bg-card/50 animate-in fade-in-0 duration-500 delay-300">
          <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold font-headline">{t("noProductsTitle")}</h2>
          <p className="text-muted-foreground mt-2 max-w-md">{t("noProductsDescription")}</p>
        </div>
      )}
    </div>
  );
}
