import request from '../../utils/request';

//表格list
export const tableList = (params) => {
    return request({
        url: '/enterprise-business-service/debugInfo/pageList',
        method: 'post',
        data: params
    })
}

//企业应用list
export const appList = (params) => {
    return request({
        url: '/enterprise-business-service/debugInfo/appList',
        method: 'post',
        data: params
    })
}

//删除
export const debugInfoDelete = (params) => {
    return request({
        url: '/enterprise-business-service/debugInfo/delete',
        method: 'post',
        data: params
    })
}