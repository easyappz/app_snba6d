import React from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserAddOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div data-easytag="id1-react/src/pages/Home.js">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1} data-easytag="id2-react/src/pages/Home.js">
          Добро пожаловать{isAuthenticated && user ? `, ${user.first_name}` : ''}!
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }} data-easytag="id3-react/src/pages/Home.js">
          Это приложение позволяет управлять вашим профилем. 
          Зарегистрируйтесь или войдите, чтобы начать работу.
        </Paragraph>
      </div>

      {!isAuthenticated ? (
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ textAlign: 'center', borderRadius: '12px' }}
              data-easytag="id4-react/src/pages/Home.js"
            >
              <UserAddOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <Title level={3}>Новый пользователь?</Title>
              <Paragraph style={{ marginBottom: '24px' }}>
                Создайте аккаунт за несколько секунд
              </Paragraph>
              <Button 
                type="primary" 
                size="large" 
                icon={<UserAddOutlined />}
                onClick={() => navigate('/register')}
                block
                data-easytag="id5-react/src/pages/Home.js"
              >
                Регистрация
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ textAlign: 'center', borderRadius: '12px' }}
              data-easytag="id6-react/src/pages/Home.js"
            >
              <LoginOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
              <Title level={3}>Уже есть аккаунт?</Title>
              <Paragraph style={{ marginBottom: '24px' }}>
                Войдите в свой профиль
              </Paragraph>
              <Button 
                type="default" 
                size="large" 
                icon={<LoginOutlined />}
                onClick={() => navigate('/login')}
                block
                data-easytag="id7-react/src/pages/Home.js"
              >
                Войти
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row justify="center">
          <Col xs={24} sm={16} md={12}>
            <Card
              style={{ textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              data-easytag="id8-react/src/pages/Home.js"
            >
              <SettingOutlined style={{ fontSize: '48px', color: '#722ed1', marginBottom: '16px' }} />
              <Title level={3}>Управление профилем</Title>
              <Paragraph style={{ marginBottom: '24px', fontSize: '16px' }}>
                Просматривайте и редактируйте информацию вашего профиля
              </Paragraph>
              <Button 
                type="primary" 
                size="large" 
                icon={<SettingOutlined />}
                onClick={() => navigate('/profile')}
                data-easytag="id9-react/src/pages/Home.js"
              >
                Перейти в профиль
              </Button>
            </Card>
          </Col>
        </Row>
      )}

      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <Title level={4} style={{ color: '#999' }} data-easytag="id10-react/src/pages/Home.js">
          Возможности приложения
        </Title>
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ background: '#f0f2f5' }} data-easytag="id11-react/src/pages/Home.js">
              <Title level={5}>Безопасная авторизация</Title>
              <Paragraph>Защита данных с помощью JWT токенов</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ background: '#f0f2f5' }} data-easytag="id12-react/src/pages/Home.js">
              <Title level={5}>Управление профилем</Title>
              <Paragraph>Редактирование личной информации</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ background: '#f0f2f5' }} data-easytag="id13-react/src/pages/Home.js">
              <Title level={5}>Удобный интерфейс</Title>
              <Paragraph>Современный дизайн с Ant Design</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;