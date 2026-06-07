"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Summary from "./summary";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import { fetchCart } from "@/services/cartServices";
import { Cart } from "@/types/cart";
import { useCart } from "@/context/cartContext";

export default function MobileSummary({userId,cartChg}:{userId:string,cartChg:boolean}) {
    const { discount } = useCart();
    const [cart, setCart] = useState<Cart | null>(null);
        useEffect(() => {
            if (!userId) return;
            (async () => {
              const c = await fetchCart(userId);
              setCart(c);
            })();
          }, [userId]);
    let totalcost=cart?.total;
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t bg-white px-6 py-4">
                        <span>${Math.max((totalcost??0)-discount,0) }</span>
                        <span>View Cart</span>
                    </button>
                </SheetTrigger>

                <SheetContent side="bottom" className="h-[85vh] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom duration-500">
                    <VisuallyHidden>
                        <SheetTitle>Order Summary</SheetTitle>
                    </VisuallyHidden>

                    <Summary userId={userId} cartChg={cartChg}/>
                </SheetContent>
            </Sheet>
        </div>
    );
}