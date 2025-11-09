import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeOutlined, UserOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const publicMenuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/" data-easytag="id1-react/src/components/Layout.js">Главная</Link>
    },
    {
      key: '/login',
      icon: <LoginOutlined />,
      label: <Link to="/login" data-easytag="id2-react/src/components/Layout.js">Войти</Link>
    },
    {
      key: '/register',
      icon: <UserAddOutlined />,
      label: <Link to="/register" data-easytag="id3-react/src/components/Layout.js">Регистрация</Link>
    }
  ];

  const authenticatedMenuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/" data-easytag="id4-react/src/components/Layout.js">Главная</Link>
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile" data-easytag="id5-react/src/components/Layout.js">Профиль</Link>
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout} data-easytag="id6-react/src/components/Layout.js">Выйти</span>
    }
  ];

  const menuItems = isAuthenticated ? authenticatedMenuItems : publicMenuItems;

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px', background: '#001529' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '40px' }} data-easytag="id7-react/src/components/Layout.js">
          Мое приложение
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0, background: 'transparent' }}
        />
      </Header>
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', minHeight: 'calc(100vh - 112px)' }} data-easytag="id8-react/src/components/Layout.js">
          {children}
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;