export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  type: "MERCH" | "TICKET";
  price: number;
  currency: string;
  stock: number;
  isUnlimitedStock: boolean;
  images: string[];
  sizes?: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}