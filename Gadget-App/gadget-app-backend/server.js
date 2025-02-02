const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Read users from the users.json file (use synchronous reading for simplicity)
const getUsers = () => {
  const data = fs.readFileSync('users.json');
  return JSON.parse(data);
};

//save data
const saveUsers = (users) => {
  const data = JSON.stringify(users, null, 2);
  fs.writeFileSync('users.json', data);
};

// API to authenticate and login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Get users from the users.json file
  const users = getUsers();

  // Find the user in the users array
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.json({ message: "Invalid credentials" }); 
  }

  res.json({
    message: "Login successful",
    user: { username: user.username, role: user.role, orders: user.orders }
  });
});


app.post('/add-order', (req, res) => {
  const { username, order } = req.body;
  
  // Get users from the users.json file
  const users = getUsers();
  
  // Find the user by username
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const confirmedOrder = {
    ...order,
    isConfirmed: false,  
    orderDate: new Date().toISOString()  // Add order date
  };

  user.orders.push(confirmedOrder);

  // Save the updated users array to the users.json file
  saveUsers(users);

  // Respond with the updated user and order information
  res.json({
    message: 'Order added and confirmed successfully',
    user: { 
      username: user.username, 
      orders: user.orders 
    }
  });
});
app.get('/orders/:username', (req, res) => {
  const { username } = req.params;
  const users = getUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ orders: user.orders });
});
app.delete('/cancel-order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const users = getUsers();

  let orderFound = false;

  users.forEach(user => {
    const initialLength = user.orders.length;
    user.orders = user.orders.filter(order => order.id !== parseInt(orderId));
    if (user.orders.length !== initialLength) {
      orderFound = true;
    }
  });

  if (!orderFound) {
    return res.status(404).json({ message: 'Order not found' });
  }

  saveUsers(users);
  res.json({ message: 'Order canceled successfully' });
});

app.post('/confirm-order', (req, res) => {
  const { orderId, username } = req.body;

  // Get all users
  const users = getUsers();

  // Find the user and the specific order
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.json({ success: false, message: 'User not found.' });
  }

  // Find the specific order in the user's orders
  const orderIndex = user.orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    return res.json({ success: false, message: 'Order not found.' });
  }
  // Get the order to confirm
  const orderToConfirm = user.orders[orderIndex];

  // Check if order is already confirmed
  if (!orderToConfirm.isConfirmed) {
    orderToConfirm.isConfirmed = true;

    // Find the admin
    let admin = users.find(u => u.username === 'admin');
    if (admin) {
      // Check if the order already exists in the admin's orders
      let isOrderAlreadyExists = admin.orders.some(order => order.id === orderId);
      
      if (!isOrderAlreadyExists) {
        const orderToAdd = user.orders.find(order => order.id === orderId);
        
        if (orderToAdd) {
          // Add the order to admin's orders
          admin.orders.push(orderToAdd);

          saveUsers(users);

          return res.json({
            success: true,
            message: 'Order confirmed and added to admin orders',
          });
        }
      } else {
        return res.json({
          success: false,
          message: 'Order already exists in admin orders',
        });
      }
    } else {
      return res.json({
        success: false,
        message: 'Admin user not found',
      });
    }
  }

  return res.json({ success: false, message: 'Order is already confirmed.' });
});

  app.get('/admin/orders', (req, res) => {
    const users = getUsers(); 

    const admin = users.find( user => user.username == 'admin' );
    const allOrders = admin?.orders || [];

    res.json(allOrders);
  });

app.post('/admin/cancel-order', (req, res) => {
  const { orderId } = req.body;
  const users = getUsers();

  users.forEach(user => {
    user.orders = user.orders.filter(order => order.id !== orderId);
  });

  saveUsers(users);
  res.json({ success: true, message: 'Order cancelled' });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

