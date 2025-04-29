import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import LayoutRoot from "../layout/LayoutRoot";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Products />
      },
      {
        path: '/details-product/:productId',
        element: <ProductDetails />
      },
      {
        path: '/cart',
        element: <CartPage />
      }
    ]
  }
]);