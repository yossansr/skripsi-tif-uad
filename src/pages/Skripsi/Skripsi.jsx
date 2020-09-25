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
  const [data, setData] = React.useState([]);

  const columns = [
    {
      key: 'cover',
      section: 'Cover',
    },
    {
      key: 'halaman-pengesahan',
      section: 'Halaman Pengesahan',
    },
    {
      key: 'daftar-isi',
      section: 'Daftar Isi',
    },
    {
      key: 'bab1',
      section: 'Bab 1',
    },
    {
      key: 'bab2',
      section: 'Bab 2',
    },
    {
      key: 'bab3',
      section: 'Bab 3',
    },
    {
      key: 'bab4',
      section: 'Bab 4',
    },
    {
      key: 'bab5',
      section: 'Bab 5',
    },
    {
      key: 'daftar-pustaka',
      section: 'Daftar Pustaka',
    },
    {
      key: 'lampiran',
      section: 'Lampiran',
    },
  ];

  const { isLoading: isLoadingThesis, data: thesisAll } = useQuery('thesis', () => fetchAPI(`/student/${userId}/thesis/all`, { token }).then((res) => res.data), {
    onSuccess: (newData) => setData(columns.map((column, index) => ({
      ...column,
      file: newData[Object.keys(newData)[index]] ? <AuthenticatedLink url={`/student/${userId}/thesis/${column.key}`}>{`${column.key}.pdf`}</AuthenticatedLink> : 'kosong',
    }))),
  });

  const props = {
    name: 'file',
    headers: {
      token,
    },
  };

  if (isLoadingThesis) {
    return <span>Loading</span>;
  }

  if (thesisAll) {
    return (
      <Table dataSource={data}>
        <Column title="Bagian" dataIndex="section" key="section" />
        <Column
          title="File"
          key="file"
          dataIndex="file"
        />
        <Column
          title="Action"
          key="action"
          render={(text, record, index) => (
            <Space size="middle">
              {record.file === 'kosong' ? (
                (
                  <Upload
                    {...props}
                    action={`http://localhost:4444/student/${userId}/thesis/${record.key}`}
                    showUploadList={false}
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully`);
                        setData([...data, data[index].file = <AuthenticatedLink url={`/student/${userId}/thesis/${record.key}`}>{`${record.key}.pdf`}</AuthenticatedLink>]);
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button htmlType="button" type="primary" icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                )
              ) : (
                <>
                  <Upload
                    {...props}
                    action={`http://localhost:4444/student/${userId}/thesis/${record.key}`}
                    showUploadList={false}
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully`);
                        setData([...data, data[index].file = <AuthenticatedLink filename={`${record.key}.pdf`} url={`/student/${userId}/thesis/${record.key}`}>{`${record.key}.pdf`}</AuthenticatedLink>]);
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button htmlType="button" type="primary">Ganti</Button>
                  </Upload>
                  <Button
                    htmlType="button"
                    type="danger"
                    onClick={() => fetchAPI(`/student/${userId}/thesis/${record.key}`, { token }, 'DELETE').then(
                      () => {
                        setData([...data, data[index].file = 'kosong']);
                      },
                    )}
                  >
                    Delete

                  </Button>
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
