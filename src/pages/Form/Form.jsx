/* eslint-disable import/no-cycle */
import React from 'react';
import {
  Tabs, Row, Col, Image,
} from 'antd';
import Login from '../../components/Login/Login';
import formImage from '../../assets/formImage.png';
import Register from '../../components/Register/Register';

const { TabPane } = Tabs;

export default function FormPage() {
  return (
    <Row>
      <Col
        md={{ span: 24 }}
        sm={{ span: 24 }}
        lg={{ span: 10 }}
        style={{
          height: '100vh',
          backgroundColor: '#00A6FB',
          minWidth: '800',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          preview={false}
          alt="test"
          src={formImage}
          style={{
            width: '80%',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        />
      </Col>
      <Col
        md={{ span: 24 }}
        lg={{ span: 14 }}
        sm={{ span: 24 }}
        style={{ minHeight: '300px' }}
      >
        <Tabs defaultActiveKey={1} centered style={{ padding: '0 50px', marginTop: 50 }}>
          <TabPane tab="Login" key={1}>
            <Login />
          </TabPane>
          <TabPane tab="Register" key={2}>
            <Register />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}
