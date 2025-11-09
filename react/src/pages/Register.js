import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { password_confirm, ...userData } = values;
      const result = await register({ ...userData, password_confirm });
      
      if (result.success) {
        message.success('Регистрация успешна! Теперь вы можете войти в систему.');
        navigate('/login');
      } else {
        if (result.error && typeof result.error === 'object') {
          Object.keys(result.error).forEach(key => {
            const errors = result.error[key];
            if (Array.isArray(errors)) {
              errors.forEach(error => {
                message.error(`${key}: ${error}`);
              });
            } else {
              message.error(`${key}: ${errors}`);
            }
          });
        } else {
          message.error(result.error || 'Ошибка при регистрации');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      data-easytag="id1-src/pages/Register.js"
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 188px)',
        padding: '20px'
      }}
    >
      <Card 
        data-easytag="id2-src/pages/Register.js"
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
            <Title level={2} data-easytag="id3-src/pages/Register.js">
              Регистрация
            </Title>
            <Text data-easytag="id4-src/pages/Register.js" type="secondary">
              Создайте новый аккаунт
            </Text>
          </div>

          <Form
            data-easytag="id5-src/pages/Register.js"
            form={form}
            name="register"
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              data-easytag="id6-src/pages/Register.js"
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
              data-easytag="id7-src/pages/Register.js"
              name="first_name"
              rules={[
                { required: true, message: 'Введите имя' },
                { min: 2, message: 'Имя должно содержать минимум 2 символа' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Имя"
                size="large"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id8-src/pages/Register.js"
              name="last_name"
              rules={[
                { required: true, message: 'Введите фамилию' },
                { min: 2, message: 'Фамилия должна содержать минимум 2 символа' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Фамилия"
                size="large"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id9-src/pages/Register.js"
              name="password"
              rules={[
                { required: true, message: 'Введите пароль' },
                { min: 8, message: 'Пароль должен содержать минимум 8 символов' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item
              data-easytag="id10-src/pages/Register.js"
              name="password_confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Подтвердите пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Подтвердите пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item data-easytag="id11-src/pages/Register.js">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                style={{ width: '100%' }}
              >
                Зарегистрироваться
              </Button>
            </Form.Item>

            <div 
              data-easytag="id12-src/pages/Register.js"
              style={{ textAlign: 'center' }}
            >
              <Text>Уже есть аккаунт? </Text>
              <Link to="/login">Войти</Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Register;