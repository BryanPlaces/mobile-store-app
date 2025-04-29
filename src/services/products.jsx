
const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

const fetchData = async (url) => {
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return [];
  }
};

export const fetchProducts = async () => {
  
  const url = `${BASE_URL}/product`;
 
  const data = await fetchData(url);
  return data;
}

export const fetchProductById = async (productId) => {

  const url = `${BASE_URL}/product/${productId}`;
  
  const data = await fetchData(url);
  return data;
}

export const storeProductCart = async (product) => {
  const url = `${BASE_URL}/cart`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: product.id,
        colorCode: product.selectedColor,
        storageCode: product.selectedStorage
      })
    })

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }

    const result = await response.json();
    console.log('Created product:', result);
    
    return result;

  } catch (err) {
    console.log(err.message);
  }
}
