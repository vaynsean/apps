import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCSV } from '../../actions/productActions';
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

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { successMessage, error } = useSelector(state => state.product);

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadCSV(formData));
  };

  return (
    <Container>
      <h2>Bulk Upload Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <Form onSubmit={onSubmit}>
        <div>
          <Label>CSV File:</Label>
          <Input type="file" name="file" onChange={onChange} />
        </div>
        <Button type="submit">Upload</Button>
      </Form>
    </Container>
  );
};

export default BulkUpload;
