import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/random', component: () => import('pages/RandomPage.vue') }],
  },
      {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/list', component: () => import('src/pages/JokeList.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
