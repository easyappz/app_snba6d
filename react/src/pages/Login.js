import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await login(values);
      
      if (result.success) {
        message.success('Вход выполнен успешно!');
        navigate(from, { replace: true });
      } else {
        message.error(result.error || 'Неверный email или пароль');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      data-easytag="id1-src/pages/Login.js"
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 188px)',
        padding: '20px'
      }}
    >
      <Card 
        data-easytag="id2-src/pages/Login.js"
        style={{ 
          width: '100%', 
          maxWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Space 
          direction="vertical" 
          size="large" 
          style={{ width: '100%' }}
        >
          <div style={{ textAlign: 'center' }}>
            <Title level={2} data-easytag="id3-src/pages/Login.js">
              Вход
            </Title>
            <Text data-easytag="id4-src/pages/Login.js" type="secondary">
              Войдите в свой аккаунт
            </Text>
          </div>

          <Form
            data-easytag="id5-src/pages/Login.js"
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            initialValues={{ remember: true }}
          >
            <Form.Item
              data-easytag="id6-src/pages/Login.js"
              name="email"
              rules={[
                { required: true, message: 'Введите электронную почту' },
                { type: 'email', message: 'Введите корректный email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Электронная почта"
                size="large"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id7-src/pages/Login.js"
              name="password"
              rules={[
                { required: true, message: 'Введите пароль' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item data-easytag="id8-src/pages/Login.js">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item data-easytag="id9-src/pages/Login.js">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                style={{ width: '100%' }}
              >
                Войти
              </Button>
            </Form.Item>

            <div 
              data-easytag="id10-src/pages/Login.js"
              style={{ textAlign: 'center' }}
            >
              <Text>Нет аккаунта? </Text>
              <Link to="/register">Зарегистрироваться</Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;