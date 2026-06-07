"use client"

import { useEffect, useState } from "react";
import ProductCards from "./productCards";
import { Product } from "@/types/product";
import { fetchMerch, fetchPassage } from "@/services/productServices";

export default function Products({userId,cartChg,setCartChg}:{userId:string,cartChg:boolean, setCartChg: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [allPassage, setAllPassage]=useState<Product[]>([])
    const [passLoading,setpassLoading]=useState(true);
    useEffect(()=>{
        async function fetchData(){
            try {
                const result = await fetchPassage();
                setAllPassage(result);
            } finally {
                setpassLoading(false);
            }
        }
        fetchData();
    },[])
    const [allMerch, setAllMerch]=useState<Product[]>([])
    const [merchLoading,setmerchLoading]=useState(true);
    useEffect(()=>{
        async function fetchData(){
            try {
                const result = await fetchMerch();
                setAllMerch(result);
            } finally {
                setmerchLoading(false);
            }
        }
        fetchData();
    },[])
    return (
        <div className="flex flex-col gap-12">
            <div>
                <div className="flex flex-col">
                    <h1 className="wrap-break-word md:text-5xl text-2xl sm:text-4xl font-light text-foreground">
                        Expedition Supplies
                    </h1>
                    <p className="text-primary-foreground md:text-lg sm:text-sm text-xs font-light leading-7 mt-4 max-w-2xl">
                        Secure your passage and acquire essential artifacts for the journey into the unknown. All items are logged in the central archive.
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <span className="text-primary-foreground font-mono text-[10px] sm:text-xs font-normal leading-4 tracking-[2.4px] uppercase">PASSAGES</span>
                        <span className="h-px w-full bg-[#E7E5E4]"></span>
                    </div>
                    <ProductCards products={allPassage} userId={userId} cartChg={cartChg} setCartChg={setCartChg} loading={passLoading}/>
                </div>
                <div>
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <span className="text-primary-foreground font-mono text-[10px] sm:text-xs font-normal leading-4 tracking-[2.4px] uppercase">MERCH</span>
                        <span className="h-px w-full bg-[#E7E5E4]"></span>
                    </div>
                    <ProductCards products={allMerch} userId={userId} cartChg={cartChg} setCartChg={setCartChg} loading={merchLoading}/>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}