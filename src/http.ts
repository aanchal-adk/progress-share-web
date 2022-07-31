import axios, { AxiosError, AxiosResponse } from 'axios';

import * as constants from './constants';
import { logout } from './helpers/user.helper';
import history from './helpers/history.helper';
import { RefreshTokenResp } from './interfaces/signup.interface';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  config => {
    if (config.url && !['/refresh-token', '/login', '/signup'].includes(config.url)) {
      const accessToken = localStorage.getItem('accessToken');

      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${accessToken}`
      }

    }
    
    return config;
  },
  resp => resp
);

http.interceptors.response.use(
  resp => resp,
  async (err: AxiosError) => {
    if (err.response?.status === constants.UNAUTHORIZED && err.config.url !== '/refresh-token') {
      try {
        const refreshToken = localStorage.getItem('refreshToken') || '';

        if (!refreshToken) {
          console.log("No refresh token in store!");

          return;
        }

        const tokenResp: AxiosResponse<RefreshTokenResp> = await http.post('/refresh-token', {
          refreshToken
        });

        console.log("REFRESH TOKEN DATA: ", tokenResp);

        localStorage.setItem('accessToken', tokenResp.data.accessToken);


        err.config.headers = {
          ...err.config.headers,
         'Authorization': `Bearer ${tokenResp.data.accessToken}`
        };

        return http(err.config);

      } catch(err) {
        console.log("REFRESH TOKEN ERROR: ", err);
        logout();
        history.push('/login');
      }
      
    } else {
      return Promise.reject(err);
    }
  });

export default http;
