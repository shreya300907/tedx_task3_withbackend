import { NextResponse } from "next/server";

const BACKEND = "http://localhost:5000";

export async function DELETE(request: Request, { params }: { params: { productId: string } }) {
  try {
    const productId = params.productId;
    const body = await request.json().catch(() => ({}));
    const userId = body.userId ?? request.headers.get("x-user-id");
    console.log("Next API /api/cart/remove incoming:", { productId, userId, BACKEND });
    if (!userId) {
      return NextResponse.json({ success: false, message: "No userId provided" }, { status: 400 });
    }

    const resp = await fetch(`${BACKEND}/cart/remove/${encodeURIComponent(productId)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}