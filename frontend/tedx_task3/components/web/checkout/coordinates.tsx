import { zodResolver } from "@hookform/resolvers/zod";
import { CoordinatesSchema, type CoordinatesData } from "@/lib/validator/coordinateSchema"
import { useForm } from "react-hook-form";

interface CoordinatesFormProps {
    onSuccess: (data: CoordinatesData) => void;
    defaultValues: CoordinatesData | null;
}
export default function CoordinatesForm({ onSuccess, defaultValues }: CoordinatesFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<CoordinatesData>({
        resolver: zodResolver(CoordinatesSchema),
        mode: "onChange",
        defaultValues: defaultValues || {
            explorerDesignation: "",
            commLink: "",
            priorityFrequency: "",
        },
    });
    return (
        <form onSubmit={handleSubmit(onSuccess)} id="coordinates-form"
            className="lg:px-12 xl:px-24 pt-12 pb-32 bg-[white] flex flex-col w-full">
            <span className="font-medium text-foreground text-[24px] mb-2">Transmission Details</span>
            <span className="text-[14px] text-primary-foreground">Please identify yourself for the expedition log.</span>
            <div className="flex flex-col pt-8 gap-6">
                <div className="flex flex-col border-b ">
                    <div className="flex flex-row gap-2">
                        <img src="coord1.svg" alt="coord" className="h-3" />
                        <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase "> Explorer Designation</span>
                    </div>
                    <div className="py-3 text-primary-foreground text-sm ">
                        <input type="text" placeholder="Full Name" className="w-full " {...register("explorerDesignation")} />
                        <p className="text-red-600 text-sm mt-1">
                            {errors.explorerDesignation?.message}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col border-b ">
                    <div className="flex flex-row gap-2">
                        <img src="coord2.svg" alt="coord" className="h-3" />
                        <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase"> Comm Link</span>
                    </div>
                    <div className="py-3 text-primary-foreground text-sm ">
                        <input type="text" placeholder="Email Address" className="w-full " {...register("commLink")} />
                        <p className="text-red-600 text-sm mt-1">
                            {errors.commLink?.message}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col border-b ">
                    <div className="flex flex-row gap-2">
                        <img src="coord3.svg" alt="coord" className="h-3" />
                        <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase"> Priority Frequency</span>
                    </div>
                    <div className="py-3 text-primary-foreground text-sm ">
                        <input type="text" placeholder="Phone number" className="w-full " {...register("priorityFrequency")} />
                        <p className="text-red-600 text-sm mt-1">
                            {errors.priorityFrequency?.message}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}