import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/products";
import { useCart } from "../context/CartContext";

const ProductOptionSelector  = ({ options, selectedOption, onSelect, title, optionType }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        className={`w-100 p-3 text-start border rounded d-flex justify-content-between align-items-center ${ isOpen ? "border-dark" : "border-light" }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ background: "none", cursor: "pointer" }}
      >
        <span>
          {
            selectedOption ? `${title}: ${options.find((opt) => opt.code === selectedOption)?.name}` : `Select a ${title.toLowerCase()}`
          }
        </span>
        <span>{ isOpen ? "-" : "+" }</span>
      </button>

      {/* Collapse options */}
      <div className={`collapse ${isOpen ? "show" : ""}`}>
        <div className="mt-2 border rounded p-3">
          {
            options.map((option) => (
              <div
                key={option.code}
                className={`p-2 mb-2 rounded ${selectedOption === option.code ? "bg-light border border-dark" : "border"}`}
                onClick={() => onSelect(option.code)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <input
                    id={`${optionType}-${option.code}`}
                    type="radio"
                    name={`${optionType}Options`}
                    value={option.code}
                    checked={selectedOption === option.code}
                    onChange={() => onSelect(option.code)}
                    className="me-2"
                  />
                  <label htmlFor={`${optionType}-${option.code}`} className="mb-0">
                    { option.name }
                  </label>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const ProductDetails = () => {

  const { productId } = useParams();
  const [ showAlert, setShowAlert ] = useState(false);
  const [product, setProduct] = useState({});


  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);

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

  useEffect(() => {
    async function getProductById() {
      const product = await fetchProductById(productId);
      setProduct(product);      
    }

    getProductById();
  }, [productId]);


  if (!product || Object.keys(product).length === 0) {
    return <div className="container text-center">Loading...</div>
  }

  return (
    <div className="container py-5">

      <div className="mb-5">
        <NavLink to="/">
          <button className="btn btn-outline-secondary px-3 py-2">
            ← Go back
          </button>
        </NavLink>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img src={product.imgUrl} alt={product.model} className="img-fluid" style={{ height: "400px", width: "400px", objectFit: "contain" }} />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{`${product.brand} ${product.model}`}</h1>
          <h3 className="display-6 fw-bold my-4">
            { product.price ? `${product.price}€` : 'Price not available (€)' }
          </h3>

          <h4>Specifications {`${product.brand} ${product.model}`}</h4>

          <ul>
            <li><strong>CPU:</strong> {product.cpu}</li>
            <li><strong>RAM:</strong> {product.ram}</li>
            <li><strong>Operating System:</strong> {product.os}</li>
            <li><strong>Screen Resolution:</strong> {product.displaySize}</li>
            <li><strong>Battery:</strong> {product.battery}</li>
            <li><strong>Cameras:</strong>
              <ul>
                <li><strong>Primary:</strong> { Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera }</li>
                <li><strong>Secondary: </strong>{ Array.isArray(product.secondaryCamera) ? product.secondaryCmera.join(', ') : product.secondaryCmera }</li>
              </ul>
            </li>
            <li><strong>Dimensions:</strong> {product.dimentions}</li>
            <li><strong>Weight:</strong> {product.weight} g</li>
          </ul>

          {
            product.price &&
            <>
              {/* Storage selector */}
              <ProductOptionSelector
                options={product.options.storages}
                selectedOption={selectedStorage}
                onSelect={setSelectedStorage}
                title="Storage"
                optionType="storage"
              />

              {/* Color selector */}
              <ProductOptionSelector
                options={product.options.colors}
                selectedOption={selectedColor}
                onSelect={setSelectedColor}
                title="Color"
                optionType="color"
              />
            

            { showAlert &&
              <div key="info" className="alert alert-info" role="alert">
                Product added to your cart.
              </div>
            }

            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-outline-dark px-4 py-2" disabled={ isAddToCartDisabled } onClick={() => addProduct(product)} >
                Add to Cart
              </button>
              <NavLink to="/cart">
                <button className="btn btn-dark ms-2 px-3 py-2">
                  Go to Cart
                </button>
              </NavLink>
            </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;