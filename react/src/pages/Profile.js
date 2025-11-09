import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, message, Space, Divider, Avatar, Spin } from 'antd';
import { UserOutlined, MailOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api/auth';

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await authAPI.getProfile();
        form.setFieldsValue(profileData);
        updateUser(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
        message.error('Ошибка при загрузке профиля');
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [form, updateUser]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updatedUser = await authAPI.updateProfile(values);
      updateUser(updatedUser);
      message.success('Профиль успешно обновлен!');
      setEditing(false);
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.response?.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach(key => {
          const errorMessages = errors[key];
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach(msg => message.error(`${key}: ${msg}`));
          } else {
            message.error(`${key}: ${errorMessages}`);
          }
        });
      } else {
        message.error('Ошибка при обновлении профиля');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(user);
    setEditing(false);
  };

  if (profileLoading) {
    return (
      <div 
        data-easytag="id1-src/pages/Profile.js"
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 188px)' 
        }}
      >
        <Spin size="large" tip="Загрузка профиля..." />
      </div>
    );
  }

  return (
    <div 
      data-easytag="id2-src/pages/Profile.js"
      style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        padding: '20px'
      }}
    >
      <Card 
        data-easytag="id3-src/pages/Profile.js"
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <Space 
          direction="vertical" 
          size="large" 
          style={{ width: '100%' }}
        >
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              data-easytag="id4-src/pages/Profile.js"
              size={80} 
              icon={<UserOutlined />} 
              style={{ marginBottom: '16px' }}
            />
            <Title level={2} data-easytag="id5-src/pages/Profile.js">
              Профиль
            </Title>
            <Text data-easytag="id6-src/pages/Profile.js" type="secondary">
              Управление вашими данными
            </Text>
          </div>

          <Divider />

          <Form
            data-easytag="id7-src/pages/Profile.js"
            form={form}
            name="profile"
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={user}
            disabled={!editing}
          >
            <Form.Item
              data-easytag="id8-src/pages/Profile.js"
              name="email"
              label="Электронная почта"
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
              data-easytag="id9-src/pages/Profile.js"
              name="first_name"
              label="Имя"
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
              data-easytag="id10-src/pages/Profile.js"
              name="last_name"
              label="Фамилия"
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

            <Form.Item data-easytag="id11-src/pages/Profile.js">
              {!editing ? (
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  size="large"
                  style={{ width: '100%' }}
                  onClick={() => setEditing(true)}
                >
                  Редактировать профиль
                </Button>
              ) : (
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={<SaveOutlined />}
                    size="large"
                    style={{ flex: 1 }}
                  >
                    Сохранить изменения
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    size="large"
                    style={{ flex: 1 }}
                  >
                    Отменить
                  </Button>
                </Space>
              )}
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;