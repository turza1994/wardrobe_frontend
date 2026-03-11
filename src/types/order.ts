export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ShippingAddress {
  street: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutPayload {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}
