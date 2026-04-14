/**
 * Product-related TypeScript types for the e-commerce platform
 */

export interface Variant {
  id: string;
  productId: string;
  size: string;
  price: number;
  dimensions?: string;
}

export interface Pattern {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  imageUrl?: string;
  category: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDetail extends Product {
  variants?: Variant[];
  patterns?: Pattern[];
}

export interface CartItemDetails {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantSize: string;
  patternId: string;
  patternName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface ProductGridItem {
  id: string;
  name: string;
  basePrice: number;
  imageUrl?: string;
  category: string;
}
