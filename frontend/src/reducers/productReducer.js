import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    error: null,
    successMessage: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.error = null;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
      state.error = null;
    },
    setProductError: (state, action) => {
      state.products = [];
      state.product = null;
      state.error = action.payload;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.successMessage = 'Product added successfully';
      state.error = null;
    },
    addProductFail: (state, action) => {
      state.error = action.payload;
      state.successMessage = null;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(product => product._id !== action.payload);
      state.successMessage = 'Product deleted successfully';
      state.error = null;
    }
  }
});

export const { setProducts, setProduct, setProductError, addProductSuccess, addProductFail, deleteProductSuccess } = productSlice.actions;
export default productSlice.reducer;
