import { Link } from "react-router-dom";

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

export default ProductItem;