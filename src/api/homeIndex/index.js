import request from '../../utils/request'

// 获取消费概况
export const getConsumption = (params) => {
  return request({
    url: '/enterprise-business-service/index/overview/consume',
    method: 'get',
    params: params
  })
}


//  获取消息情况
export const getMessages = (params) => {
  return request({
    url: '/enterprise-business-service/index/overview/message',
    method: 'get',
    params: params
  })
}
