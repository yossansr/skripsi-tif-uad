import fetchAPI from '../../utils/fetchAPI';

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => fetchAPI('/admin/login', {}, 'POST', { username, password })
    .then((resJson) => localStorage.setItem('admin', resJson.data.token))
    .catch(() => 'Wrong credentials'),
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('admin');
    return Promise.resolve();
  },
  // // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // // called when the user navigates to a new location, to check for authentication
  checkAuth: () => (localStorage.getItem('admin')
    ? Promise.resolve()
    : Promise.reject()),
  // // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
