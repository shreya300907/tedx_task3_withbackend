"use client"

import { cart } from "@/types/cart";
import { useState, useContext, createContext, ReactNode } from "react";

interface CartContextType {
    cart: cart[];
    setCart: React.Dispatch<React.SetStateAction<cart[]>>;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    discount: number;
    setDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<cart[]>([]);
    const [count, setCount] = useState(0);
    const [discount, setDiscount] = useState(0);
    return (
        <CartContext.Provider value={{ cart, setCart, count, setCount, discount, setDiscount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a cartProvider")
    }
    return context;
}