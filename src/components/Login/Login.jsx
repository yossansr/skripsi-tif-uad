/* eslint-disable import/no-cycle */
import React from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Login.styles.css';
import fetchAPI from '../../utils/fetchAPI';
import { UserContext } from '../../contexts/User/UserContext';

export default function Login() {
  const [form] = Form.useForm();
  const { dispatch } = React.useContext(UserContext);

  const onFinish = ({ email, password }) => {
    fetchAPI('/student/login', {}, 'POST', { email, password })
      .then((resJson) => {
        if (resJson.status === 'error') message.error('Wrong Credentials');
        else {
          dispatch({
            type: 'LOGIN',
            payload: { token: resJson.data.access_token },
          });
        }
      });
  };

  return (
    <Form form={form} layout="vertical" style={{ textAlign: 'center' }} onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your E-mail!' }]}
        style={{ width: '70%', margin: 'auto' }}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        style={{ width: '70%', margin: 'auto' }}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '30%', textAlign: 'center' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
