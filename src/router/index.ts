import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import BreweryDetail from '@/views/BreweryDetail.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/lazy-load/',
    name: 'LazyLoad',
    component: () => import('@/views/LazyLoad.vue')
  },
  {
    path: '/table/',
    name: 'PaginatedTable',
    component: () => import('@/views/PaginatedTable.vue')
  },
  {
    path: '/brewery/:id',
    name: 'BreweryDetail',
    component: BreweryDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
