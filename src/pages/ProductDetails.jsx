import { NavLink } from "react-router-dom";
import { ProductOptionSelector, ProductSpecifications } from "../components";
import { useProductDetails } from "../hooks/useProductDetails";

const ButtonNavigateTo = ({toRoute, text, classNameButton}) => {
  return (
    <NavLink to={toRoute}>
      <button className={classNameButton}>
        {text}
      </button>
    </NavLink>
  )
}

const ProductDetails = () => {

  const {
    product,
    selectedStorage,
    setSelectedStorage,
    selectedColor,
    setSelectedColor,
    showAlert,
    isAddToCartDisabled,
    addProduct,
    isLoading
  } = useProductDetails();

  if (isLoading) {
    return <div className="container text-center">Loading...</div>;
  }

  return (
    <div className="container py-5">

      <div className="mb-5">
        <ButtonNavigateTo toRoute={'/'} text={'← Go back'} classNameButton={'btn btn-outline-secondary px-3 py-2'} />
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

          <ProductSpecifications product={product} />

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
                <ButtonNavigateTo toRoute={'/cart'} text={'Go to Cart'} classNameButton={'btn btn-dark ms-2 px-3 py-2'} />
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;