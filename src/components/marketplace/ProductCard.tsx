
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("ProductCard");
  const common_t = useTranslations("Common");

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out animate-in fade-in-0">
      <CardHeader className="p-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
          data-ai-hint={product.dataAiHint || "product image"}
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {product.description}
        </CardDescription>
        <p className="text-lg font-semibold text-primary">
          {t("price")}: ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" className="w-full">
          {t("viewDetails")} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
