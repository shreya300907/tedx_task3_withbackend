"use client";

import { AnimatePresence, motion } from "framer-motion";

interface StepperProps {
    currentStep: number;
}

export default function Stepper({
    currentStep,
}: StepperProps) {
    const steps = [
        "Coordinates",
        "Route",
        "Manifest",
    ];

    return (
        <div className="relative flex lg:flex-col flex-row sm:gap-14 gap-6">
            <div className="absolute left-3.25 top-0 bottom-0 w-px bg-[#E7E5E4]" />
            <motion.div
                className="absolute left-3.25 top-0 w-px bg-[#171717] sm:block hidden"
                animate={{
                    height:
                        currentStep === 1
                            ? "0%"
                            : currentStep === 2
                                ? "50%"
                                : "100%",
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
            />

            {steps.map((label, index) => {
                const step = index + 1;

                const completed = step < currentStep;
                const active = step === currentStep;

                return (
                    <div
                        key={label}
                        className="relative flex items-center sm:gap-5 gap-2.5 font-medium sm:text-[14px] text-[12px]"
                    >
                        <motion.div
                            animate={{
                                scale: active ? 1.08 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className={`
                                z-10
                                flex
                                sm:h-7
                                sm:w-7
                                h-3.5
                                w-3.5
                                items-center
                                justify-center
                                rounded-full
                                border
                                bg-white
                                font-medium 
                                sm:text-[14px] 
                                text-[12px]
                                
                                ${completed || active
                                    ? "border-[#171717]"
                                    : "border-[#D6D3D1]"
                                }
                            `}
                        >
                            <AnimatePresence mode="wait">
                                {completed ? (
                                    <motion.span
                                        key="tick"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="sm:text-[14px] text-[10px] font-medium"
                                    >
                                        ✓
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key={`step-${step}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={
                                            active
                                                ? "text-[#171717]"
                                                : "text-[#D6D3D1]"
                                        }
                                    >
                                        {step}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <motion.span
                            animate={{
                                color:
                                    completed || active
                                        ? "#171717"
                                        : "#D6D3D1",
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="sm:text-[14px] text-[12px] tracking-[-0.45px] font-medium"
                        >
                            {label}
                        </motion.span>
                    </div>
                );
            })}
        </div>
    );
}