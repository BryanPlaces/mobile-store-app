import { useCart } from "../../context/CartContext";
import { DeleteItemIcon } from "./..";

const DeleteItemModal = ({ productId }) => {
  
  const { deleteProduct } = useCart();

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#deleteProductModal"
      >
        <DeleteItemIcon />
      </button>

      <div
        className="modal fade"
        id="deleteProductModal"
        tabIndex="-1"
        aria-labelledby="deleteProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            
            <div className="modal-header">
              <h5 className="modal-title" id="deleteProductModalLabel">Delete product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>

            <div className="modal-body">
              Are you sure you want to remove this product from your cart?
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={() => deleteProduct(productId)} data-bs-dismiss="modal" >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteItemModal;