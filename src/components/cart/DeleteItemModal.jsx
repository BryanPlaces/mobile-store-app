import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { DeleteItemIcon } from "./..";

const DeleteItemModal = ({ productId }) => {
  
  const [showModal, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);
  const { deleteProduct } = useCart();

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  return (
    <>
      <button type="button" className="btn btn-outline-dark" onClick={handleShowModal}>
        <DeleteItemIcon />
      </button>

      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to remove this product from your cart?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-outline-danger" onClick={ () => deleteProduct(productId) }>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default DeleteItemModal;