import request from '../../utils/request';

//表格list
export const tableList = (params) => {
    return request({
        url: '/enterprise-business-service/entity/pageList',
        method: 'post',
        data: params
    })
}

//企业应用list
export const robotList = (params) => {
    return request({
        url: '/enterprise-business-service/entity/robotList',
        method: 'post',
        data: params
    })
}

//新增
export const entityAdd = (params) => {
    return request({
        url: '/enterprise-business-service/entity/add',
        method: 'post',
        data: params
    })
}

//修改
export const entityUpdate = (params) => {
    return request({
        url: '/enterprise-business-service/entity/update',
        method: 'post',
        data: params
    })
}

//详情
export const entityGetDetail = (params) => {
    return request({
        url: '/enterprise-business-service/entity/getDetail',
        method: 'post',
        data: params
    })
}

//删除
export const entityDelete = (params) => {
    return request({
        url: '/enterprise-business-service/entity/delete',
        method: 'post',
        data: params
    })
}