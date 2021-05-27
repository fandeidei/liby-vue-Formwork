/*
 * @Descripttion: 
 * @version: 
 * @Author: gonghairun
 * @Date: 2020-05-06 19:14:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-27 13:42:19
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
import homePage from '../views/homePage/index.vue' // 首页

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'homepage',
        name: '首页',
        meta: { title: '首页', affix: true },
        component: homePage
      },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: 'manageScreen',
  routes
})

export default router
