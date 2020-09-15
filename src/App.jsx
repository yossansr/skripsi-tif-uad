/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {
  Layout, Menu, Typography, Button,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Home from './pages/Home/Home';
import Skripsi from './pages/Skripsi/Skripsi';
import Form from './pages/Form/Form';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import userReducer from './reducer/userReducer';

import './App.css';
import Profile from './pages/Profile/Profile';
import AdminPage from './pages/AdminPage/AdminPage';

const {
  Content, Footer, Sider,
} = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

const App = () => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  React.useEffect(() => {
    const userId = localStorage.getItem('userId') || null;
    const token = localStorage.getItem('token') || null;
    if (userId && token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          userId,
          token,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Switch>
        <Route exact path="/admin" component={AdminPage} />
        <PublicRoute restricted exact path="/form" component={Form} />
      </Switch>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={300}
        >
          <Title style={{ textAlign: 'center', padding: '16px', color: '#00A6FB' }} level={3}>E-Skripsi</Title>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">
                Home
              </Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<UploadOutlined />} title="File">
              <Menu.Item key="2">
                <Link to="/skripsi">
                  Skripsi
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/jurnal">
                  Jurnal
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/profile">
                Profile
              </Link>
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
            <div className="site-layout-background" style={{ padding: 24, minHeight: '89vh' }}>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/skripsi" component={Skripsi} />
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Teknik Informatika UAD ©2020</Footer>
        </Layout>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
