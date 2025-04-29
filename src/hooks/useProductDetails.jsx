import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { fetchProductById } from "../services/products";

export function useProductDetails() {

  const { productId } = useParams();
  const [ showAlert, setShowAlert ] = useState(false);
  const [product, setProduct] = useState({});

  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { addProductToCart, isProductAdded } = useCart();

  const addProduct = (product) => {
    setShowAlert(true);
    addProductToCart({...product, selectedColor: selectedColor, selectedStorage: selectedStorage});
    setIsAddToCartDisabled(true)
  };

  // If the color or storage has only one option,
  // that option will be selected by default
  useEffect(() => {
    if (product.options?.colors?.length === 1 && !selectedColor) {
      setSelectedColor(product.options.colors[0].code);
    }

    if (product.options?.storages?.length === 1 && !selectedStorage) {
      setSelectedStorage(product.options.storages[0].code);
    }

  }, [product, selectedColor, selectedStorage])

  useEffect(() => {
    if ((selectedStorage && selectedColor) && isProductAdded(product.id) == false) {
      setIsAddToCartDisabled(false);
    }

  }, [selectedStorage, selectedColor, isProductAdded, product])


  const getProductById = useCallback(async () => {
    try {
      const productData = await fetchProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getProductById();
  }, [getProductById, productId]);

  return {
    product,
    selectedStorage,
    setSelectedStorage,
    selectedColor,
    setSelectedColor,
    showAlert,
    isAddToCartDisabled,
    addProduct,
    isLoading
  }
}