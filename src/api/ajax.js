import axios from 'axios';
import qs from 'qs';
var apiServe = require('../../config/apiServe');
// 每次请求携带cookies信息
axios.defaults.withCredentials = true;

//
let baseURL = '';
process.env.NODE_ENV === 'development'
  ? (baseURL = '/api')
  : (baseURL = apiServe.prodServe);
export const http = axios.create({
  baseURL,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// 请求拦截器
http.interceptors.request.use(function (config) {
  // config.headers.Authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbm9ueW1vdXMiOmZhbHNlLCJ1c2VyX2lkIjoiZ0dscERFejJSYWQ4QVdaeFJucTA5ZTVvbWpNT1AxTFgiLCJ1c2VyX3Nlc3Npb25faWQiOiJOV0o2YjNEUFFCbTd2eFlMbFk5MkV6ZW9Ya3BHODUxMCIsImV4cCI6MTY0NzA3NjcyOSwiaWF0IjoxNjQ2OTkwMzI5fQ.gT0M6bqvnD2NAGz0P3t0eHjFGasAltA4jbNAnpnVCm8`
  config.data = qs.stringify(config.data);
  config.headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbm9ueW1vdXMiOmZhbHNlLCJ1c2VyX2lkIjoiZ0dscERFejJSYWQ4QVdaeFJucTA5ZTVvbWpNT1AxTFgiLCJ1c2VyX3Nlc3Npb25faWQiOiJOV0o2YjNEUFFCbTd2eFlMbFk5MkV6ZW9Ya3BHODUxMCIsImV4cCI6MTY0NzA3NjcyOSwiaWF0IjoxNjQ2OTkwMzI5fQ.gT0M6bqvnD2NAGz0P3t0eHjFGasAltA4jbNAnpnVCm8`,
  };
  console.log(config.data);

  return config;
});

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  },
);
