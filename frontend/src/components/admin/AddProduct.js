import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/productActions';
import styled from 'styled-components';

const Container = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
\`;

const Form = styled.form\`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 20px 0;
\`;

const Label = styled.label\`
  color: \${({ theme }) => theme.textColor};
\`;

const Input = styled.input\`
  padding: 10px;
  border: 2px solid \${({ theme }) => theme.textColor};
  border-radius: 5px;
\`;

const Button = styled.button\`
  background: \${({ theme }) => theme.buttonBackground};
  color: \${({ theme }) => theme.buttonText};
  border: 2px solid \${({ theme }) => theme.textColor};
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: \${({ theme }) => theme.buttonHoverBackground};
  }
\`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    photo: null
  });

  const dispatch = useDispatch();
  const { successMessage, error } = useSelector(state => state.product);

  const { name, description, price, category, stock, photo } = formData;

  const onChange = e => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    dispatch(addProduct(formDataToSend));
  };

  return (
    <Container>
      <h2>Add Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <Form onSubmit={onSubmit}>
        <div>
          <Label>Name:</Label>
          <Input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <Label>Description:</Label>
          <Input type="text" name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <Label>Price:</Label>
          <Input type="number" name="price" value={price} onChange={onChange} required />
        </div>
        <div>
          <Label>Category:</Label>
          <Input type="text" name="category" value={category} onChange={onChange} required />
        </div>
        <div>
          <Label>Stock:</Label>
          <Input type="number" name="stock" value={stock} onChange={onChange} required />
        </div>
        <div>
          <Label>Photo:</Label>
          <Input type="file" name="photo" onChange={onChange} />
        </div>
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
