import React from 'react';
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => navigate('/profile')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      onClick: handleLogout
    }
  ];

  const navigationItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Главная</Link>
    }
  ];

  if (!isAuthenticated) {
    navigationItems.push(
      {
        key: '/login',
        icon: <LoginOutlined />,
        label: <Link to="/login">Войти</Link>
      },
      {
        key: '/register',
        icon: <UserAddOutlined />,
        label: <Link to="/register">Регистрация</Link>
      }
    );
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header 
        data-easytag="id1-src/components/Layout.js"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: '#001529'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div 
            data-easytag="id2-src/components/Layout.js"
            style={{ 
              color: 'white', 
              fontSize: '20px', 
              fontWeight: 'bold',
              marginRight: '30px'
            }}
          >
            MyApp
          </div>
          <Menu
            data-easytag="id3-src/components/Layout.js"
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={navigationItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        
        {isAuthenticated && user && (
          <Dropdown 
            menu={{ items: userMenuItems }} 
            placement="bottomRight"
          >
            <Space 
              data-easytag="id4-src/components/Layout.js"
              style={{ cursor: 'pointer', color: 'white' }}
            >
              <Avatar icon={<UserOutlined />} />
              <span>{user.first_name} {user.last_name}</span>
            </Space>
          </Dropdown>
        )}
      </Header>
      
      <Content 
        data-easytag="id5-src/components/Layout.js"
        style={{ padding: '24px', background: '#f0f2f5' }}
      >
        {children}
      </Content>
      
      <Footer 
        data-easytag="id6-src/components/Layout.js"
        style={{ textAlign: 'center', background: '#001529', color: '#fff' }}
      >
        MyApp ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </AntLayout>
  );
};

export default Layout;