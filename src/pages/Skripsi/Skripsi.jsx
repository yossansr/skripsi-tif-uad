/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Table, Space, Upload, Button, message, Empty,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import AuthenticatedLink from '../../components/AuthenticatedLink/AuthenticatedLink';

import './Skripsi.styles.css';
import fetchAPI from '../../utils/fetchAPI';

const { Column } = Table;

export default function Skripsi() {
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token') || null;

  const { isLoading: isLoadingThesis, data: thesisAll } = useQuery('thesis', () => fetchAPI(`/student/${userId}/thesis/all`, { token }));

  const props = {
    name: 'file',
    headers: {
      token,
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if (isLoadingThesis) {
    return <span>Loading</span>;
  }

  if (thesisAll.data) {
    const data = [
      {
        key: 'cover',
        section: 'Cover',
        file: thesisAll.data.cover === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/cover`} filename="cover.pdf">cover.pdf</AuthenticatedLink>,
      },
      {
        key: 'halaman-pengesahan',
        section: 'Halaman Pengesahan',
        file: thesisAll.data.halaman_pengesahan === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/halaman-pengesahan`} filename="halaman-pengesahan.pdf">halaman-pengesahan.pdf</AuthenticatedLink>,
      },
      {
        key: 'daftar-isi',
        section: 'Daftar Isi',
        file: thesisAll.data.daftar_isi === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/daftar-isi`} filename="daftar-isi.pdf">daftar-isi.pdf</AuthenticatedLink>,
      },
      {
        key: 'bab1',
        section: 'Bab 1',
        file: thesisAll.data.bab1 === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/bab1`} filename="bab1.pdf">bab1.pdf</AuthenticatedLink>,
      },
      {
        key: 'bab2',
        section: 'Bab 2',
        file: thesisAll.data.bab2 === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/bab2`} filename="bab2.pdf">bab2.pdf</AuthenticatedLink>,
      },
      {
        key: 'bab3',
        section: 'Bab 3',
        file: thesisAll.data.bab3 === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/bab3`} filename="bab3.pdf">bab3.pdf</AuthenticatedLink>,
      },
      {
        key: 'bab4',
        section: 'Bab 4',
        file: thesisAll.data.bab4 === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/bab4`} filename="bab4.pdf">bab4.pdf</AuthenticatedLink>,
      },
      {
        key: 'bab5',
        section: 'Bab 5',
        file: thesisAll.data.bab5 === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/bab5`} filename="bab5.pdf">bab5.pdf</AuthenticatedLink>,
      },
      {
        key: 'daftar-pustaka',
        section: 'Daftar Pustaka',
        file: thesisAll.data.daftar_pustaka === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/daftar-pustaka`} filename="daftar-pustaka.pdf">daftar-pustaka.pdf</AuthenticatedLink>,
      },
      {
        key: 'lampiran',
        section: 'Lampiran',
        file: thesisAll.data.lampiran === '' ? 'kosong' : <AuthenticatedLink url={`/student/${userId}/thesis/lampiran`} filename="lampiran.pdf">lampiran.pdf</AuthenticatedLink>,
      },
    ];
    return (
      <Table dataSource={data}>
        <Column title="Bagian" dataIndex="section" key="section" />
        <Column title="File" dataIndex="file" key="file" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              {record.file === 'kosong' ? (
                (
                  <Upload {...props} action={`http://localhost:4444/student/${userId}/thesis/${record.key}`} showUploadList={false}>
                    <Button htmlType="button" type="primary" icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                )
              ) : (
                <>
                  <Upload {...props} action={`http://localhost:4444/student/${userId}/thesis/${record.key}`} showUploadList={false}>
                    <Button htmlType="button" type="primary">Ganti</Button>
                  </Upload>
                  <Button htmlType="button" type="danger" onClick={() => fetchAPI(`/student/${userId}/thesis/${record.key}`, { token }, 'DELETE')}>Delete</Button>
                </>
              )}

            </Space>
          )}
        />
      </Table>
    );
  }
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={(
        <span>
          Isi dulu judul skripsinya gan
        </span>
      )}
    >
      <Button type="primary">
        <Link to="/profile">
          Create Now
        </Link>
      </Button>
    </Empty>
  );
}
