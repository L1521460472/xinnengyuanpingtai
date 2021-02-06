import request from '../../utils/request'


// 自定义菜单
// 获取应用通道树
export const getCustomMenuTreeList = (params) => {
    return request({
      url: '/enterprise-business-service/customChatbotMenu/getCustomMenuTreeList',
      method: 'get',
      params: params
    })
}

// 更改自定义列表状态
export const changeMenuStatus = (params) => {
  return request({
    url: '/enterprise-business-service/customChatbotMenu/status/update',
    method: 'post',
    data: params
  })
}

// 获取通道对应的自定义菜单
export const getCustomMenuList = (params) => {
  return request({
    url: '/enterprise-business-service/customChatbotMenu/getCustomMenuJson',
    method: 'get',
    params: params
  })
}

// 更新菜单
export const undateCustomMenuList = (params) => {
  return request({
    url: '/enterprise-business-service/customChatbotMenu/saveOrUpdate',
    method: 'post',
    data: params
  })
}





