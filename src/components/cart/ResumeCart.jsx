import { useCart } from "../../context/CartContext";

const ResumeCart = ({ children }) => {

  const { productsCart } = useCart();

  const subtotal = productsCart.reduce((total, product) => total + product.price * product.quantity, 0);
  const shippingCost = 5; // only to add more details
  const total = subtotal + shippingCost;

  return (
    <div className="card sticky-top" style={{ top: "20px" }}>
      <div className="card-body">
        <h5 className="card-title">Summary</h5>

        <div className="row mb-2">
          <div className="col">Subtotal</div>
          <div className="col text-end">{subtotal.toFixed(2)}€</div>
        </div>

        <div className="row mb-2">
          <div className="col">Shipping costs</div>
          <div className="col text-end">
            {shippingCost === 0 ? "Free" : `${shippingCost.toFixed(2)}€`}
          </div>
        </div>

        <hr />

        <div className="row mb-3">
          <div className="col">
            <strong>Total</strong>
          </div>
          <div className="col text-end">
            <strong>{total.toFixed(2)}€</strong>
          </div>
        </div>

        { children}
        
      </div>
    </div>
  );
}

export default ResumeCart;