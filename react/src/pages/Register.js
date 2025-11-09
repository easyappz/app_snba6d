import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await register({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name
      });
      
      if (result.success) {
        message.success('Регистрация успешна!');
        navigate('/profile');
      } else {
        message.error(result.error || 'Ошибка регистрации');
      }
    } catch (error) {
      message.error('Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 112px)' }} data-easytag="id1-react/src/pages/Register.js">
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} data-easytag="id2-react/src/pages/Register.js">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }} data-easytag="id3-react/src/pages/Register.js">
          Регистрация
        </Title>
        
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Имя"
            name="first_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя!' },
              { min: 2, message: 'Имя должно содержать минимум 2 символа!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Иван" 
              size="large"
              data-easytag="id4-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="last_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите фамилию!' },
              { min: 2, message: 'Фамилия должна содержать минимум 2 символа!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Иванов" 
              size="large"
              data-easytag="id5-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="email@example.com" 
              size="large"
              data-easytag="id6-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 6, message: 'Пароль должен содержать минимум 6 символов!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Минимум 6 символов" 
              size="large"
              data-easytag="id7-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item
            label="Подтвердите пароль"
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Пожалуйста, подтвердите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Повторите пароль" 
              size="large"
              data-easytag="id8-react/src/pages/Register.js"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
              data-easytag="id9-react/src/pages/Register.js"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text data-easytag="id10-react/src/pages/Register.js">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Register;