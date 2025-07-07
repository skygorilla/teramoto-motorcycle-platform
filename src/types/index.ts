export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: string;
  dataAiHint?: string;
  brand?: string;
  model?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

export type GearRecommendation = {
  name: string;
  description: string;
  justification: string;
};
