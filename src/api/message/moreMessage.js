import request from '../../utils/request'

// 获取消息列表
export const getMessageList = (params) => {
  return request({
    url: '/enterprise-business-service/messageMould/list',
    method: 'post',
    data: params
  })
}


// 发送模板消息
export const sendTempalteMsessage = (params) => {
  return request({
    url: '/enterprise-business-service/message/sendMouldMessage',
    method: 'post',
    data: params
  })
}


// 通讯录导入
export const addressImport = (params) => {
  return request({
    url: '/enterprise-business-service/message/addressBook/import',
    method: 'post',
    data: params
  })
}
