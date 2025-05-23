import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {

  const productName = `${product.brand} ${product.model}`;
  
  return (   
      <div className="card card-product h-100 shadow-sm">
        <Link to={`/details-product/${product.id}`} state={{ productName: productName }} style={{ textDecoration: "none", color: "inherit" }}>
          <img src={product.imgUrl} className="card-img-top" alt={ product.model } />
        </Link>
        <div className="label-top shadow-sm">
          { product.brand }
        </div>
        <div className="card-body">
          <div className="clearfix mb-3">
            {
              product.price && <span className="float-start badge rounded-pill bg-success">{product.price}€</span>
            }
            
          </div>
          <h6 className="card-title">
            <Link to={`/details-product/${product.id}`} state={{ productName: productName }} style={{ textDecoration: "none" }}>
              {`${product.brand} ${product.model}`}
            </Link>
          </h6>
        </div>
      </div>
  );
}

export default ProductItem;