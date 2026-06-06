// "use client"

// import { useState } from "react";
// import { Product } from "../../types/product";
// import { useCart } from "@/context/cartContext";
// import ProductDetailsModal from "./modal";
// import { Cart, CartItem } from "@/types/cart";

// export default function ProductCards({ products }: { products: Product[] }) {
//     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//     const [open, setOpen] = useState(false);
//     // const { cart, setCart, count, setCount } = useCart();
//     // const addCart = (product: Product) => {
//     //     setCount(count + 1); 
//     //     setCart((prev) => {
//     //         const exisiting = prev.find(item => item._id == product._id);
//     //         if (exisiting) {
//     //             return prev.map(item => item._id == product._id ? { ...item, quantity: item.quantity + 1 } : item)
//     //         }
//     //         return [...prev, { ...product, quantity: 1 }];
//     //     });
//     // }
//     // const removeCart = (product: Product) => {
//     //     setCart(prev => {
//     //         return prev.map((item) => {
//     //             if (item._id == product._id) {
//     //                 setCount(count - 1);
//     //                 return { ...item, quantity: item.quantity - 1 };
//     //             } else {
//     //                 return item;
//     //             }
//     //         }).filter(item => item.quantity > 0);
//     //     });
//     // }
//     const [cart,setCart]=useState<Cart | null>(null) 
//     const addCart=(product:Product )=>{
//         const cartItem:CartItem = {
//             productId: product._id,
//             quantity,
//             productType: product.type,
//             priceAtPurchase: product.price,
//             selectedSize: body.selectedSize,
//         };
//     }
//     const handleOpen = (product: Product) => {
//         setSelectedProduct(product);
//         setOpen(true);
//     };
"use client"

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Cart, CartItem } from "@/types/cart";
import { addToCart, removeFromCart, updateCartItem, fetchCart } from "@/services/cartServices"; // adjust path
import ProductDetailsModal from "./modal";

export default function ProductCards({ products, userId, cartChg, setCartChg }: {
  products: Product[], userId: string | null, cartChg: boolean, setCartChg: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loadingFor, setLoadingFor] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const c = await fetchCart(userId);
      setCart(c);
    })();
  }, [userId]);

  const isLoading = (id: string) => !!loadingFor[id];
  const setLoading = (id: string, v: boolean) =>
    setLoadingFor((prev) => ({ ...prev, [id]: v }));

  const getQuantity = (product: Product) => {
    if (!cart?.items) return 0;
    // backend stores productId as slug (or _id) — check both just in case
    const item = cart.items.find(
      (it: CartItem) => it.productId === product.slug || it.productId === product._id,
    );
    return item?.quantity ?? 0;
  };
  // const [cartChg,setCartChg]=useState(true);
  async function handleAdd(product: Product) {
    if (!userId) {
      console.warn("No userId, please login or set guest id");
      return;
    }

    setLoading(product._id, true);
    try {
      const currentQty = getQuantity(product); // reads from local cart state

      if (currentQty === 0) {
        // not in cart — add a new item
        const payload = {
          userId,
          productId: product.slug, // backend expects slug currently
          quantity: 1,
          productType: product.type,
          priceAtPurchase: product.price
          // selectedSize: "M" // include if required for MERCH
        };
        const resp = await addToCart(payload);
        if (resp?.success) {
          setCart(resp.data);
          setCartChg(prev => !prev);
        } else {
          console.error("Add to cart failed:", resp?.message);
        }
      } else {
        // already in cart — update existing item's quantity
        const newQty = currentQty + 1;
        const resp = await updateCartItem(userId, product.slug, newQty);
        if (resp?.success) {
          setCart(resp.data);
          setCartChg(prev => !prev);
        } else {
          console.error("Update quantity failed:", resp?.message);
        }
      }
    } catch (err) {
      console.error("Add error", err);
    } finally {
      setLoading(product._id, false);
    }
  }
  async function handleRemove(product: Product) {
    if (!userId) {
      console.warn("No userId, please login or set guest id");
      return;
    }
    const qty = getQuantity(product);
    setLoading(product._id, true);

    try {
      if (qty <= 1) {
        // remove entire item
        const resp = await removeFromCart(userId, product.slug);
        if (resp?.success) {
          setCart(resp.data);
          setCartChg(prev => !prev);
        }
        else {
          console.error("Remove failed:", resp?.message);
        }
      } else {
        // decrement quantity using update endpoint
        const resp = await updateCartItem(userId, product.slug, qty - 1);
        if (resp?.success) {
          setCart(resp.data);
          setCartChg(!cartChg);
        }
        else {
          console.error("Update failed:", resp?.message);
        }
      }
    } catch (err) {
      console.error("Remove error", err);
    } finally {
      setLoading(product._id, false);
    }
  }

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  return (
    <div className="flex flex-col gap-px bg-border">
      {products.map((product) => (
        <div key={product._id} className="bg-background py-8 flex flex-col sm:flex-row gap-8">
          <div className="w-48 aspect-square shrink-0 mx-auto sm:mx-0">
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover object-center" />
          </div>
          <div className="flex flex-col justify-between w-full gap-4">
            <div className="gap-2 flex flex-col ">
              <div className="justify-between flex flex-col lg:flex-row">
                <span className="text-base sm:text-lg font-medium leading-7 tracking-[-0.5px]">{product.name}</span>
                <span className="text-base sm:text-lg font-medium">{product.currency}{product.price}</span>
              </div>
              <div>
                <p className="text-primary-foreground text-xs sm:text-sm font-normal leading-[22.75px]">{product.slug.slice(0, 100)}...</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between lg:gap-0 gap-2">
              <div className="flex flex-row items-end gap-1.5 cursor-pointer" onClick={() => handleOpen(product)}>
                <img src="/details.svg" alt="info" className="h-[14px]" />
                <h1 className="sm:text-xs text-[10px] font-normal tracking-[1.2px] text-[#A6A09B] align-bottom ">DETAILS</h1>
              </div>
              <div className="flex flex-row justify-end bg-white border-2 w-fit">
                <div
                  className=" py-1.25 sm:py-1.75 pl-2 text-[#A6A09B] text-sm sm:text-sm cursor-pointer"
                  onClick={() => handleRemove(product)}
                >
                  {isLoading(product._id) ? "..." : "-"}
                </div>
                <div className="px-4 py-1.25 sm:py-1.5 text-foreground">{getQuantity(product)}</div>
                <div
                  className="py-1.25 sm:py-1.75 pr-2 text-[#A6A09B] text-sm sm:text-sm cursor-pointer"
                  onClick={() => handleAdd(product)}
                >
                  {isLoading(product._id) ? "..." : "+"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <ProductDetailsModal
        open={open}
        onOpenChange={setOpen}
        product={selectedProduct}
      />
    </div>
  )
}