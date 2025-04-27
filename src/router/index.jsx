import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
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
        path: '/products/:productId',
        element: <ProductDetails />
      },
    ]
  }
]);