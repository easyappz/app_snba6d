import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin, Divider } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined, MailOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [form] = Form.useForm();
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    setUpdating(true);
    try {
      const result = await updateProfile(values);
      if (result.success) {
        message.success('Профиль успешно обновлен!');
        setEditMode(false);
      } else {
        message.error(result.error || 'Ошибка обновления профиля');
      }
    } catch (error) {
      message.error('Произошла ошибка при обновлении профиля');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 112px)' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }} data-easytag="id1-react/src/pages/Profile.js">
      <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} data-easytag="id2-react/src/pages/Profile.js">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }} data-easytag="id3-react/src/pages/Profile.js">
          Профиль пользователя
        </Title>

        {!editMode ? (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px', color: '#666' }} data-easytag="id4-react/src/pages/Profile.js">
                Имя
              </Text>
              <Text style={{ fontSize: '16px' }} data-easytag="id5-react/src/pages/Profile.js">
                {user?.first_name || '-'}
              </Text>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px', color: '#666' }} data-easytag="id6-react/src/pages/Profile.js">
                Фамилия
              </Text>
              <Text style={{ fontSize: '16px' }} data-easytag="id7-react/src/pages/Profile.js">
                {user?.last_name || '-'}
              </Text>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px', color: '#666' }} data-easytag="id8-react/src/pages/Profile.js">
                Email
              </Text>
              <Text style={{ fontSize: '16px' }} data-easytag="id9-react/src/pages/Profile.js">
                {user?.email || '-'}
              </Text>
            </div>

            <Divider />

            <Button 
              type="primary" 
              onClick={() => setEditMode(true)}
              size="large"
              block
              data-easytag="id10-react/src/pages/Profile.js"
            >
              Редактировать профиль
            </Button>
          </div>
        ) : (
          <Form
            form={form}
            name="profile"
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
                data-easytag="id11-react/src/pages/Profile.js"
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
                data-easytag="id12-react/src/pages/Profile.js"
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
                data-easytag="id13-react/src/pages/Profile.js"
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={updating}
                  size="large"
                  icon={<SaveOutlined />}
                  style={{ flex: 1 }}
                  data-easytag="id14-react/src/pages/Profile.js"
                >
                  Сохранить
                </Button>
                <Button 
                  onClick={() => {
                    setEditMode(false);
                    form.setFieldsValue({
                      first_name: user?.first_name,
                      last_name: user?.last_name,
                      email: user?.email
                    });
                  }}
                  size="large"
                  style={{ flex: 1 }}
                  data-easytag="id15-react/src/pages/Profile.js"
                >
                  Отмена
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Profile;