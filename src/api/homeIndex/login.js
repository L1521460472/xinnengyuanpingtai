// import axios from 'axios'

// import { getCookie } from '../../public'
// const headers = {Authorization: getCookie('enterprisePass')}
import request from '../../utils/request'

// 登录
export const Login = (params) => {
  // return axios.post('/enterprise-business-service/enterpriseAccount/login', params).then(res => res.data)
  return request({
    url: '/enterprise-business-service/enterpriseAccount/login',
    method: 'post',
    data: params
  })
}

// 退出登录
export const LoginOut = (params) => {
  // return axios.get('/enterprise-business-service/enterpriseAccount/loginOut', {params: params, headers: headers}).then(res => res.data)
  return request({
    url: '/enterprise-business-service/enterpriseAccount/loginOut',
    method: 'get',
    params: params
  })
}
