import layout from '@/layout'

export default {
  path: '/staff',
  component: layout,
  redirect: '/staff/manage',
  name: 'RoleList',
  meta: {
    title: 'staff',
    icon: 'personnel'
  },
  children: [
    {
      path: '/staff/role',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
