import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext'; 
import { Button, Input, Select, message } from 'antd';
import { fetchProducts } from '../utils/fetchProducts'; 
import { useNavigate } from 'react-router-dom'; 

const { Option } = Select;

const UserPage = () => {
  const { state, dispatch } = useProductContext(); 
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || loggedInUser.role !== 'user') {
      message.error('Access Denied! Please log in as a User.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!Array.isArray(state.products)) {
      console.error("state.products is not an array", state.products);
      return;
    }

    setFilteredData(
      state.products.filter(
        (item) =>
          (!category || item.category === category) &&
          (!search || item.title.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [category, search, state.products]);

  
  const handleAddOrder = (product) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (!loggedInUser) {
      message.error('Please log in to add an order.');
      navigate('/');
      return;
    }
  
    const orderId = Date.now(); 
    const order = {
      id: orderId,
      ...product,
      user: loggedInUser.username, 
    };
  
    fetch('http://localhost:5000/add-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: loggedInUser.username, order }),
    })
    .then(response => response.json())
    .then(() => {
      message.success(`Added ${product.title} to your orders.`);
      navigate('/orders'); // Navigate without updating local state
    })
    .catch(error => {
      message.error('Error adding order.');
      console.error(error);
    });
  };


  return (
    <div style={{ padding: 30 }}>
      <h2>User Page - Browse Products</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Input.Search
          placeholder="Search products"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '200px' }}
        />
        <Select
          placeholder="Select category"
          value={category}
          onChange={setCategory}
          allowClear
          style={{ width: '200px' }}
        >
          <Option value="smartphones">Smartphones</Option>
          <Option value="laptops">Laptops</Option>
          <Option value="mobile-accessories">Accessories</Option>
        </Select>
      </div>

      {filteredData.length === 0 ? (
        <p>No products found. Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredData.map((item) => (
            <div key={item.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px', 
              width: '250px', 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center', 
              marginLeft: '15px',
            }}>
              <h3>{item.title}</h3>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <Button
                type="primary"
                onClick={() => handleAddOrder(item)}
                style={{ marginTop: '10px' }}
              >
                Add Order
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
