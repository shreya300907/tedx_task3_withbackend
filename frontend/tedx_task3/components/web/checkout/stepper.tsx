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
        <div className="relative flex flex-col gap-14">
            <div className="absolute left-[13px] top-0 bottom-0 w-px bg-[#E7E5E4]" />
            <motion.div
                className="absolute left-[13px] top-0 w-px bg-[#171717]"
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
                        className="relative flex items-center gap-5 font-medium text-[14px]"
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
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                border
                                bg-white
                                font-medium 
                                text-[14px]
                                
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
                                        className="text-xs font-medium"
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
                            className="text-[14px] tracking-[-0.45px] font-medium"
                        >
                            {label}
                        </motion.span>
                    </div>
                );
            })}
        </div>
    );
}