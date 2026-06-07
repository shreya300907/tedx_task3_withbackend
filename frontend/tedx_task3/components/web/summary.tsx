"use client"

import { allPromo } from "@/types/promo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCart } from "@/services/cartServices";
import { Cart } from "@/types/cart";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/productServices";
import { useCart } from "@/context/cartContext";

export default function Summary({userId,cartChg}:{userId:string,cartChg:boolean}) {
    const { discount, setDiscount } = useCart();
    const [allProducts, setAllProducts]=useState<Product[]>([])
        useEffect(()=>{
            async function fetchData(){
                const result=await fetchProducts();
                setAllProducts(result);
            }
            fetchData();
        },[])
    const [cart, setCart] = useState<Cart | null>(null);
    useEffect(() => {
        if (!userId) return;
        (async () => {
          const c = await fetchCart(userId);
          setCart(c);
        })();
      }, [userId,cartChg]);
    let totalcost=cart?.total;
    const [input, setInput] = useState("");
    const handleClick = () => {
        setDiscount(0);
        allPromo.map((p) => {
            if (p.code === input) {
                if (p.type === "fixed") {
                    setDiscount(p.value);
                }
                else {
                    if(cart===null){
                        setDiscount(0);
                    }else{
                    setDiscount((totalcost ?? 0) * p.value / 100);
                    }
                }
            }
        })
        setInput("");
    }
    return (
        <>
        <div className="bg-[#F9F8F6] sticky top-6 flex flex-col border border-[#D6D3D1] h-fit">
            <div className="px-8 pt-8 pb-4 border-b" >
                <div className="flex flex-row  gap-2">
                    <img src="/sum.svg" alt="sum" className="h-[14px] w-[14px]" />
                    <span className="text-primary-foreground text-[10px] font-normal font-mono tracking-[2px]">EXPEDITION MANIFEST</span>
                </div>
                <div className="mt-3 tracking-[-0.6px] text-2xl font-medium">
                    Selected Coordinates
                </div>
            </div>
            <div className="py-5 px-2 min-h-50 overflow-y-auto border flex flex-col gap-2">
                <div className="grid grid-cols-[3fr_1fr_1fr_1fr] border-b bg-border text-foreground text-[12px]">
                    <div>Products</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                </div>
                {(cart?.items??[]).map(
                    (product) => {
                        let item=allProducts.find((item)=>product.productId===item._id)
                        if(!item){
                            return null;
                        }
                        return (

                            <div key={item._id} className="grid grid-cols-[3fr_1fr_1fr_1fr] border-b text-foreground text-[12px] pb-2">
                                <div className="flex flex-row gap-2">
                                    <img src={item.images[0]} alt={item.name} className="h-10" />
                                    {item.name}
                                </div>
                                <div>{item.currency}{item.price}</div>
                                <div>{product.quantity}</div>
                                <div>${item.price * product.quantity}</div>
                            </div>
                        );
                    }
                )}
            </div>
            {(cart === null) ?
                <></> :
                <>
                    <div className="px-4 py-3 border-b flex flex-row justify-between">
                        <input type="text" className=" border" placeholder="Enter Promo Code" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className=" bg-[#A6A09B] text-[#FFFFFF] px-2 tracking-[1.4px] font-medium text-[14px] hover:bg-foreground disabled:opacity-50 disabled:cursor-not-allowed" disabled={input === ""} onClick={() => handleClick()}>APPLY</button>
                    </div>
                    <div className="flex flex-col py-3 px-4 gap-2">
                        <div className="flex justify-between text-primary-foreground text-sm">
                            <span>SubTotal</span>
                            <span>${totalcost??0}</span>
                        </div>
                        {discount !== 0 && <div className="flex justify-between text-sm text-emerald-600">
                            <span>Discount</span>
                            <span>-${discount}</span>
                        </div>}
                        <div className="flex justify-between text-sm">
                            <span>Total</span>
                            <span>${Math.max((totalcost??0)-discount,0) }</span>
                        </div>
                    </div>
                </>
            }
            <div className="px-8 pt-6 pb-8 border-t ">
                {cart!==null ? (<Link href="/checkout"><button className="flex flex-row justify-around py-4 items-center bg-[#A6A09B] w-full text-[#FFFFFF] text-[14px] tracking-[1.4px] font-medium hover:bg-foreground">Continue Expedition <img src="/sum2.svg" alt="sum2" className="h-3.5 w-3.5" /></button></Link>) : (<button className="flex flex-row justify-around py-4 items-center bg-[#A6A09B] w-full text-[#FFFFFF] text-[14px] tracking-[1.4px] font-medium cursor-not-allowed" >Continue Expedition <img src="/sum2.svg" alt="sum2" className="h-3.5 w-3.5" /></button>)}
                <div className="flex flex-row justify-center mt-4">
                    <img src="/sum3.svg" className="h-3 w-3 mr-1" alt="sum3" />
                    <span className="font-normal text-[9px] tracking-[0.9px] text-[#A6A09B]">SECURE TRANSMISSION</span>
                    <span className="px-4 font-normal text-[9px] text-[#A6A09B]">|</span>
                    <img src="/sum4.svg" className="h-3" alt="sum4" />
                    <span className="font-normal text-[9px] tracking-[0.9px] text-[#A6A09B]">AUTHENTICATED</span>
                </div>
            </div>
        </div>
        </>
    )
}