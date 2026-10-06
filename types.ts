export type CategoryType = 
  | 'all'
  | 'shirt'
  | 'pant'
  | 'combo'
  | 'premium'
  | 'new_arrivals'
  | 'best_sellers'
  | 'offers';

export interface ProductVariant {
  id: string;
  colorName: string;
  hex: string;
  image: string;
  stock: number;
}

export interface FabricLengthOption {
  lengthMeters: number;
  label: string;
  suitableFor: string;
  priceMultiplier: number;
}

export interface Product {
  id: string;
  name: string;
  nameHi: string;
  category: 'shirt' | 'pant' | 'combo' | 'premium';
  brand: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  material: string;
  feel: string;
  weave: string;
  defaultLength: string;
  lengthOptions: FabricLengthOption[];
  variants?: ProductVariant[];
  totalStock?: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isOffer?: boolean;
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  selectedLength: FabricLengthOption;
  quantity: number;
}

export interface Address {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  houseFlat: string;
  roadArea: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

export type OrderStatus = 
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  labelHi: string;
  date: string;
  time: string;
  completed: boolean;
  current: boolean;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  deliveryType: 'standard' | 'express';
  paymentMethod: 'cod' | 'upi' | 'card' | 'phonepe';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  paymentRef?: string;
  paymentId?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalPayable: number;
  status: OrderStatus;
  currentStepIndex: number;
  trackingSteps: TrackingStep[];
  courierName: string;
  trackingNumber: string;
  expectedDelivery: string;
  returnRequested?: boolean;
  returnReason?: string;
  returnDate?: string;
  returnStatus?: 'pending' | 'approved' | 'picked_up' | 'refunded' | 'rejected';
  refundMethod?: 'bank_upi' | 'store_credit';
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  variantColor?: string;
  amount: number;
  reason: string;
  refundMethod: 'bank_upi' | 'store_credit';
  status: 'pending' | 'approved' | 'picked_up' | 'refunded' | 'rejected';
  requestDate: string;
  resolutionDate?: string;
}

export interface CustomerSummary {
  phoneNumber: string;
  fullName: string;
  city: string;
  state: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface AdminSession {
  username: string;
  role: 'ADMIN';
  token: string;
  loginTime: number;
  expiresAt: number;
}

