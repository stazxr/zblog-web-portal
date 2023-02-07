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
  },
  {
    path: '/message',
    component: resolve => require(['../views/message/index'], resolve),
    meta: {
      title: '留言板'
    }
  },
  {
    path: '/links',
    component: resolve => require(['../views/link/index'], resolve),
    meta: {
      title: '友链列表'
    }
  },
  {
    path: '/talks',
    component: resolve => require(['../views/talk/index'], resolve),
    meta: {
      title: '说说列表'
    }
  },
  {
    path: '/talks/:talkId',
    component: resolve => require(['../views/talk/detail'], resolve),
    meta: {
      title: '说说'
    }
  },
  {
    path: '/user',
    component: resolve => require(['../views/user/index'], resolve),
    meta: {
      title: '个人中心'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
