"use client"
import MobileSummary from "@/components/web/mobileSum";
import Nav from "@/components/web/navbar";
import Products from "@/components/web/product";
import Summary from "@/components/web/summary";
import { getUserId } from "@/lib/utils";
import {useEffect,useState} from "react";

export default function Home() {
  const [userId,setUserId] = useState<string|null>(null);
  useEffect(()=>{
  const id = getUserId();
  setUserId(id);

  if(id){
    localStorage.setItem("userId", id);
  }

},[]);

   const [cartChg,setCartChg]=useState(true);
 if(!userId){
   return <div>Loading...</div>
 }
  return (
    <>
    
      <Nav />

      <div className="2xl:px-45 xl:px-10 md:px-5 sm:px-4 px-3 py-8 flex flex-row justify-between xl:gap-0 sm:gap-2 gap-0">
        <Products userId={userId} cartChg={cartChg} setCartChg={setCartChg}/>
        <aside className="hidden md:block">
          <Summary userId={userId} cartChg={cartChg}/>
        </aside>
      </div>
      <MobileSummary userId={userId} cartChg={cartChg}/>
    </>
  );
}
