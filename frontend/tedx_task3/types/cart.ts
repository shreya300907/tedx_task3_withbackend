import { Product } from "./product";

export interface cart extends Product {
    quantity: number;
}

export interface CartItem {
  userId:string
  productId: string;
  quantity: number;
  selectedSize?: string;
  priceAtPurchase: number;
  productType: "MERCH" | "TICKET";
}


export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: "ORDERED" | "PENDING";
  createdAt?: string;
  updatedAt?: string;
}