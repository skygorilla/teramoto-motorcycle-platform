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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GearRecommendationInput } from "@/ai/flows/gear-recommendation";

interface GearRecommendationFormProps {
  onSubmit: (data: GearRecommendationInput) => void;
  isLoading: boolean;
}

export function GearRecommendationForm({ onSubmit, isLoading }: GearRecommendationFormProps) {
  const t = useTranslations("AIAssistantPage");

  const ridingStyles = [
    { value: "road", label: t("road") },
    { value: "mountain", label: t("mountain") },
    { value: "touring", label: t("touring") },
    { value: "off-road", label: t("offroad") },
    { value: "track", label: t("track") },
  ];

  const weatherConditions = [
    { value: "sunny", label: t("sunny") },
    { value: "rainy", label: t("rainy") },
    { value: "cold", label: t("cold") },
    { value: "variable", label: t("variable") },
  ];

  const budgets = [
    { value: "low", label: t("low") },
    { value: "medium", label: t("medium") },
    { value: "high", label: t("high") },
  ];

  const FormSchema = z.object({
    ridingStyle: z.string().min(1, { message: "Riding style is required." }),
    weatherConditions: z.string().min(1, { message: "Weather conditions are required." }),
    budget: z.string().min(1, { message: "Budget is required." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ridingStyle: "",
      weatherConditions: "",
      budget: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ridingStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ridingStyleLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("ridingStylePlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ridingStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weatherConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("weatherConditionsLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("weatherConditionsPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {weatherConditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("budgetLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("budgetPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {budgets.map((budget) => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
          {isLoading ? t("generatingRecommendations") : t("getRecommendationButton")}
        </Button>
      </form>
    </Form>
  );
}
