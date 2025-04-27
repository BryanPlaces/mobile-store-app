import { useCart } from "../context/CartContext";
import { ProductItemCart, ResumeCart } from "../components";

const CartPage = () => {
  const { productsCart } = useCart();
  
  const goToCheckout = () => {
    // Go to the checkout page to complete the purchase.
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          {productsCart.map((product) => (
            <div key={product.id} className="col-sm-12 mb-4">
              <ProductItemCart product={ product }/>
            </div>
          ))}
        </div>

        <div className="col-sm-12 col-md-4">
          <ResumeCart>
            <button className="btn btn-dark w-100" onClick={ goToCheckout }>
              CheckOut
          </button>
          </ResumeCart>
        </div>
      </div>
    </div>
  );
}

export default CartPage;