export interface EnhancedProduct extends Product {
  brand: string;
  model: string;
  year?: number;
  compatibility: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  specifications: Record<string, string>;
  warranty: string;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  weight: number;
  dimensions: { length: number; width: number; height: number };
  freeShipping: boolean;
  estimatedDelivery: string;
}

export interface ServiceBooking {
  id: string;
  userId: string;
  serviceType: ServiceType;
  motorcycleInfo: MotorcycleInfo;
  preferredDate: Date;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  status: BookingStatus;
  estimatedCost: number;
  actualCost?: number;
  technicianId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MotorcycleInfo {
  make: string;
  model: string;
  year: number;
  engine: string;
  mileage: number;
  vin?: string;
  lastService?: Date;
}

export type ServiceType = 
  | 'maintenance' 
  | 'repair' 
  | 'inspection' 
  | 'customization' 
  | 'emergency';

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled';

export interface AIRecommendation {
  id: string;
  type: 'product' | 'service' | 'maintenance';
  title: string;
  description: string;
  confidence: number;
  reasoning: string;
  estimatedCost?: number;
  urgency?: 'low' | 'medium' | 'high';
  relatedProducts?: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
  motorcycles: MotorcycleInfo[];
  preferences: UserPreferences;
  loyaltyPoints: number;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  language: string;
  currency: string;
  preferredPaymentMethod?: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  serviceReminders: boolean;
  promotions: boolean;
}