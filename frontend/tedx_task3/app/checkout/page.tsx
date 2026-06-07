"use client"
import CoordinatesForm from "@/components/web/checkout/coordinates";
import RouteForm from "@/components/web/checkout/routesForm";
import Stepper from "@/components/web/checkout/stepper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CoordinatesData } from "@/lib/validator/coordinateSchema";
import { RouteData_1 } from "@/lib/validator/route1Schema";
import { RouteData_2 } from "@/lib/validator/route2Schema";
import Manifest from "@/components/web/checkout/manifest";

export default function Checkout() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [coordData, setCoordData] = useState<CoordinatesData | null>(null);
    const [isAborting, setIsAborting] = useState(false);
    const [routeData, setRouteData] = useState<RouteData_1 | RouteData_2 | null>(null);
    const handleCoordSubmit = (data: CoordinatesData) => {
        setCoordData(data);
        setStep(2);
        return;
    };
    const handleRouteSubmit = (data: RouteData_1 | RouteData_2) => {
        setRouteData(data);
        setStep(3);
        return;
    };
    const handleManifestSubmit = () => {
        router.push("/checkout/success");
        return;
    };
    const prevStep = () => {
        setStep(prev => prev - 1);
    };
    const handleAbort = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsAborting(true);
    };
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isAborting ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={() => {
                if (isAborting) {
                    router.push("/");
                }
            }}
            className="px-0 sm:px-8 lg:py-8 xl:w-[70vw] lg:w-[80vw] md:w-[90vw] w-full mx-auto item-center"
        >
            <div className="sm:px-6 sm:py-6 px-3 py-3 flex flex-row justify-between border">
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex justify-center items-center rounded-full h-10 w-10 bg-white border" >
                        <img src="/sum.svg" alt="sum" className="h-5" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="sm:text-[10px] text-[8px]  tracking-[2px] text-primary-foreground">CHECKOUT PROTOCOL</span>
                        {step === 1 ? (<span className="sm:text-[18px] text-[12px] tracking-[-0.45px] font-medium text-foreground">Identify Explorer</span>) : step === 2 ? (<span className="sm:text-[18px] text-[12px] tracking-[-0.45px] font-medium text-foreground">Discovery Route</span>) : (<span className="sm:text-[18px] text-[12px] tracking-[-0.45px] font-medium text-foreground">Order Manifest</span>)}
                    </div>
                </div>
                <button onClick={handleAbort} className="flex flex-row items-center gap-2 cursor-pointer focus:outline-none">
                    <img src="/cross.svg" alt="cross" className="h-4" />
                    <span className="sm:block hidden text-[12px] font-normal text-[#A6A09B] tracking-[1.2px]">ABORT</span>
                </button>
            </div>
            <div className="flex lg:flex-row flex-col bg-background border">
                <div className="py-8 flex flex-col justify-between items-center">
                    <div className="flex lg:flex-col flex-row justify-between ">
                        <div className="pb-8 text-secondary-foreground font-mono text-[10px] tracking-[1px] lg:block hidden">
                            PROGRESS
                        </div>
                        <div >
                            <Stepper currentStep={step} />
                        </div>
                    </div>
                    <div className="mt-4 whitespace-nowrap px-4 py-4 sm:gap-2 gap-0 bg-[#F5F5F4] font-mono text-[10px] sm:text-xs text-[#79716B] border justify-between flex lg:flex-col sm:flex-row flex-col">
                        <p>Encryption active.</p>
                        <p>Transmission secure.</p>
                        <p>Terra Incognita Server.</p>
                    </div>
                </div>
                <div className="flex-1 bg-white overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <CoordinatesForm onSuccess={handleCoordSubmit} defaultValues={coordData} />
                        )}

                        {step === 2 && (
                            <motion.div
                                key="route"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                            >
                                <RouteForm onSuccess={handleRouteSubmit} defaultValues={routeData} />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="manifest"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                            >
                                <Manifest coordData={coordData} routeData={routeData} onSuccess={handleManifestSubmit} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="sm:px-12 px-3 py-6 bg-white border flex flex-row  justify-between items-center">
                <div>
                    {step === 2 || step === 3 ? (
                        <button className="flex flex-row items-center cursor-pointer" onClick={prevStep}>
                            <img src="/back.svg" alt="back" className="h-4 mr-2" />
                            <span className="sm:text-[14px] text-[12px] font-medium tracking-[0.7px] text-primary-foreground">BACK</span>
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
                <button type="submit" form={step === 1 ? "coordinates-form" : step === 2 ? "routes-form" : "manifest-form"} className="flex flex-row cursor-pointer items-center hover:bg-foreground py-3 px-6 bg-[#A6A09B]">
                    <span className="sm:text-[14px] text-[12px] font-medium tracking-[0.7px] text-white pr-3">{step === 1 || step === 2 ? "CONTINUE" : "PROCEED TO PAY"}</span>
                    <img src="/next1.svg" alt="next" className="h-4" />
                </button>
            </div>
        </motion.div>
    );
}