import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure loggedInUser exists before attempting to fetch orders
    if (!loggedInUser) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${loggedInUser.username}`);
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Call function to fetch orders
  }, [loggedInUser]); 

  const handleCancelOrder = (orderId) => {
    fetch(`http://localhost:5000/cancel-order/${orderId}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        message.success('Order canceled successfully.');
        setOrders(orders.filter(order => order.id !== orderId)); // Update UI after cancellation
      })
      .catch(() => message.error('Error canceling order.'));
  };

  const handleConfirmOrder = (orderId) => {
    // Load users data from users.json (or your API)

    fetch('http://localhost:5000/confirm-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: loggedInUser.username, orderId }),
    })
    .then(response => response.json())
    .then((res) => {
      message.success(res.message);
      navigate('/UserPage'); 
    })
    .catch(error => {
      message.error('Error adding order.');
      console.error(error);
    });

  };
  
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
        {!record.isConfirmed ? (
          <>
          <Button
            type="primary"
            onClick={() => handleConfirmOrder(record.id)}
            style={{ marginRight: 10 }}
          >
            Confirm Order
          </Button>
          <Button danger onClick={() => handleCancelOrder(record.id)}>
            Cancel Order
          </Button>
        </>
        ) : (
          <span>Order Confirmed</span>
        )}
      </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders found.</p> : <Table dataSource={orders} columns={columns} rowKey="id" />}
    </div>
  );
};

export default OrdersPage;

