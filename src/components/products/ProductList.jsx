import ProductItem from "./ProductItem";

const ProductsList = ({ products }) => {

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
          <ProductItem product={ product } />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;