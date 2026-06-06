import { useCart } from "@/context/cartContext";
import { CoordinatesData } from "@/lib/validator/coordinateSchema";
import { RouteData_1 } from "@/lib/validator/route1Schema";
import { RouteData_2 } from "@/lib/validator/route2Schema";

interface ManifestProps {
    coordData: CoordinatesData | null;
    routeData: RouteData_1 | RouteData_2 | null;
    onSuccess: () => void;
}
export default function Manifest({ coordData, routeData, onSuccess }: ManifestProps) {
    const { cart, discount } = useCart();
    const isCampus = routeData && "hostel" in routeData;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSuccess();
    };
    let totalcost = 0;
    cart.forEach((item) => {
        totalcost += item.price * item.quantity;
    });
    return (
        <form onSubmit={handleSubmit} id="manifest-form"
            className="lg:px-12 xl:px-24 pt-12 pb-32 bg-[white] flex flex-col w-full">
            <span className="font-medium text-foreground text-[24px] mb-2">Order Manifest</span>
            <span className="text-[14px] text-primary-foreground">Review expedition details.</span>
            <div className="flex flex-col pt-8 gap-6">
                <div className="flex flex-col border-b ">
                    <div className="text-[12px] font-mono font-bold tracking-[1px] text-foreground uppercase "> Explorer</div>
                    <div className="py-3 text-primary-foreground text-sm ">
                        <p>{coordData?.explorerDesignation}</p>
                        <p>{coordData?.commLink}</p>
                        <p>{coordData?.priorityFrequency}</p>
                    </div>
                </div>
                <div className="flex flex-col border-b ">
                    <div className="text-[12px] font-mono font-bold tracking-[1px] text-foreground uppercase ">Collection Route</div>
                    <div className="py-3 text-primary-foreground text-sm ">
                        {isCampus ? (
                            <>
                                <p>{routeData?.hostel}</p>
                                <p>{routeData?.room}</p>
                                <p>{routeData?.notes}</p>
                            </>
                        ) : (
                            <>
                                <p>{routeData?.address}</p>
                                <p>{routeData?.city}</p>
                                <p>{routeData?.state}</p>
                                <p>{routeData?.pin}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="text-[12px] font-mono font-bold tracking-[1px] text-foreground uppercase ">Payload</div>
                    <div className="py-3 text-primary-foreground text-sm gap-2 ">
                        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] border-b bg-border text-foreground">
                            <div className="text-center">Products</div>
                            <div className="text-center">Price</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-center">Subtotal</div>
                        </div>
                        {cart.map(
                            (item) => {
                                return (
                                    <div key={item._id} className="grid grid-cols-[3fr_1fr_1fr_1fr] border-b items-center">
                                        <div className="flex flex-row gap-2 items-center">
                                            <img src={item.images[0]} alt={item.name} className="h-10" />
                                            {item.name}
                                        </div>
                                        <div className="text-center">${item.price}</div>
                                        <div className="text-center">{item.quantity}</div>
                                        <div className="text-center">${item.price * item.quantity}</div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center ">
                        <div className="text-[12px] font-mono font-bold tracking-[1px] text-foreground uppercase "> SubTotal</div>
                        <div className=" text-primary-foreground text-sm ">
                            <p>${totalcost}</p>
                        </div>
                    </div>
                    {discount !== 0 && <div className="flex flex-row justify-between items-center text-emerald-600 ">
                        <div className="text-[12px] font-mono font-bold tracking-[1px] uppercase "> Discount</div>
                        <div className="  text-sm ">
                            <p>-${discount}</p>
                        </div>
                    </div>}
                    <div className="flex flex-row justify-between items-center border-t ">
                        <div className="text-[12px] font-mono font-bold tracking-[1px] text-foreground uppercase "> Total</div>
                        <div className=" text-primary-foreground text-sm ">
                            <p>${totalcost - discount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}