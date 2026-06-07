"use client"
import { useState, useContext, createContext, ReactNode } from "react";

interface CartContextType {
    discount: number;
    setDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [discount, setDiscount] = useState(0);
    return (
        <CartContext.Provider value={{ discount, setDiscount }}>
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