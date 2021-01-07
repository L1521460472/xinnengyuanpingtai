import request from '../../utils/request'

// 获取所有菜单
export const getListMenu = (params) => {
  return request({
    url: '/enterprise-business-service/menu/listMenuButton',
    method: 'get',
    params: params
  })
}

// 新增菜单
export const addMenu = (params) => {
  return request({
    url: '/enterprise-business-service/menu/addMenu',
    method: 'post',
    data: params
  })
}

// 新增按钮
export const addButton = (params) => {
  return request({
    url: '/enterprise-business-service/menu/addButton',
    method: 'post',
    data: params
  })
}

// 修改菜单按钮
export const updateMenuButton = (params) => {
  return request({
    url: '/enterprise-business-service/menu/update',
    method: 'post',
    data: params
  })
}

// 删除菜单按钮
export const deleteMenuButton = (params) => {
  return request({
    url: '/enterprise-business-service/menu/delete',
    method: 'post',
    data: params
  })
}


// 删除菜单按钮前的提示消息
export const getDeleteDetail = (params) => {
  return request({
    url: '/enterprise-business-service/menu/getDeleteDetail',
    method: 'post',
    data: params
  })
}

// 菜单或按钮详情
export const getMenuButtonDetail = (params) => {
  return request({
    url: '/enterprise-business-service/menu/getMenuButtonDetail',
    method: 'post',
    data: params
  })
}


// 获取有权限的菜单列表
export const getLimitMenus = (params) => {
  return request({
    url: '/enterprise-business-service/menu/listAssignMenuButton',
    method: 'get',
    params: params
  })
}
