import { useCart } from "../../context/CartContext";
import DeleteItemModal from "./DeleteItemModal";

const ProductItemCart = ({ product }) => {

  const { updateProductQuantity } = useCart();

  return (
    <div className="card h-100">
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-2 col-xs-3">
          <img
            src={product.imgUrl}
            alt={product.title}
            className="img-fluid"
            style={{ height: "100px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-8 col-xs-6">
          <h5 className="card-title product-title m-0">
            {`${product.brand} ${product.model}`}
          </h5>
          <div className="d-flex align-items-center mt-2 gap-2">
            <div className="btn-group" role="group" aria-label="Cantidad">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => updateProductQuantity(product.id, -1)}
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <button className="btn btn-outline-secondary" disabled>
                {product.quantity}
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => updateProductQuantity(product.id, 1)}
              >
                +
              </button>
            </div>

            <DeleteItemModal productId={product.id} />
          </div>

        </div>

        <div className="col-md-2 col-xs-3 text-end">
          <span className="product-price">${product.price}</span>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProductItemCart;