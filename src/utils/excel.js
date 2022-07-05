import XLSX from 'xlsx'

export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

// 发送excel数据到服务器之前清洗数据
const STAFF_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime',
  头像: 'avatar'
}
export const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const staffInfo = {}
    Object.keys(item).forEach((key) => {
      if (STAFF_RELATIONS[key] === 'openTime') {
        staffInfo[STAFF_RELATIONS[key]] = formatDate(item[key])
      }
      staffInfo[STAFF_RELATIONS[key]] = item[key]
    })
    staffInfo.role = roleToObject(staffInfo.role)
    arr.push(staffInfo)
  })
  return arr
}

// 处理 role 的数据类型问题
// 将 role 从字符串分割成数组，再从数组转换成key值
const roleToObject = (role) => {
  const newRoleList = {}
  if (role && typeof role === 'string') {
    const roleList = role.split(',')
    roleList.forEach((item, index) => {
      newRoleList[index.toString()] = item
    })
    return newRoleList
  } else return null
}

// 处理 excel导入时时间解析问题
export const formatDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}
