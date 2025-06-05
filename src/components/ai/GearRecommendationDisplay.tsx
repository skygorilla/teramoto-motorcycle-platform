"use client";

import type { GearRecommendation } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface GearRecommendationDisplayProps {
  recommendations: GearRecommendation[];
}

export function GearRecommendationDisplay({ recommendations }: GearRecommendationDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {recommendations.map((item, index) => (
        <Card key={index} className="bg-card hover:shadow-xl transition-shadow duration-300 animate-in fade-in-0 slide-in-from-bottom-5" style={{animationDelay: `${index * 100}ms`}}>
          <CardHeader>
            <div className="flex items-center mb-2">
              <CheckCircle2 className="h-6 w-6 text-primary mr-2" />
              <CardTitle className="font-headline text-lg">{item.name}</CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-foreground/80">Justification:</p>
            <p className="text-sm text-muted-foreground">{item.justification}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
