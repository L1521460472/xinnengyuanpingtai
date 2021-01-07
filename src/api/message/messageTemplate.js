import request from '../../utils/request'

// 获取消息模板列表
export const getMessageTemplateList = (params) => {
    return request({
      url: '/enterprise-business-service/messageMould/pageList',
      method: 'post',
      data: params
    })
  }

//业务类型
export const businessTypeList = (params)=>{
    return request({
        url:'/enterprise-base-service/common/queryBusinessListByProductType',
        method:'get',
        params:params
    })
}

// 获取消息模板数量
export const getMouldNum = (params) => {
    return request({
      url: '/enterprise-business-service/messageMould/mouldGroupByMouldType',
      method: 'post',
      data: params
    })
  }
    
// 获取应用列表
export const getAppList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/list',
    method: 'get',
    params: params
  })
}

//通道
export const channelList = (params) => {
    return request({
      url: '/enterprise-business-service/channel/listByEnterpriseAccountId',
      method: 'post',
      data: params
    })
}

// 发送模板消息
export const sentMessage = (params) => {
  return request({
    url: '/enterprise-business-service/messageMould/sendMouldMessage',
    method: 'post',
    data: params
  })
}

// 删除消息模板
export const deleteMessageMould = (params) => {
  return request({
    url: '/enterprise-business-service/messageMould/deleteById',
    method: 'delete',
    params: params
  })
}







