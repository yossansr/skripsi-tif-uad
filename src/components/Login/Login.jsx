/* eslint-disable import/no-cycle */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { AuthContext } from '../../App';
import './Login.styles.css';
import parseJwt from '../../utils/parseJwt';

export default function Login() {
  const [form] = Form.useForm();
  const { dispatch } = React.useContext(AuthContext);

  const onFinish = ({ email, password }) => {
    fetch('http://localhost:4444/student/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json()).catch(() => Promise.reject())
      .then((resJson) => {
        const decode = parseJwt(resJson.data.access_token);
        dispatch({
          type: 'LOGIN',
          payload: {
            userId: decode.id,
            token: resJson.data.access_token,
          },
        });
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
