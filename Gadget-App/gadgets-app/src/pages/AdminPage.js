import React, { useEffect, useState } from 'react';
import { Table, Button, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Default date range: 7 days ago to today using dayjs
  const defaultStartDate = dayjs().subtract(7, 'days');
  const defaultEndDate = dayjs();

  useEffect(() => {
    fetch('http://localhost:5000/admin/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data || []);
        setFilteredOrders(data || []);
      })
      .catch((error) => console.error('Error fetching admin orders:', error));
  }, []);

  const handleCancelOrder = (orderId) => {
    fetch(`http://localhost:5000/admin/cancel-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrders(orders.filter(order => order.id !== orderId)); // Update UI after cancellation
          setFilteredOrders(filteredOrders.filter(order => order.id !== orderId)); // Update filtered list
        }
      })
      .catch((error) => console.error('Error canceling order:', error));
  };

  const handleDateRangeChange = (dates) => {
    if (!dates) return;
    const [start, end] = dates;
    filterOrders(start, end);
  };

  const filterOrders = (start, end) => {
    const filtered = orders.filter(order => {
      const orderDate = dayjs(order.orderDate);
      return orderDate.isBetween(start, end, 'days', '[]');
    });
    setFilteredOrders(filtered);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user',
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
      title: 'Status',
      dataIndex: 'isConfirmed',
      key: 'isConfirmed',
      render: (isConfirmed) => (isConfirmed ? 'Confirmed' : 'Pending'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => handleCancelOrder(record.id)}>
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <div style={{margin:"0rem 1rem"}}>
      <div style={{width:"100%",display:"flex", justifyContent:"space-between"}}>
        <h2>Admin Orders</h2>
        <Space style={{ marginBottom: 16 }}>
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[defaultStartDate, defaultEndDate]} 
            onChange={handleDateRangeChange}
            disabledDate={(current) => current && current > dayjs()}  // Disable future dates for end date 
          />
        </Space>
      </div>
      <Table dataSource={filteredOrders} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminPage;


