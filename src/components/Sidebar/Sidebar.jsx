import React from 'react';
import {
  Layout, Menu, Typography, Button,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Switch, Link } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Home from '../../pages/Home/Home';
import Skripsi from '../../pages/Skripsi/Skripsi';
import Profile from '../../pages/Profile/Profile';
import { UserContext } from '../../contexts/User/UserContext';

const { Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const Sidebar = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const baseURL = 'http://localhost:3000';
  return (
    <Layout style={state.isAuthenticated ? {} : { display: 'none' }}>
      <Sider breakpoint="lg" collapsedWidth="0" width={300}>
        <Title
          style={{ textAlign: 'center', padding: '16px', color: '#00A6FB' }}
          level={3}
        >
          E-Skripsi
        </Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.href]}>
          <Menu.Item key={`${baseURL}/`} icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<UploadOutlined />} title="File">
            <Menu.Item key={`${baseURL}/skripsi`}>
              <Link to="/skripsi">Skripsi</Link>
            </Menu.Item>
            <Menu.Item key={`${baseURL}/jurnal`}>
              <Link to="/jurnal">Jurnal</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={`${baseURL}/profile`} icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              danger
              onClick={() => dispatch({
                type: 'LOGOUT',
              })}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: '89vh' }}
          >
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/skripsi" component={Skripsi} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Teknik Informatika UAD ©2020
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
