import Vue from 'vue'
import Router from 'vue-router'
import NoPage from '@/components/404'

import InitItem from '@/page/habit/initItem'
import InitItemAdd from '@/page/habit/initItemAdd'
import Login from '@/page/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/page/habit/initItem'},
    {path: '/login',name: 'Login', component: Login},

    //习惯记录
    {path: '/page/habit/initItem', name: 'InitItem', component: InitItem},
    {path: '/page/habit/initItemAdd', name: 'InitItemAdd', component: InitItemAdd},





    {path: '/*', name: '页面未找到', component: NoPage}
  ]
})
