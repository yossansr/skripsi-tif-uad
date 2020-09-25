import parseJwt from '../../utils/parseJwt';

const userReducer = (state, action) => {
  let decode = '';

  switch (action.type) {
    case 'LOGIN':
      decode = parseJwt(action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        userId: decode.id,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
