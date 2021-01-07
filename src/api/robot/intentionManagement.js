import request from '../../utils/request';

//表格list
export const tableList = (params) => {
    return request({
        url: '/enterprise-business-service/intention/pageList',
        method: 'post',
        data: params
    })
}

//企业应用list
export const robotList = (params) => {
    return request({
        url: '/enterprise-business-service/intention/robotList',
        method: 'post',
        data: params
    })
}

//新增
export const intentionAdd = (params) => {
    return request({
        url: '/enterprise-business-service/intention/add',
        method: 'post',
        data: params
    })
}

//修改
export const intentionUpdate = (params) => {
    return request({
        url: '/enterprise-business-service/intention/update',
        method: 'post',
        data: params
    })
}

//详情
export const intentionGetDetail = (params) => {
    return request({
        url: '/enterprise-business-service/intention/getDetail',
        method: 'post',
        data: params
    })
}

//禁用启用
export const intentionStatusUpdate = (params) => {
    return request({
        url: '/enterprise-business-service/intention/status/update',
        method: 'post',
        data: params
    })
}

//删除
export const intentionDelete = (params) => {
    return request({
        url: '/enterprise-business-service/intention/delete',
        method: 'post',
        data: params
    })
}