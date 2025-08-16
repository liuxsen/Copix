import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../pages/home/index.vue') },
  { path: '/about', component: () => import('../pages/about/index.vue') },
  { path: '/settings', component: () => import('../pages/settings/index.vue') },
  { path: '/pin', component: () => import('../pages/pin/index.vue') },
  { path: '/shot', component: () => import('../pages/shot/index.vue') },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})