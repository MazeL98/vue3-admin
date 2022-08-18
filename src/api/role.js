import request from '@/utils/request.js'

// 请求所有角色列表
export const getRoleList = () => {
  return request({
    url: '/role/list'
  })
}

// 请求指定员工的角色
export const getStaffRoles = (id) => {
  return request({
    url: `/staff-manage/role/${id}`
  })
}

// 重新分配指定员工的角色
export const updateRole = (id, roles) => {
  return request({
    url: `/staff-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}

// 请求角色对应的权限列表
export const getRolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

// 为角色分配权限
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data: data
  })
}
