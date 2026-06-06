"use client"
import { motion } from "framer-motion";

export default function SuccessPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col mx-8 my-auto border  "
        >
            <div className="px-6 py-6 flex flex-row justify-between border">
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex justify-center items-center rounded-full h-10 w-10 bg-white border" >
                        <img src="/sum.svg" alt="sum" className="h-5" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="sm:text-[10px] text-[8px] tracking-[2px] text-primary-foreground">TRANSMISSION STATUS</span>
                        <span className="sm:text-[18px] text-[12px] tracking-[-0.45px] font-medium text-foreground">Expedition Confirmed</span>
                    </div>
                </div>
            </div>
            <div className="px-6 py-6 border justify-center items-center">
                <div className="bg-[#F0FDF4] justify-center flex items-center h-20  w-20 rounded-full mb-6 mx-auto border">
                    <img src="/tick.svg" alt="tick" className="h-10 w-10 items-center" />
                </div>
                <div className="mb-4 justify-center flex flex-col items-center">
                    <span className="font-medium text-3xl text-center text-foreground">Transmission Successful</span>
                </div>
                <div className="items-center justify-center">
                    <p className="text-primary-foreground text-xs text-center sm:text-base">Your coordinates have been mapped and your payload is secured. Welcome to Terra Incognita, Explorer. A confirmation directive has been sent to asdads@.</p>
                </div>
            </div>
        </motion.div>
    )
}