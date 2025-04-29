import { useState } from "react";
import { useProduct } from "../hooks/useProduct";

import { ProductsList, SearchBar } from "../components";
import "./../styles/Products.css";

const Products = () => {

  const [searchValue, setSearchValue] = useState('');
  const { products } = useProduct();
 
  const handleSearch = (term) => {
    setSearchValue(term);
  };

  const filteredProducts = products.filter(product => {
    if (!searchValue.trim()) return true;

    const textValue = searchValue.toLowerCase().split(' ');
    const productSearchValue = [
      product.brand.toLowerCase(),
      product.model.toLowerCase(),
      `${product.brand.toLowerCase()} ${product.model.toLowerCase()}`
    ]

    return textValue.every(term =>
      productSearchValue.some(value => value.includes(term))
    );

  });

  if (!products || Object.keys(products).length === 0) {
    return <div className="container text-center my-5">Loading...</div>
  }

  return (
    <div className="container text-center my-5">
      <SearchBar onSearch={handleSearch} searchValue={searchValue} productsCount={filteredProducts.length} />
      <ProductsList products={filteredProducts} />
    </div>
  );
}

export default Products;