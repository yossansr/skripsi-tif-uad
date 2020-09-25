/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/User/UserContext';

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  const { state } = React.useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (
        state.isAuthenticated && restricted ? <Redirect to="/" /> : <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
