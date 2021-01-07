import request from '../../utils/request'

//账号管理

//获取用户部门树
export const getDepartmentTree = (params) => {
    return request({
      url: '/enterprise-business-service/department/treeList',
      method: 'get',
      params: params
    })
}

//新增部门
export const addDepartment = (params) => {
    return request({
      url: '/enterprise-business-service/department/add',
      method: 'post',
      data: params
    })
}

//修改部门
export const editDepartment = (params) => {
    return request({
      url: '/enterprise-business-service/department/update',
      method: 'post',
      data: params
    })
}

//删除部门
export const deleteDepartment = (params) => {
    return request({
      url: '/enterprise-business-service/department/delete',
      method: 'post',
      data: params
    })
}
  
//根据部门查询账号
export const getAccountList = (params) => {
    return request({
      url: '/enterprise-business-service/enterpriseUserAccount/pageListByDeptId',
      method: 'post',
      data: params
    })
}

//获取角色下拉列表
export const getRoleList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/roleList',
    method: 'get',
    params: params
  })
}

// 新增账户时获取账户企业是否认证
export const getCheckedStatus = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/getCheckedStatus',
    method: 'get',
    params: params
  })
}

// 新增修改应用时获取应用列表
export const getAppList = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/accountAppList',
    method: 'get',
    params: params
  })
}

//新增账号
export const addAccount = (params) => {
    return request({
      url: '/enterprise-business-service/enterpriseUserAccount/add',
      method: 'post',
      data: params
    })
}

//修改账号
export const editAccount = (params) => {
    return request({
      url: '/enterprise-business-service/enterpriseUserAccount/update',
      method: 'post',
      data: params
    })
}

//停用账号
export const stopUseAccount = (params) => {
    return request({
      url: '/enterprise-business-service/enterpriseUserAccount/disable',
      method: 'post',
      data: params
    })
}

//启用账号
export const startUseAccount = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/enable',
    method: 'post',
    data: params
  })
}

//解锁账号
export const unlockAccount = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/unlock',
    method: 'post',
    data: params
  })
}

//删除账号
export const deleteAccount = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/delete',
    method: 'post',
    data: params
  })
}

//重置密码
export const resetPassword = (params) => {
  return request({
    url: '/enterprise-business-service/enterpriseUserAccount/password/reset',
    method: 'post',
    data: params
  })
}

 
// 角色权限

//角色列表
export const getRoleData = (params) => {
    return request({
      url: '/enterprise-business-service/role/list',
      method: 'post',
      data: params
    })
}

//角色新增
export const addRole = (params) => {
    return request({
      url: '/enterprise-business-service/role/add',
      method: 'post',
      data: params
    })
}

//修改角色
export const editRole = (params) => {
    return request({
      url: '/enterprise-business-service/role/update',
      method: 'post',
      data: params
    })
}

//删除角色
export const deleteRole = (params) => {
    return request({
      url: '/enterprise-business-service/role/delete',
      method: 'post',
      data: params
    })
}

//获取角色对应权限树
export const getRoleAuthorityList = (params) => {
    return request({
      url: '/enterprise-business-service/role/listAuthority',
      method: 'get',
      params: params
    })
}

//复制并新建角色
export const copyRole = (params) => {
    return request({
      url: '/enterprise-business-service/role/copy/add',
      method: 'post',
      data: params
    })
}

//修改角色权限
export const editRoleAuthority = (params) => {
    return request({
      url: '/enterprise-business-service/role/authority/update',
      method: 'post',
      data: params
    })
}

//还原上一版本权限
export const revertRoleAuthority = (params) => {
    return request({
      url: '/enterprise-business-service/role/revert',
      method: 'post',
      data: params
    })
}






