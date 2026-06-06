import { Product } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {

    try {
        const response = await fetch("/api/product");

        if (!response.ok) {
            throw new Error("Failed to fetch Products");
        }

        const result = await response.json();

        if (
            !result.success ||
            !Array.isArray(result.data)
        ) {
            throw new Error("Invalid API response");
        }
        return result.data;
    } catch (error) {

        console.error(
            "Error fetching Products:",
            error
        );

        return [];
    }
};

export const fetchPassage=async()=>{
    const products = await fetchProducts()
    return products.filter(
        (product) => product.type==="TICKET"
    )
}

export const fetchMerch=async()=>{
    const products = await fetchProducts()
    return products.filter(
        (product) => product.type==="MERCH"
    )
}