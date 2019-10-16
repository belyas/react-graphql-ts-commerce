import { AxiosInstance } from 'axios';

const setAuthToken = (client: AxiosInstance) => {
  const token = localStorage.getItem('token');

  if (token) {
    client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete client.defaults.headers.common['Authorization'];
  }

  return client;
};

export { setAuthToken };
