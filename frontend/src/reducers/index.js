import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  admin: adminReducer
});

export default rootReducer;
