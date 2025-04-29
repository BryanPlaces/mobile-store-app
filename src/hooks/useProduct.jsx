import { fetchProducts } from '../services/products';
import { useState, useEffect, useCallback } from 'react';

export function useProduct() {

  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const products = await fetchProducts();
    setProducts(products);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    products,
    getProducts,
  }
}