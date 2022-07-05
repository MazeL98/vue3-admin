import request from '@/utils/request.js'

// 获取员工列表
export const getStaffList = (data) => {
  return request({
    url: '/staff-manage/list',
    params: data
  })
}

// 导入excel上传的员工数据
export const staffBatchImport = (data) => {
  return request({
    url: '/staff-manage/list',
    method: 'POST',
    data
  })
}

// 删除某个员工数据
export const deleteStaff = (id) => {
  return request({
    url: '/staff-manage/delete',
    params: { id: id }
  })
}

// 获取所有员工数据

export const getAllStaffList = () => {
  return request({
    url: '/staff-manage/all-list'
  })
}

// 获取指定员工数据
export const getStaffInfo = (id) => {
  return request({
    url: `/staff-manage/${id}`
  })
}
