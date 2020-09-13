/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  const { state } = React.useContext(AuthContext);
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
