import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../actions/productActions';
import styled from 'styled-components';

const Container = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
\`;

const ProductTable = styled.table\`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1em;
  text-align: left;
\`;

const TableHead = styled.th\`
  background-color: \${({ theme }) => theme.textColor};
  color: white;
  text-align: center;
  padding: 10px;
\`;

const TableRow = styled.tr\`
  border-bottom: 1px solid \${({ theme }) => theme.textColor};
\`;

const TableData = styled.td\`
  text-align: center;
  padding: 10px;
\`;

const Button = styled.button\`
  background: \${({ theme }) => theme.buttonBackground};
  color: \${({ theme }) => theme.buttonText};
  border: 2px solid \${({ theme }) => theme.textColor};
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: \${({ theme }) => theme.buttonHoverBackground};
  }
\`;

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Container>
      <h2>Manage Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProductTable>
        <thead>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </thead>
        <tbody>
          {products.map(product => (
            <TableRow key={product._id}>
              <TableData>{product.name}</TableData>
              <TableData>{product.description}</TableData>
              <TableData>\${product.price}</TableData>
              <TableData>{product.category}</TableData>
              <TableData>{product.stock}</TableData>
              <TableData>
                <Button onClick={() => handleDelete(product._id)}>Delete</Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </ProductTable>
    </Container>
  );
};

export default ManageProducts;
