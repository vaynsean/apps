import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/admin/AddProduct';
import ManageUsers from './components/admin/ManageUsers';
import BulkUpload from './components/admin/BulkUpload';
import ManageProducts from './components/admin/ManageProducts';
import { fetchUser, logout } from './actions/authActions';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated && user?.role === 'admin' ? children : <Navigate to="/" />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <nav>
        <Link to="/">Products</Link>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/register">Register</Link>}
        {isAuthenticated && <Link to="/admin">Admin</Link>}
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
        <Route path="/admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/bulk-upload" element={<AdminRoute><BulkUpload /></AdminRoute>} />
        <Route path="/admin/manage-products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
