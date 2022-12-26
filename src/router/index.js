import router from './routers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta['title'] && (document.title = to.meta['title'])
  next()
})

router.afterEach((to, from) => {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
  NProgress.done()
})
