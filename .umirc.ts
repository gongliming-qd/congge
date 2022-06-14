import { defineConfig } from 'umi';
var apiServe = require('./config/apiServe.js');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/layout/index',
      routes: [
        { path: '/home', component: '@/pages/home/index' },
        { path: '/phone', component: '@/pages/home/index' },
        { path: '/server', component: '@/pages/server/index' },
        { path: '/projection', component: '@/pages/projection/index' },
        { path: '/', redirect: '/home' },
      ],
    },
  ],
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: apiServe.devServe,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
