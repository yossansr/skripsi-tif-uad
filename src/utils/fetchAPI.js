const baseUrl = 'http://localhost:4444';

const fetchAPI = (url, headers = {}, method = 'GET', body = undefined) => fetch(baseUrl + url, {
  method,
  headers,
  body: JSON.stringify(body),
})
  .then((res) => res.json());

export default fetchAPI;
