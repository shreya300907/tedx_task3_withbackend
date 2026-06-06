import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RouteData_1, RouteSchema_1 } from "@/lib/validator/route1Schema";
import { RouteData_2, RouteSchema_2 } from "@/lib/validator/route2Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, ChevronDown, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface RouteFormProps {
    onSuccess: (data: RouteData_1 | RouteData_2) => void;
    defaultValues: RouteData_1 | RouteData_2 | null;
}

export default function RouteForm({ onSuccess, defaultValues }: RouteFormProps) {
    const [selected, setSelected] = useState<"campus" | "out">(
        defaultValues && "address" in defaultValues ? "out" : "campus"
    );
    const [hostel, setHostel] = useState(
        defaultValues && "hostel" in defaultValues ? defaultValues.hostel : ""
    );
    const hostels = ["CV Raman", "Aryabhatta", "Vivekananda"];
    const {
        register: register1,
        handleSubmit: handleSubmit1,
        setValue: setValue1,
        formState: { errors: errors1 }
    } = useForm<RouteData_1>({
        resolver: zodResolver(RouteSchema_1),
        mode: "onChange",
        defaultValues: {
            hostel: defaultValues && "hostel" in defaultValues ? defaultValues.hostel : "",
            room: defaultValues && "room" in defaultValues ? defaultValues.room : "",
            notes: defaultValues && "notes" in defaultValues ? defaultValues.notes : "",
        }
    });
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 }
    } = useForm<RouteData_2>({
        resolver: zodResolver(RouteSchema_2),
        mode: "onChange",
        defaultValues: {
            address: defaultValues && "address" in defaultValues ? defaultValues.address : "",
            city: defaultValues && "city" in defaultValues ? defaultValues.city : "",
            state: defaultValues && "state" in defaultValues ? defaultValues.state : "",
            pin: defaultValues && "pin" in defaultValues ? defaultValues.pin : "",
        }
    });
    useEffect(() => {
        register1("hostel");
        if (defaultValues && "hostel" in defaultValues) {
            setValue1("hostel", defaultValues.hostel, { shouldValidate: true });
        }
    }, [register1, defaultValues, setValue1]);

    const onSubmit = selected === "campus"
        ? handleSubmit1((data) => onSuccess(data))
        : handleSubmit2((data) => onSuccess(data));

    return (
        <form id="routes-form" onSubmit={onSubmit} className="lg:px-12 xl:px-24 pt-12 pb-32 bg-[white] flex flex-col w-full">
            <span className="font-medium text-foreground text-[24px] mb-2">Collection Route</span>
            <span className="text-[14px] text-primary-foreground">Designate the drop point for your artifacts and passes.</span>
            <div className="relative flex w-full h-14 bg-[#F5F5F4] border p-1 mt-8">
                <div className={`absolute top-1 bottom-1 w-1/2 bg-white border shadow-sm transition-transform duration-300 ease-in-out ${selected === "out" ? "translate-x-full" : ""}`} />
                <button
                    type="button"
                    onClick={() => setSelected("campus")}
                    className={`
                        relative z-10 flex-1 flex items-center justify-center gap-3
                        font-mono text-[12px] tracking-[1.5px]
                        transition-colors duration-300
                        ${selected === "campus"
                            ? "text-[#171717]"
                            : "text-[#A6A09B]"
                        }
                        cursor-pointer
                    `}
                >
                    <Building2 size={14} />
                    IN CAMPUS
                </button>
                <button
                    type="button"
                    onClick={() => setSelected("out")}
                    className={`
                        relative z-10 flex-1 flex items-center justify-center gap-3
                        font-mono text-[12px] tracking-[1.5px]
                        transition-colors duration-300
                        ${selected === "out"
                            ? "text-[#171717]"
                            : "text-[#A6A09B]"
                        }
                        cursor-pointer
                    `}
                >
                    <Home size={14} />
                    OUT OF CAMPUS
                </button>
            </div>

            <div className="mt-8 flex flex-col gap-6">
                {selected === "campus" ? (
                    <>
                        <div className="w-full">
                            <div className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase">
                                HOSTEL SECTOR
                            </div>
                            <div className="h-13 border mt-2 ">
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <button type="button" className="w-full h-14 border border-[#D6D3D1] bg-white flex items-center justify-between px-4 text-sm cursor-pointer">
                                            <span
                                                className={
                                                    hostel
                                                        ? "text-foreground"
                                                        : "text-[#D6D3D1]"
                                                }
                                            >
                                                {hostel || "Select hostel"}
                                            </span>
                                            <ChevronDown size={16} className=" text-[#A6A09B]" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none"
                                        align="start"
                                    >
                                        {hostels.map((item) => (
                                            <DropdownMenuItem
                                                key={item}
                                                onClick={() => {
                                                    setHostel(item);
                                                    setValue1("hostel", item, { shouldValidate: true });
                                                }}
                                                className="cursor-pointer text-sm"
                                            >
                                                {item}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {errors1.hostel && (
                                <p className="text-red-600 text-sm mt-1">{errors1.hostel?.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col border-b ">
                            <div className="flex flex-row gap-2">
                                <img src="coord2.svg" alt="coord" className="h-[12px]" />
                                <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase"> Room / Coordinate</span>
                            </div>
                            <div className="py-3 text-primary-foreground text-sm ">
                                <input
                                    type="text"
                                    placeholder="Eg. A-304"
                                    className="w-full focus:outline-none"
                                    {...register1("room")}
                                />
                            </div>
                            {errors1.room && (
                                <p className="text-red-600 text-sm mt-1">{errors1.room?.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col border-b ">
                            <div className="flex flex-row gap-2">
                                <img src="coord2.svg" alt="coord" className="h-[12px]" />
                                <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase"> Collection Notes (Optional)</span>
                            </div>
                            <div className="py-3 text-primary-foreground text-sm ">
                                <input
                                    type="text"
                                    placeholder="Add a note"
                                    className="w-full focus:outline-none"
                                    {...register1("notes")}
                                />
                            </div>
                            {errors1.notes && (
                                <p className="text-red-600 text-sm mt-1">{errors1.notes?.message}</p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col border-b ">
                            <div className="flex flex-row gap-2">
                                <img src="coord2.svg" alt="coord" className="h-[12px]" />
                                <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase">Address Line</span>
                            </div>
                            <div className="py-3 text-primary-foreground text-sm ">
                                <input
                                    type="text"
                                    placeholder="Bodhgaya.."
                                    className="w-full focus:outline-none"
                                    {...register2("address")}
                                />
                            </div>
                            {errors2.address && (
                                <p className="text-red-600 text-sm mt-1">{errors2.address?.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col border-b ">
                            <div className="flex flex-row gap-2">
                                <img src="coord2.svg" alt="coord" className="h-[12px]" />
                                <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase"> City</span>
                            </div>
                            <div className="py-3 text-primary-foreground text-sm ">
                                <input
                                    type="text"
                                    placeholder="Gaya"
                                    className="w-full focus:outline-none"
                                    {...register2("city")}
                                />
                            </div>
                            {errors2.city && (
                                <p className="text-red-600 text-sm mt-1">{errors2.city?.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col border-b ">
                            <div className="flex flex-row gap-2">
                                <img src="coord2.svg" alt="coord" className="h-[12px]" />
                                <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase">State</span>
                            </div>
                            <div className="py-3 text-primary-foreground text-sm ">
                                <input
                                    type="text"
                                    placeholder="Bihar"
                                    className="w-full focus:outline-none"
                                    {...register2("state")}
                                />
                            </div>
                            {errors2.state && (
                                <p className="text-red-600 text-sm mt-1">{errors2.state?.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col border-b ">
                            <div className="flex flex-row gap-2">
                                <img src="coord2.svg" alt="coord" className="h-[12px]" />
                                <span className="text-[10px] font-mono tracking-[1px] text-primary-foreground uppercase"> Postal Code</span>
                            </div>
                            <div className="py-3 text-primary-foreground text-sm ">
                                <input
                                    type="text"
                                    placeholder="823001"
                                    className="w-full focus:outline-none"
                                    {...register2("pin")}
                                />
                            </div>
                            {errors2.pin && (
                                <p className="text-red-600 text-sm mt-1">{errors2.pin?.message}</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </form >
    );
}