import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Descriptions,
  Button,
  Form,
  Input,
  Spin,
  Alert,
  Space,
  message,
  Typography
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { profileAPI } from '../api/profile';

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileAPI.getProfile();
      setProfileData(data);
      form.setFieldsValue({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Не удалось загрузить профиль');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    form.setFieldsValue({
      email: profileData.email,
      first_name: profileData.first_name,
      last_name: profileData.last_name
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    form.resetFields();
    setError(null);
  };

  const handleSave = async (values) => {
    try {
      setSaving(true);
      setError(null);
      const updatedData = await profileAPI.updateProfile(values);
      setProfileData(updatedData);
      updateUser(updatedData);
      setEditMode(false);
      message.success('Профиль успешно обновлен');
    } catch (err) {
      console.error('Error updating profile:', err);
      const errorMessage = err.response?.data?.email?.[0] || 
                          err.response?.data?.error || 
                          'Не удалось обновить профиль';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    message.info('Вы вышли из системы');
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" tip="Загрузка профиля..." />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Card
            title={
              <Title level={2} style={{ margin: 0 }}>
                <UserOutlined /> Профиль пользователя
              </Title>
            }
            extra={
              !editMode && (
                <Space>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    data-easytag="id1-react/src/pages/Profile.js"
                  >
                    Редактировать профиль
                  </Button>
                  <Button
                    danger
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    data-easytag="id2-react/src/pages/Profile.js"
                  >
                    Выйти
                  </Button>
                </Space>
              )
            }
          >
            {error && (
              <Alert
                message="Ошибка"
                description={error}
                type="error"
                showIcon
                closable
                onClose={() => setError(null)}
                style={{ marginBottom: 20 }}
                data-easytag="id3-react/src/pages/Profile.js"
              />
            )}

            {!editMode ? (
              <Descriptions
                bordered
                column={1}
                size="middle"
                labelStyle={{ fontWeight: 'bold', width: '200px' }}
              >
                <Descriptions.Item 
                  label="Электронная почта"
                  data-easytag="id4-react/src/pages/Profile.js"
                >
                  <MailOutlined style={{ marginRight: 8 }} />
                  {profileData?.email}
                </Descriptions.Item>
                <Descriptions.Item 
                  label="Имя"
                  data-easytag="id5-react/src/pages/Profile.js"
                >
                  <UserOutlined style={{ marginRight: 8 }} />
                  {profileData?.first_name}
                </Descriptions.Item>
                <Descriptions.Item 
                  label="Фамилия"
                  data-easytag="id6-react/src/pages/Profile.js"
                >
                  <UserOutlined style={{ marginRight: 8 }} />
                  {profileData?.last_name}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                autoComplete="off"
              >
                <Form.Item
                  label="Электронная почта"
                  name="email"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите email' },
                    { type: 'email', message: 'Введите корректный email' }
                  ]}
                  data-easytag="id7-react/src/pages/Profile.js"
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="email@example.com"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Имя"
                  name="first_name"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите имя' },
                    { min: 2, message: 'Имя должно содержать минимум 2 символа' }
                  ]}
                  data-easytag="id8-react/src/pages/Profile.js"
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Иван"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Фамилия"
                  name="last_name"
                  rules={[
                    { required: true, message: 'Пожалуйста, введите фамилию' },
                    { min: 2, message: 'Фамилия должна содержать минимум 2 символа' }
                  ]}
                  data-easytag="id9-react/src/pages/Profile.js"
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Иванов"
                    size="large"
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: 24 }}>
                  <Space size="middle">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={saving}
                      icon={<SaveOutlined />}
                      size="large"
                      data-easytag="id10-react/src/pages/Profile.js"
                    >
                      Сохранить
                    </Button>
                    <Button
                      onClick={handleCancel}
                      icon={<CloseOutlined />}
                      size="large"
                      disabled={saving}
                      data-easytag="id11-react/src/pages/Profile.js"
                    >
                      Отмена
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Profile;
