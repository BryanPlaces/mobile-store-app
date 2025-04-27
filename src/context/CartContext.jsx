import { createContext, useState, useContext, useEffect } from "react";

const storedCartProducts = localStorage.getItem('cart-products');
const initialState = storedCartProducts ? JSON.parse(storedCartProducts) : [];

const CartContext = createContext({
  productsCart: [],
  addProductToCart: () => {},
  updateProductQuantity: () => {},
  deleteProduct: () => {},
  cleanCart: () => {},
});

export const CartProvider = ({ children }) => {

  const [productsCart, setProductsCart] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('cart-products', JSON.stringify(productsCart));
  }, [productsCart])

  const addProductToCart = (product) => {
    const isProductInCart = productsCart.some((item) => item.id === product.id);

    // Check if the product is added to the Cart
    if (!isProductInCart) {
      setProductsCart((prevProducts) => [...prevProducts, { ...product, quantity: 1}]);
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

  const deleteProduct = (productId) => {
    const newProductsCart = productsCart.filter(product => product.id !== productId);
    setProductsCart(newProductsCart);
  }

  const cleanCart = () => {
    setProductsCart([]);
  }

  return (
    <CartContext.Provider value={{ 
      productsCart,
      addProductToCart,
      updateProductQuantity,
      deleteProduct,
      cleanCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);