import ProductItem from "./ProductItem";

const ProductsList = ({ products }) => {

  return (
    <div className="container-fluid bg-trasparent my-4 p-3 position-relative">
      <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
        {
          products.map((product) => (
            <div className="col" key={product.id}>
              <ProductItem product={ product } />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProductsList;
