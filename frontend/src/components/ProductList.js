import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import styled from 'styled-components';

const Container = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
\`;

const ProductContainer = styled.div\`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
\`;

const ProductCard = styled.div\`
  border: 1px solid \${({ theme }) => theme.textColor};
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
\`;

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <h2>Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProductContainer>
        {products.map(product => (
          <ProductCard key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>\${product.price}</p>
          </ProductCard>
        ))}
      </ProductContainer>
    </Container>
  );
};

export default ProductList;
