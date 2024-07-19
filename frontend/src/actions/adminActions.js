import axios from 'axios';
import { setUsers, setAdminError, updateUserRoleSuccess } from '../reducers/adminReducer';

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');
    dispatch(setUsers(res.data));
  } catch (err) {
    dispatch(setAdminError(err.response.data.msg));
  }
};

export const updateUserRole = (id, role) => async dispatch => {
  try {
    await axios.put('/api/users/update-role', { id, role });
    dispatch(updateUserRoleSuccess());
    dispatch(getUsers());
  } catch (err) {
    dispatch(setAdminError(err.response.data.msg));
  }
};
