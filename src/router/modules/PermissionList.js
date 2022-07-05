import layout from '@/layout'

export default {
  path: '/staff',
  component: layout,
  redirect: '/staff/manage',
  name: 'PermissionList',
  meta: {
    title: 'staff',
    icon: 'personnel'
  },
  children: [
    {
      path: '/staff/permission',
      component: () => import('@/views/permission-list/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
