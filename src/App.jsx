/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Form from './pages/Form/Form';
import PublicRoute from './components/PublicRoute/PublicRoute';
import UserContextProvider from './contexts/User/UserContext';

import './App.css';
import AdminPage from './pages/AdminPage/AdminPage';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => (
  <UserContextProvider>
    <Switch>
      <Route exact path="/admin" component={AdminPage} />
      <PublicRoute restricted exact path="/form" component={Form} />
    </Switch>
    <Sidebar />
  </UserContextProvider>
);

export default App;
