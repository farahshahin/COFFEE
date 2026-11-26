import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
         setError(null);
         const data = await getProducts();
         setProducts(data);
        }catch (err) {
            setError(err);
        } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}