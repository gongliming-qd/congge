import { http } from './ajax';

// get
export const testGet = (data) => {
  return http.get('/api/material/typelist?env=test', { params: data });
};

// post
export const testPost = (data) => {
  return http.post('/api/material/productlist', data);
};
