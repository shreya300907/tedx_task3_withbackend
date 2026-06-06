import { NextResponse } from "next/server";

export async function GET() {
    try {

        const response = await fetch(
            "http://localhost:5000/products",
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to fetch",
                },
                {
                    status: response.status,
                }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                message: "Server error",
            },
            {
                status: 500,
            }
        );
    }
}