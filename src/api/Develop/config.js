// import axios from 'axios'

// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}

import request from '../../utils/request'

// 查询白名单
export const searchWhiteList = (params) => {
  // return axios.get(`/enterprise-business-service/enterpriseAccountApp/${params.appid}/whiteList`, {params:params, headers:headers}).then(res => res.data)
  return request({
    url: `/enterprise-business-service/enterpriseAccountApp/enterpriseAccount/whiteList`,
    method: 'get'
  })
}


// 添加白名单
export const saveWhiteList = (params) => {
  // return axios.put('/enterprise-business-service/enterpriseAccountApp/whiteList', params, {headers:headers}).then(res => res.data)
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/whiteList',
    method: 'put',
    data: params
  })
}
