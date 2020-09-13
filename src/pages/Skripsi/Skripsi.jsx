import React from 'react';
import {
  Table, Space, Upload, Button, message, Empty,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import './Skripsi.styles.css';
import { Link } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';

const { Column } = Table;

export default function Skripsi() {
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token') || null;

  const fetchThesis = async () => {
    const res = await fetch(`http://localhost:4444/student/${userId}/thesis`, {
      headers: {
        token,
      },
    });
    return res.json();
  };

  const { isLoading: isLoadingThesis, data: thesis } = useQuery('thesis', fetchThesis);

  const data = [
    {
      key: 'cover',
      section: 'Cover',
      file: () => {
        const result = fetchAPI(`/student/${userId}/thesis/cover`, { token });
        console.log(result);
        return 'kosong';
      },
    // },
    // {
    //   key: 'halaman-pengesahan',
    //   section: 'Halaman Pengesahan',
    //   file: 'kosong',
    // },
    // {
    //   key: 'daftar-isi',
    //   section: 'Daftar Isi',
    //   file: 'kosong',
    // },
    // {
    //   key: 'bab1',
    //   section: 'Bab 1',
    //   file: 'kosong',
    // },
    // {
    //   key: 'bab2',
    //   section: 'Bab 2',
    //   file: 'kosong',
    // },
    // {
    //   key: 'bab3',
    //   section: 'Bab 3',
    //   file: 'kosong',
    // },
    // {
    //   key: 'bab4',
    //   section: 'Bab 4',
    //   file: 'kosong',
    // },
    // {
    //   key: 'bab5',
    //   section: 'Bab 5',
    //   file: 'kosong',
    // },
    // {
    //   key: 'daftar-pustaka',
    //   section: 'Daftar Pustaka',
    //   file: 'kosong',
    // },
    // {
    //   key: 'lampiran',
    //   section: 'Lampiran',
    //   file: 'kosong',
    },
  ];

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
  if (thesis.data.title) {
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
                // eslint-disable-next-line react/jsx-props-no-spreading
                  <Upload {...props} action={`http://localhost:4444/student/${userId}/thesis/${record.key}`} showUploadList={false}>
                    <Button htmlType="button" type="primary" icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                )
              ) : (
                <>
                  <a href="google.com">Edit</a>
                  <a href="google.com">Delete</a>
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
