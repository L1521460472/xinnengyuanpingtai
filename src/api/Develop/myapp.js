// import axios from 'axios'
// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}

import request from '../../utils/request'

// 获取应用列表
export const getAppLists = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/list',
    method: 'get',
    params: params
  })
}

// 编辑应用
export const editAppliction = (params) => {
  // return axios.put('/enterprise-business-service/enterpriseAccountApp', params, {headers:headers}).then(res => res.data)
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/update',
    method: 'PUT',
    data: params
  })
}

// 新增应用
export const addApplication = (params) => {
  // return axios.post('/enterprise-business-service/enterpriseAccountApp', params, {headers: headers}).then(res => res.data)
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/save',
    method: 'post',
    data: params
  })
}

// 删除应用
export const deleteAppliction =(params) => {
  // return axios.delete('/enterprise-business-service/enterpriseAccountApp/'+ params, {headers: headers}).then(res => res.data)
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/deleteById',
    method: 'delete',
    params: {
      enterpriseAccountAppId: params
    }
  })
}

// 获取企业审核状态
export const companyStatus = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/getCheckedStatus',
    method: 'get',
    params: params
  })
}


// 获取应用配置的产品业务类型
export const getAppType = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/getProBusDetail',
    method: 'get',
    params: params
  })
}


// 根据id获取应用详情
export const getAppById = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseAccountApp/findById',
    method: 'get',
    params: params
  })
}
