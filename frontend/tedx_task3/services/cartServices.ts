import { Cart, CartItem } from "@/types/cart";

export async function addToCart(payload: CartItem) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function removeFromCart(userId: string, productId: string) {
  console.log(productId);
  const res = await fetch(`/api/cart/remove/${encodeURIComponent(productId)}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
}

export async function fetchCart(userId: string): Promise<Cart | null> {
  try {

    const response = await fetch(
      `/api/cart?userId=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );


    if (response.status === 404) {
      return {
    userId,
    status: "PENDING",
    items: [],
    subtotal: 0,
    total: 0,
  } as Cart;
    }


    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }


    const result = await response.json();


    if (!result.success) {
      throw new Error(result.message || "Invalid API response");
    }


    return result.data;


  } catch (error) {

    console.error(
      "Error fetching Cart:",
      error
    );

    return null;
  }
}

export async function updateCartItem(userId: string, productSlug: string, quantity: number) {
  const res = await fetch("/api/cart/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId: productSlug, quantity }),
  });
  return res.json();
}