import { http } from './ajax';

// 统一管理
export const OneclickCloseOrExpansion = (data) => {
  return http.post('/OneclickCloseOrExpansion/', data);
};

// 获取Server产品数据
export const getServerList = (data) => {
  return http.post('/getServerList/', data);
};

// 单个编辑开光
export const getServerEdit = (data) => {
  return http.post('/serverEdit/', data);
};

// 获取Server产品数据
export const getProjectorList = (data) => {
  return http.post('/getProjectorList/', data);
};

// 单个编辑开光
export const projectorEdit = (data) => {
  return http.post('/projectorEdit/', data);
};

// 单个编辑开光
export const projectorEditVideoSource = (data) => {
  return http.post('/projectorEditVideoSource/', data);
};
