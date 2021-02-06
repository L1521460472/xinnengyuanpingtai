import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import { getCookie } from '../public'


const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: ()=>import('../components/Home.vue'),
    children:[
      {//首页
        path: '/homeIndex',
        name: 'homeIndex',
        component: ()=>import('../components/homeIndex.vue')
      },
      {//群发消息
        path: '/moreMessages',
        name: 'moreMessages',
        component: ()=>import('../components/Message/moreMessages.vue')
      },
      {//收发记录
        path: '/records',
        name: 'records',
        component: ()=>import('../components/Message/record.vue')
      },
      {//消息模板
        path: '/messageTemplate',
        name: 'messageTemplate',
        component: ()=>import('../components/Message/messageTemplate.vue')
      },
      {//消息制作器
        path: '/diyMessage',
        name: 'diyMessage',
        component: ()=>import('../components/Message/diyMessage/index.vue'),
      },
      {//媒体素材
        path: '/multimediaFile',
        name: 'mediaMaterial',
        component: ()=>import('../components/Message/mediaMaterial.vue')
      },
      {//统计
        path: '/statisticalReport',
        name: 'statisticalReport',
        component: ()=>import('../components/statistics/statisticalReport.vue'),
      },
      {//自定义菜单
        path: '/customMenu',
        name: 'customMenu',
        component: ()=>import('../components/Message/customMenu.vue')
      },
      { // 个人通讯录
        path: '/personalAddressBook',
        name: 'personalAddressBook',
        component: () => import('../components/addressBook/personalAddressBook.vue')
      },
      { // 通讯录管理
        path: '/manageAddressBook',
        name: 'manageAddressBook',
        component: () => import('../components/addressBook/manageAddressBook.vue')
      },
      {//我的机器人
        path: '/myrobot',
        name: 'myrobot',
        component: ()=>import('../components/robot/myrobot.vue'),
      },
      {//实体管理
        path: '/entityManagement',
        name: 'entityManagement',
        component: ()=>import('../components/robot/entityManagement.vue'),
      },
      {//意图管理
        path: '/intentionManagement',
        name: 'intentionManagement',
        component: ()=>import('../components/robot/intentionManagement.vue'),
      },
      {//调试信息
        path: '/debugInformation',
        name: 'debugInformation',
        component: ()=>import('../components/robot/debugInformation.vue'),
      },
      {//基本信息
        path: '/userInformation',
        name: 'userInformation',
        component: ()=>import('../components/UserName/userInformation.vue')
      },
      {//密码设置
        path: '/setPassword',
        name: 'setPassword',
        component: ()=>import('../components/UserName/setPassword.vue')
      },
      {//我的应用
        path: '/myApps',
        name: 'myApps',
        component: ()=>import('../components/Develop/myApps.vue')
      },
      {//基本配置
        path: '/userConfiguration',
        name: 'userConfiguration',
        component: ()=>import('../components/Develop/userConfiguration.vue')
      },
      {//账号管理
        path: '/accountManagement',
        name: 'accountManagement',
        component: ()=>import('../components/setting/accountManagement.vue')
      },
      {//角色权限
        path: '/rolePermission',
        name: 'rolePermission',
        component: ()=>import('../components/setting/rolePermission.vue')
      },
      { // 菜单管理
        path: '/menusetting',
        name: 'menusetting',
        component: () => import ('../components/setting/menuButton.vue')
      }
    ]
  }
]


const router =  new Router({
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  const token = getCookie('enterpriseToken')
  if (to.path === '/') {
    next()
  } else {
    if (!token) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
