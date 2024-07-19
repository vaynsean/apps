import axios from 'axios';
import { setAuth, setAuthError, loadUser, clearErrors, logoutUser } from '../reducers/authReducer';

export const register = ({ name, email, password, role }) => async dispatch => {
  try {
    await axios.post('/api/users/register', { name, email, password, role });
    dispatch({ type: 'REGISTER_SUCCESS' });
  } catch (err) {
    dispatch(setAuthError(err.response.data.msg));
  }
};

export const login = ({ email, password }) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', { email, password });
    dispatch(setAuth(res.data));
    localStorage.setItem('token', res.data.token);
    dispatch(fetchUser());
  } catch (err) {
    dispatch(setAuthError(err.response.data.msg));
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }
};

export const fetchUser = () => async dispatch => {
  if (localStorage.getItem('token')) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/users/profile');
      dispatch(loadUser(res.data));
    } catch (err) {
      dispatch(setAuthError('Failed to load user'));
    }
  } else {
    dispatch(setAuthError(null));
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['x-auth-token'];
  dispatch(logoutUser());
};

export const clearAuthErrors = () => dispatch => {
  dispatch(clearErrors());
};
