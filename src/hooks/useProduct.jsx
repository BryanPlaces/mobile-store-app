import { fetchProducts, fetchProductById } from '../services/products';
import { useState, useCallback } from 'react';

export function useProduct() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const getProducts = useCallback(async () => {
    const products = await fetchProducts();
    setProducts(products);
  }, []);

  const getProductById = useCallback(async (productId) => {
    const product = await fetchProductById(productId);
    setProduct(product);
  }, []);

  return {
    product,
    products,
    getProducts,
    getProductById,
  }
}