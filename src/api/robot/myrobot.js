import request from '../../utils/request';

//表格list
export const tableList = (params)=>{
    return request({
        url:'/enterprise-business-service/robot/pageList',
        method:'post',
        data:params
    })
}

//企业应用list
export const enterpriseApplist = (params)=>{
    return request({
        url:'/enterprise-business-service/enterpriseAccountApp/list',
        method:'get',
        params:params
    })
}

//新增
export const robotAdd = (params)=>{
    return request({
        url:'/enterprise-business-service/robot/add',
        method:'post',
        data:params
    })
}

//修改
export const robotUpdate = (params)=>{
    return request({
        url:'/enterprise-business-service/robot/update',
        method:'post',
        data:params
    })
}

//删除
export const robotDelete = (params)=>{
    return request({
        url:'/enterprise-business-service/robot/delete',
        method:'post',
        data:params
    })
}