/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Select, Typography, Button, message,
} from 'antd';
import { useQuery } from 'react-query';
import fetchAPI from '../../utils/fetchAPI';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Profile() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();

  const { isLoading: isLoadingStudent, data: student } = useQuery('student', () => fetchAPI(`/student/${userId}`));
  const { isLoading: isLoadingLecturers, data: lecturers } = useQuery('lecturers', () => fetchAPI('/lecturer'));
  const { isLoading: isLoadingThesis, data: thesis } = useQuery('thesis', () => fetchAPI(`/student/${userId}/thesis`, { token }));

  const onFinish = (values) => {
    const thesisMethod = thesis.data ? 'put' : 'post';

    fetchAPI(`/student/${userId}`, { token }, 'PUT', {
      email: values.email,
      lecturer: {
        id: values.lecturer,
      },
      name: values.name,
      password: values.password,
    }).then((res) => (res.status === 'ok' ? message.success(
      'Profile Updated',
    ) : message.error('Profile not updated')));

    fetchAPI(`/student/${userId}/thesis`, { token }, thesisMethod, {
      title: values.title,
    }).then((res) => (res.status === 'ok' ? message.success(
      'Thesis Updated',
    ) : message.error('Something went wrong')));
  };

  return (
    <div>
      <Title level={3}>Profil Mahasiswa</Title>
      {isLoadingStudent || isLoadingLecturers || isLoadingThesis ? <span>Loading</span> : (
        <Form form={form} onFinish={onFinish} validateTrigger="onBlur" requiredMark={false} {...layout}>
          <Form.Item initialValue={student.data.nim} label="NIM" name="nim">
            <Input />
          </Form.Item>
          <Form.Item initialValue={student.data.name} label="Nama" name="name">
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: /^[A-Za-z0-9._%+-]+@webmail.uad.ac.id$/,
                message: 'Harus menggunakan webmail.uad.ac.id',
              },
              {
                required: true,
                message: 'Mohon masukkan Email anda',
              },
            ]}
            initialValue={student.data.email}
          >
            <Input />
          </Form.Item>
          <Form.Item initialValue={thesis.data ? thesis.data.title : null} label="Judul Skripsi" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Dosen Pembimbing" name="dosen-pembimbing" initialValue={student.data.lecturer.id}>
            <Select>
              {
            lecturers.data.map(
              (lecturer) => (
                <Select.Option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </Select.Option>
              ),
            )
            }
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '30%', textAlign: 'center' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
