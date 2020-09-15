const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
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
