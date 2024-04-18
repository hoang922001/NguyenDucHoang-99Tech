import axios from 'axios';
import queryString from 'query-string';
import { APP_SERVER_API } from '../constants/config';
import { getCookie } from '../constants/cookie';

const request = axios.create({
  baseURL: APP_SERVER_API,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

request.interceptors.request.use(async (config) => {
  const userFromCookie = {
    user_name: getCookie('user_name'),
    token: getCookie('token'),
  };

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : userFromCookie.token
    ? userFromCookie
    : null;
  if (userInfo) {
    const token = localStorage.getItem('access-token');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    Authorization: 'Client-ID 7MIYwi-TxGNNuPO0Dldu2HYqJDy34TcXYW54wze-Z9M',
  },
  params: {
    page: 1,
    per_page: 16,
    orientation: 'landscape',
  },
});

export default request;
