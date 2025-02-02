import React from 'react';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Header = () => {
  const navigate = useNavigate();
  const { loginState, setLoginState,user } = useAuth();

  // Logout function
  const handleLogout = () => {
    setLoginState(null); 
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <>
      <Menu mode="horizontal" theme="dark" selectable={false}>
        {loginState && user?.role === 'user' ? (
          <div style={{marginRight: 'auto'}}>
            <Menu.Item key="user" onClick={() => navigate('/UserPage')}>
              User Page
            </Menu.Item>
            <Menu.Item key="orders" onClick={() => navigate('/orders')}>
              Orders
            </Menu.Item>
          </div>
        ) : null}

        {loginState && user?.role === 'admin' ? (
          <Menu.Item key="admin" onClick={() => navigate('/AdminPage')}>
            Admin Page
          </Menu.Item>
        ) : null}

        <div style={{ marginLeft: 'auto' }}>
          <Menu.Item key="username" style={{}}>
              <span style={{ color: 'white' }}>Welcome, {user?.username}</span> 
          </Menu.Item>
        
          {loginState ? (
          <Menu.Item key="logout" onClick={handleLogout} >
            <Button type="primary">Logout</Button>
          </Menu.Item>
          ) : null}
        </div>
    
      </Menu>

    </>
  );
};

export default Header;

