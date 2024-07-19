import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    error: null,
    successMessage: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.error = null;
    },
    setAdminError: (state, action) => {
      state.error = action.payload;
    },
    updateUserRoleSuccess: (state) => {
      state.successMessage = 'User role updated successfully';
    },
    clearAdminErrors: (state) => {
      state.error = null;
    }
  }
});

export const { setUsers, setAdminError, updateUserRoleSuccess, clearAdminErrors } = adminSlice.actions;
export default adminSlice.reducer;
