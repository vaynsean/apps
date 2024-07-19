import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
\`;

const DashboardHeader = styled.h2\`
  color: \${({ theme }) => theme.textColor};
\`;

const LinkContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
\`;

const AdminLink = styled(Link)\`
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  &:hover {
    background-color: #0056b3;
  }
\`;

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Container>
      <DashboardHeader>Welcome, {user.name}</DashboardHeader>
      <LinkContainer>
        <AdminLink to="/admin/manage-products">Manage Products</AdminLink>
        <AdminLink to="/admin/add-product">Add Product</AdminLink>
        <AdminLink to="/admin/manage-users">Manage Users</AdminLink>
        <AdminLink to="/admin/bulk-upload">Bulk Upload</AdminLink>
      </LinkContainer>
    </Container>
  );
};

export default AdminDashboard;
