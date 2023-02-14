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
    path: '/articles/:articleId',
    component: resolve => require(['../views/article/article'], resolve)
  },
  {
    path: '/article404',
    component: resolve => require(['../views/article/articleNotFound'], resolve)
  },
  {
    path: '/archives',
    component: resolve => require(['../views/archive/index'], resolve),
    meta: {
      title: '归档'
    }
  },
  {
    path: '/tags',
    component: resolve => require(['../views/tag/index'], resolve),
    meta: {
      title: '标签'
    }
  },
  {
    path: '/tags/:tagId',
    component: resolve => require(['../views/article/articleList.vue'], resolve)
  },
  {
    path: '/categories',
    component: resolve => require(['../views/category/index'], resolve),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/categories/:categoryId',
    component: resolve => require(['../views/article/articleList.vue'], resolve)
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
    path: '/links',
    component: resolve => require(['../views/link/index'], resolve),
    meta: {
      title: '友链列表'
    }
  },
  {
    path: '/message',
    component: resolve => require(['../views/message/index'], resolve),
    meta: {
      title: '留言板'
    }
  },
  {
    path: '/user',
    component: resolve => require(['../views/user/index'], resolve),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/404',
    component: (resolve) => require(['../views/features/404'], resolve),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
