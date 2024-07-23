import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react"

export const useProducts = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchProducts = useCallback(() => {
        (async () => {
            setError(false);
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`);
            if (response.status === 200) {
                const data = await response.json();
                setProducts(data);
            } else {
                setError(true);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {products, loading, error, retry: fetchProducts}
}