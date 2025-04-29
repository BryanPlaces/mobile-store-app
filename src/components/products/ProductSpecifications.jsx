const ProductSpecifications = ({product}) => (
  <>
    <h4>Specifications {`${product.brand} ${product.model}`}</h4>

    <ul>
      <li><strong>CPU:</strong> {product.cpu}</li>
      <li><strong>RAM:</strong> {product.ram}</li>
      <li><strong>Operating System:</strong> {product.os}</li>
      <li><strong>Screen Resolution:</strong> {product.displaySize}</li>
      <li><strong>Battery:</strong> {product.battery}</li>
      <li><strong>Cameras:</strong>
        <ul>
          <li><strong>Primary:</strong> { Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera }</li>
          <li><strong>Secondary: </strong>{ Array.isArray(product.secondaryCamera) ? product.secondaryCmera.join(', ') : product.secondaryCmera }</li>
        </ul>
      </li>
      <li><strong>Dimensions:</strong> {product.dimentions}</li>
      <li><strong>Weight:</strong> {product.weight} g</li>
    </ul>
  </>
)

export default ProductSpecifications;