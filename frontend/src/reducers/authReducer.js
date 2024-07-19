import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
    },
    setAuthError: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    loadUser: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  }
});

export const { setAuth, setAuthError, loadUser, logoutUser, clearErrors } = authSlice.actions;
export default authSlice.reducer;
