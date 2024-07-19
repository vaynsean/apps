import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAuthErrors } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(clearAuthErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={onSubmit}>
        <div>
          <Label>Email:</Label>
          <Input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <Label>Password:</Label>
          <Input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
