import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Header from './components/Header';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const UserPage = lazy(() => import('./pages/UserPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return element;
};

const App = () => {
  return (
    <Router> 
      <AuthProvider> 
        <ProductProvider>
          <Header />
          <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: '50px auto' }} />} >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/UserPage" element={
                <ProtectedRoute element={<UserPage />} allowedRoles={['user']} />} />
              <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} allowedRoles={['user']} />} />
              <Route path="/AdminPage" element={<ProtectedRoute element={<AdminPage />} allowedRoles={['admin']} />} />
            </Routes>
          </Suspense>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

