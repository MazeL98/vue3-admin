import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import StaffManageRoutes from './modules/StaffMange'
import RoleListRoutes from './modules/RoleList'
import PermissionListRoutes from './modules/PermissionList'
import ArticleRoutes from './modules/Article'
import ArticleCreateRoutes from './modules/ArticleCreate'
import store from '../store'
/*
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'profile'
        }
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/error-page/404')
  }
]
/**
 * 权限路由
 */
export const privateRoutes = [
  StaffManageRoutes,
  RoleListRoutes,
  PermissionListRoutes,
  ArticleRoutes,
  ArticleCreateRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}
