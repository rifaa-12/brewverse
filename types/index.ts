export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  categoryTag?: string;
  price: number;
  quantity: number;
  image: string;
  weightOrSize?: string;
  grind?: string;
  roast?: string;
  notes?: string;
  isPickup?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'signature' | 'milk' | 'cold' | 'hardware';
  categoryLabel: string;
  index: string;
  price: number;
  rating: number;
  flavorNotes: string;
  description: string;
  roastLevel: number; // 1 to 5
  image: string;
  altitude?: string;
  origin?: string;
  process?: string;
  scaScore?: number;
}

export interface Companion {
  id: string;
  categoryTag: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface InquiryForm {
  name: string;
  email: string;
  type: string;
  message: string;
}

export type ScreenType = 'home' | 'collection' | 'product' | 'cart' | 'checkout';
