import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['../views/home/index'], resolve)
  },
  {
    path: '/article/:articleId',
    component: resolve => require(['../views/article/article'], resolve)
  },
  {
    path: '/articles/:articleId',
    component: resolve => require(['../views/article/article'], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
