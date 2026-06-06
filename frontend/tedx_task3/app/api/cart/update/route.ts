import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:5000";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body?.userId || !body?.productId || !body?.quantity) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const resp = await fetch(`${BACKEND}/cart/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}