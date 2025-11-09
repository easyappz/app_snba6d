import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import './App.css';

function App() {
  useEffect(() => {
    // Call handleRoutes with all available routes
    if (window.handleRoutes) {
      window.handleRoutes(['/', '/login', '/register', '/profile']);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider locale={ruRU}>
        <Router>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </Layout>
          </AuthProvider>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;