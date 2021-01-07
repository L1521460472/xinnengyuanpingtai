import request from '../../utils/request'

export const changePassword = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccount/resetPassword',
    method: 'post',
    data: params
  })
}
