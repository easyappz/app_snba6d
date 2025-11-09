import React from 'react';
import { Card, Typography, Button, Row, Col, Space } from 'antd';
import { UserOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div 
      data-easytag="id1-src/pages/Home.js"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}
    >
      <Card 
        data-easytag="id2-src/pages/Home.js"
        style={{ marginBottom: '24px', textAlign: 'center' }}
      >
        <Title level={1} data-easytag="id3-src/pages/Home.js">
          Добро пожаловать в MyApp!
        </Title>
        <Paragraph 
          data-easytag="id4-src/pages/Home.js"
          style={{ fontSize: '18px', color: '#666' }}
        >
          {isAuthenticated 
            ? `Привет, ${user?.first_name}! Рады видеть вас снова.`
            : 'Система управления профилями пользователей'}
        </Paragraph>
        
        {!isAuthenticated && (
          <Space size="large" data-easytag="id5-src/pages/Home.js">
            <Button 
              data-easytag="id6-src/pages/Home.js"
              type="primary" 
              size="large"
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
            >
              Войти
            </Button>
            <Button 
              data-easytag="id7-src/pages/Home.js"
              size="large"
              icon={<UserOutlined />}
              onClick={() => navigate('/register')}
            >
              Зарегистрироваться
            </Button>
          </Space>
        )}
        
        {isAuthenticated && (
          <Button 
            data-easytag="id8-src/pages/Home.js"
            type="primary" 
            size="large"
            icon={<SettingOutlined />}
            onClick={() => navigate('/profile')}
          >
            Перейти в профиль
          </Button>
        )}
      </Card>

      <Row gutter={[16, 16]} data-easytag="id9-src/pages/Home.js">
        <Col xs={24} sm={12} md={8}>
          <Card 
            data-easytag="id10-src/pages/Home.js"
            hoverable
            style={{ height: '100%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <UserOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>
              Управление профилем
            </Title>
            <Paragraph style={{ textAlign: 'center' }}>
              Легко управляйте своими личными данными и настройками
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card 
            data-easytag="id11-src/pages/Home.js"
            hoverable
            style={{ height: '100%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <LoginOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>
              Быстрая авторизация
            </Title>
            <Paragraph style={{ textAlign: 'center' }}>
              Простая и безопасная система входа в приложение
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Card 
            data-easytag="id12-src/pages/Home.js"
            hoverable
            style={{ height: '100%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <SettingOutlined style={{ fontSize: '48px', color: '#faad14' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>
              Гибкие настройки
            </Title>
            <Paragraph style={{ textAlign: 'center' }}>
              Настройте приложение под свои нужды
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;