import axios from 'axios';
import { setProducts, setProduct, setProductError, addProductSuccess, addProductFail, deleteProductSuccess } from '../reducers/productReducer';

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    dispatch(setProducts(res.data));
  } catch (err) {
    dispatch(setProductError(err.response?.data?.msg || 'Error fetching products'));
  }
};

export const getProductById = (id) => async dispatch => {
  try {
    const res = await axios.get(\`/api/products/\${id}\`);
    dispatch(setProduct(res.data));
  } catch (err) {
    dispatch(setProductError(err.response?.data?.msg || 'Error fetching product'));
  }
};

export const addProduct = (productData) => async dispatch => {
  try {
    const res = await axios.post('/api/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFail(err.response?.data?.msg || 'Error adding product'));
  }
};

export const deleteProduct = (id) => async dispatch => {
  try {
    await axios.delete(\`/api/products/\${id}\`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(setProductError(err.response?.data?.msg || 'Error deleting product'));
  }
};

export const updateProduct = (id, updatedData) => async dispatch => {
  try {
    const res = await axios.put(\`/api/products/\${id}\`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(getProductById(res.data._id)); // Fetch the updated product
  } catch (err) {
    dispatch(setProductError(err.response?.data?.msg || 'Error updating product'));
  }
};
