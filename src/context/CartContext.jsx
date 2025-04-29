import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { storeProductCart } from "../services/products";

const storedCartProducts = localStorage.getItem('cart-products');
const initialState = storedCartProducts ? JSON.parse(storedCartProducts) : [];

const storedCartCount = localStorage.getItem('cart-count');
const initialCountState = storedCartCount ? storedCartCount : 0;

const CartContext = createContext({
  productsCart: [],
  addProductToCart: () => {},
  updateProductQuantity: () => {},
  deleteProduct: () => {},
  cleanCart: () => {},
  isProductAdded: () => {},
  productsCartCount: 0,
});

export const CartProvider = ({ children }) => {

  const [productsCart, setProductsCart] = useState(initialState);
  const [productsCartCount, setProductsCartCount] = useState(initialCountState);

  // Timer
  const [clearCartTimer, setClearCartTimer] = useState(null);

  const cleanCart = useCallback(() => {
    setProductsCart([]);
    setProductsCartCount(0);
    if (clearCartTimer) {
      clearTimeout(clearCartTimer);
    }
  }, [clearCartTimer])

  // Initialize or reset the 1-minute timer
  const resetCartTimer = useCallback(() => {
    if (clearCartTimer) {
      clearTimeout(clearCartTimer);
    }
    
    const newTimer = setTimeout(() => {
      cleanCart();
      localStorage.removeItem('cart-products');
      localStorage.removeItem('cart-count');
    }, 3600000); // 1 hour
    
    setClearCartTimer(newTimer);
  }, [cleanCart, clearCartTimer]);

  useEffect(() => {
    localStorage.setItem('cart-products', JSON.stringify(productsCart));
  }, [productsCart])

  useEffect(() => {
    localStorage.setItem('cart-count', productsCartCount);
  }, [productsCartCount])

  // Initialize timer on first render if cart exists
  useEffect(() => {
    if (initialState.length > 0) {
      resetCartTimer();
    }
    
    return () => {
      if (clearCartTimer) {
        clearTimeout(clearCartTimer);
      }
    };
  }, []);

  const addProductToCart = async(product) => {
    const isProductInCart = productsCart.some((item) => item.id === product.id);

    // Check if the product is added to the Cart
    if (!isProductInCart) {
      setProductsCart((prevProducts) => [...prevProducts, { ...product, quantity: 1}]);
      const response = await storeProductCart(product) // STORE BY API
      setProductsCartCount(parseInt(productsCartCount) + response.count);
      resetCartTimer();
    }
  };

  const updateProductQuantity = (productId, amount) => {
    setProductsCart((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  };

  const isProductAdded = useCallback((productId) =>
    productsCart.some(product => product.id === productId),
    [productsCart]
  );
  
  const deleteProduct = (productId) => {
    const newProductsCart = productsCart.filter(product => product.id !== productId);
    setProductsCart(newProductsCart);
    setProductsCartCount(productsCartCount-1);
  }

  return (
    <CartContext.Provider value={{ 
      productsCart,
      addProductToCart,
      updateProductQuantity,
      deleteProduct,
      cleanCart,
      isProductAdded,
      productsCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);