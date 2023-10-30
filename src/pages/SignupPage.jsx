import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Toast from '../components/Toast';
import { ToastContext } from '../App';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  width: 300px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #e6e6fa, #d8bfd8);
`;

const Title = styled.h2`
  color: #4a148c;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #9575CD;
  color: #fff;
  margin: 10px 0;
  padding: 15px;
  width: 110%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #7E57C2;
    transform: scale(1.05);
  }
`;

const AlreadyRegisterTag = styled.a`
  text-decoration: none;
  color: #4a148c;
  margin: 10px 0;
  padding: 15px;
  width: 110%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s, transform 0.2s;
  text-align: center;

  &:hover {
    color: #7e57c2;
    transform: scale(1.05);
  }
`;

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleShowToast } = useContext(ToastContext);


  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, { username, email, password });
      navigate('/login');
      handleShowToast('Signup successful.', 'success');
    } catch (error) {
      console.error('Error signing up:', error);
      handleShowToast('Signup failed.', 'failure');
    }
  };

  return (
    <SignupContainer>
      <Title>Sign Up</Title>
      <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <Button onClick={handleSignup}>Sign Up</Button>
      <AlreadyRegisterTag onClick={handleGoToLogin}>Already a registered user? Log in</AlreadyRegisterTag>
      
    </SignupContainer>
  );
};

export default SignupPage;

