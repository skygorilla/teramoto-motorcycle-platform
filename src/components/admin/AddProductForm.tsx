
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ProductFormSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
});

export type ProductFormData = z.infer<typeof ProductFormSchema>;

export function AddProductForm() {
  const t = useTranslations("AdminPage");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    },
  });

  async function onSubmit(data: ProductFormData) {
    setIsLoading(true);
    // Simulate API call to a database
    console.log("New Product Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast({
      title: t("productAddedSuccessTitle"),
      description: t("productAddedSuccessDescription"),
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("formNameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("formNamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("formDescriptionLabel")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("formDescriptionPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t("formPriceLabel")}</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="99.99" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t("formImageUrlLabel")}</FormLabel>
                <FormControl>
                    <Input placeholder="https://placehold.co/400x300.png" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("addProductButton")}
        </Button>
      </form>
    </Form>
  );
}

