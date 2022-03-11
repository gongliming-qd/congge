import { defineConfig } from 'umi';

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
        { path: '/server', component: '@/pages/server/index' },
        { path: '/projection', component: '@/pages/projection/index' },
        { path: '/', redirect: '/home' },
      ],
    },
  ],
  fastRefresh: {},
});
