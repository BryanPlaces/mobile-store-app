import { useState, useEffect } from "react";
import { fetchProducts } from "../services/products";
import { Link } from "react-router-dom";
import "./../styles/Products.css";

const ProductItem = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card align-items-center h-100">
        <img src={product.imgUrl} className="card-img-top" style={{ width: "200px", objectFit: "contain" }} alt="Producto" />
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex-column align-items-start mb-2">
            <h5 className="card-title product-title m-0">{product.brand} - {product.model}</h5>
            <span className="product-price">
              { product.price ? `${product.price}€` : 'Precio no disponible' }
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const ProductsList = () => {

  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    async function getProducts() {
      const products = await fetchProducts();
      setProducts(products)
    }

    getProducts();
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
          <ProductItem product={ product } />
        </div>
      ))}
    </div>
  );
};


const Products = () => {

  return (
    <div className="container text-center my-5">
      <ProductsList />
    </div>
  );
}

export default Products;