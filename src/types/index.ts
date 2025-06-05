export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: string;
  dataAiHint?: string;
}

export type GearRecommendation = {
  name: string;
  description: string;
  justification: string;
};
