import request from '../../utils/request';

//报表统计-总量
export const reportTotal = (params)=>{
    return request({
        url:'/enterprise-business-service/messageRecord/reportStatistics',
        method:'post',
        data:params
    })
}

//报表统计记录导出
export const exportExcel = (params)=>{
    return request({
        url:'enterprise-business-service/messageRecord/reportStatisticsExport',
        method:'post',
        data:params,
        responseType: 'blob'
    })
}


//用户账号
export const account = (params)=>{
    return request({
        url:'/enterprise-business-service/enterpriseUserAccount/mapAccountUserByEnterpriseAccountId',
        method:'get',
        params:params
    })
}

//部门
export const department = (params)=>{
    return request({
        url:'/enterprise-business-service/department/mapDepartmentByEnterpriseAccountId',
        method:'get',
        params:params
    })
}

//业务类型
export const getBusinessLis = (params)=>{
    return request({
        url:'/enterprise-business-service/common/queryBusinessListByProductType',
        method:'get',
        params:params
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

//通道
export const channelList = (params) => {
    return request({
      url: '/enterprise-business-service/channel/listByEnterpriseAccountId',
      method: 'get',
      params: params
    })
}