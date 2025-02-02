import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  // Load saved username from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = async () => {
   
      const response = await axios.post('http://localhost:5000/login', { username, password });

      if ( response.data.user) {
        login(response.data.user); // Save user in auth context
        localStorage.setItem('savedUsername', username); // Save username in localStorage
        message.success(response.data.message)
        if (response.data.user.role === 'admin') {
          navigate('/AdminPage');
        } else {
          navigate('/UserPage');
        }
      }
      else{
        message.warning(response.data.message);
      }
    
  };

  // Trigger login on "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 400, textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
        <Title level={2}>Welcome to Gadget APP</Title>
        <p>Login</p>
        <Input 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          onKeyPress={handleKeyPress} // Listen for Enter key
          style={{ marginBottom: 10 }} 
        />
        <Input.Password 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onKeyPress={handleKeyPress} // Listen for Enter key
          style={{ marginBottom: 10 }} 
        />
        <Button type="primary" block onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;


