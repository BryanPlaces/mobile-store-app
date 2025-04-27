import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/products";

const ProductDetails = () => {

  const { productId } = useParams();
  const [ showAlert, setShowAlert ]= useState(false);
  const [product, setProduct] = useState({});

  const addProduct = (product) => {
    console.log(product)
    setShowAlert(true);
  };

  useEffect(() => {
    async function getProductById() {
      const product = await fetchProductById(productId);
      setProduct(product)
    }

    getProductById();
  }, [productId]);


  if (!product) {
    return <div className="container text-center">Loading...</div>
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.imgUrl} alt={product.model} className="img-fluid" style={{ height: "400px", width: "400px", objectFit: "contain" }} />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.brand} - {product.model}</h1>
          <h3 className="display-6 fw-bold my-4">{product.price}€</h3>

          { showAlert &&
            <div key="info" className="alert alert-info" role="alert">
              Product added to your cart.
            </div>
          }

          <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(product)} >
            Add to Cart
          </button>
          <NavLink to="/cart">
            <button className="btn btn-dark ms-2 px-3 py-2">
              Go to Cart
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;