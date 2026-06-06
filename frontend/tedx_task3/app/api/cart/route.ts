import { NextResponse } from "next/server";

const BACKEND ="http://localhost:5000";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ success: false, message: "Missing userId" }, { status: 400 });
    }

    const resp = await fetch(`${BACKEND}/cart/${encodeURIComponent(userId)}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId || !body.productId || !body.quantity || !body.productType) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const resp = await fetch(`${BACKEND}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}