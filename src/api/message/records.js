import request from '../../utils/request'


// 获取收发记录列表
export const getRecord = (params) => {
  return request({
    url: '/enterprise-business-service/messageRecord/pageList',
    method: 'post',
    data: params
  })
}



// 获取记录详情
export const recoedDetail = (params) => {
  return request({
    url: '/enterprise-business-service/messageRecord/view',
    method: 'post',
    data: params
  })
}


// 消息撤回
export const withdraw = (params) => {
  return request({
    url: '/enterprise-business-service/message/withdraw',
    method: 'post',
    params: params
  })
}


// 发送批次记录
export const sendBatch = (params) => {
  return request({
    url: '/enterprise-business-service/messageRecord/batchPageList',
    method: 'post',
    data: params
  })
}


// 获取通道列表
export const channelLists = (params) => {
  return request({
    url: '/enterprise-business-service/channel/listByEnterpriseAccountId',
    method: 'post',
    data: params
  })
}

// 消息接收记录列表
export const receiveList = (params) => {
  return request({
    url: '/enterprise-business-service/messageRecord/receivePageList',
    method: 'post',
    data: params
  })
}

//  获取发送详情列表
export const sendDetailList = (params) => {
  return request({
    url: '/enterprise-business-service/messageRecord/sendPageList',
    method: 'post',
    data: params
  })
}

//  消息批次撤回
export const messageBatchWithdraw = (params) => {
  return request({
    url: '/enterprise-business-service/message/batchWithdraw',
    method: 'post',
    params: params
  })
}


// 消息回复
export const replyMessage = (params) => {
  return request({
    url: '/enterprise-business-service/message/reply',
    method: 'post',
    data: params
  })
}


// 消息重发
export const repeatMessage = (params) => {
  return request({
    url: '/enterprise-business-service/message/batchResend',
    method: 'post',
    data: params
  })
}

//  导出
export const exportExcel = (params) => {
  return request({
    url: '/enterprise-business-service/messageRecord/batchMessageExport',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}
