import { http } from './ajax';

// 获取产品数据
export const getServerList = (data) => {
  return http.post('/getServerList/', data);
};
