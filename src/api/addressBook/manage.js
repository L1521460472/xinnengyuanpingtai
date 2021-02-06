import request from '../../utils/request'

// 自定义字段列表查询
export const manageAddressList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/list',
    method: 'post',
    data: params
  })
}

// 更新通讯录-使用/必填/列表显示/检索状态
export const updateStatus = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/checked/update',
    method: 'post',
    data: params
  })
}


// 删除自定义事件
export const deleteField = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/delete',
    method: 'post',
    data: params
  })
}

// 移动列表排序
export const changeOrder = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/order/update',
    method: 'post',
    params: params
  })
}

// 新增字段
export const addField = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/add',
    method: 'post',
    data: params
  })
}

// 根据id获取详情
export const fieldDetail = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/getDetail',
    method: 'get',
    params: params
  })
}


// 修改自定义字段详情
export const updateField = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAddressBookField/update',
    method: 'post',
    data: params
  })
}
