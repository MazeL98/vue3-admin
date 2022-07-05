import layout from '@/layout'

export default {
  path: '/staff',
  component: layout,
  redirect: '/staff/manage',
  name: 'StaffManage',

  meta: {
    title: 'staff',
    icon: 'personnel'
  },
  children: [
    {
      path: '/staff/manage',
      component: () => import('@/views/staff-manage/index'),
      meta: {
        title: 'staffManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/staff/info/:id',
      name: 'StaffInfo',
      component: () => import('@/views/staff-info/index'),
      props: true,
      meta: {
        title: 'staffInfo'
      }
    },
    {
      path: '/staff/import',
      name: 'Import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
