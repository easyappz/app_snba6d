import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        message.success('Вход выполнен успешно!');
        navigate(from, { replace: true });
      } else {
        message.error(result.error || 'Ошибка входа');
      }
    } catch (error) {
      message.error('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 112px)' }} data-easytag="id1-react/src/pages/Login.js">
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} data-easytag="id2-react/src/pages/Login.js">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }} data-easytag="id3-react/src/pages/Login.js">
          Вход в систему
        </Title>
        
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="email@example.com" 
              size="large"
              data-easytag="id4-react/src/pages/Login.js"
            />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Введите пароль" 
              size="large"
              data-easytag="id5-react/src/pages/Login.js"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
              data-easytag="id6-react/src/pages/Login.js"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text data-easytag="id7-react/src/pages/Login.js">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;