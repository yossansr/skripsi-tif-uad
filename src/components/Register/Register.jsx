/* eslint-disable import/no-cycle */
import React from 'react';
import {
  Form, Input, Button, Select, message,
} from 'antd';
import { useQuery } from 'react-query';
import fetchAPI from '../../utils/fetchAPI';
import { UserContext } from '../../contexts/User/UserContext';

export default function Register() {
  const { dispatch } = React.useContext(UserContext);
  const [form] = Form.useForm();
  const { data: lecturers, status: lecturerStatus } = useQuery(
    'lecturers',
    () => fetchAPI('/lecturer'),
  );
  const [studentsEmail, setStudentsEmail] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const students = await fetchAPI('/student');
      setStudentsEmail(
        students ? students.data.map((student) => student.email) : [],
      );
    };
    fetchData();
  }, []);

  const onFinish = ({
    email, lecturer, name, password,
  }) => {
    fetchAPI('/student', {}, 'POST', {
      email,
      lecturer: {
        id: lecturer,
      },
      name,
      password,
    }).then((res) => (res.status === 'ok'
      ? fetchAPI('/student/login', {}, 'POST', { email, password }).then(
        (resJson) => {
          dispatch({
            type: 'LOGIN',
            payload: { token: resJson.data.access_token },
          });
        },
      )
      : message.error('Something went wrong')));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      validateTrigger="onBlur"
      name="register"
      style={{ textAlign: 'center' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        hasFeedback
        label="Nama Lengkap"
        rules={[{ required: true, message: 'Mohon masukkan nama anda' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Dosen" name="lecturer">
        <Select>
          {lecturerStatus === 'success'
            && lecturers.data.map((lecturer) => (
              <Select.Option value={lecturer.id} key={lecturer.id}>
                {lecturer.name}
                {' '}
                -
                {lecturer.nip}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={[
          {
            pattern: /^[A-Za-z0-9._%+-]+@webmail.uad.ac.id$/,
            message: 'Harus menggunakan webmail.uad.ac.id',
          },
          {
            required: true,
            message: 'Mohon masukkan Email anda',
          },
          {
            validator: (rule, value, callback) => (studentsEmail.includes(value)
              ? callback('Email sudah terdaftar, silahkan login')
              : callback()),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan password anda!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Mohon konfirmasi password anda!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
