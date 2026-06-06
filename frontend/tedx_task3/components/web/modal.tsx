import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product | null;
}

export default function ProductDetailsModal({
    open,
    onOpenChange,
    product,
}: Props) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-none p-0 max-w-6xl! sm:w-[70vw] lg:w-[50vw]" >
                <VisuallyHidden>
                    <DialogTitle>{product.name}</DialogTitle>
                </VisuallyHidden>
                <div className="flex flex-col sm:flex-row h-fit items-stretch">
                    <div className="shrink-0 w-[40%]" >
                        <img src={product.images[0]} alt={product.name} className="h-full w-full" />
                    </div>
                    <div className="w-[60%] px-10 py-10 ">
                        <div className="py-4 text-2xl font-medium tracking-[-0.6px]">
                            {product.name}
                        </div>
                        <div className="text-[#57534D] text-base pb-8">
                            {product.slug}
                        </div>
                        <div className="pb-3 font-consolas text-xs font-normal tracking-[1.2px]">
                            Specifications
                        </div>
                        <div className=" pl-4 text-primary-foreground text-[14px] border-l">
                            {product.description}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}