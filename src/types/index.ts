export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  subcategories?: { id: string; name: string; slug: string }[];
  productCount?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type?: 'home' | 'office' | 'other';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validUntil: string;
}
