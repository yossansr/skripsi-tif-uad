/* eslint-disable react/prop-types */
import React from 'react';
import parseJwt from '../../utils/parseJwt';

import userReducer from './userReducer';

export const UserContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState, () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = parseJwt(token);
      return { isAuthenticated: true, userId: decode.id, token };
    }

    return initialState;
  });

  React.useEffect(() => {
    localStorage.setItem('token', state.token);
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
