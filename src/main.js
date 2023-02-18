import Vue from 'vue'
import App from './App.vue'
import router from './router/routers'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api/http-index'
import Highlight from './directive/highlight'
import Toast from './components/toast/index'
import Confirm from './components/confirm/index'
import dayjs from 'dayjs'
import VueImageSwipe from 'vue-image-swipe'
import animated from 'animate.css'
import InfiniteLoading from 'vue-infinite-loading'
import { vueBaberrage } from 'vue-baberrage'
import './assets/styles/animation.css'
import './assets/styles/index.css'
import './assets/styles/variable.css'
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import './assets/styles/markdown.css'
import './assets/styles/wangEditor.css'
import 'vue-image-swipe/dist/vue-image-swipe.css'

Vue.use(InfiniteLoading)
Vue.use(animated)
Vue.use(vueBaberrage)
Vue.use(VueImageSwipe)
Vue.use(Toast)
Vue.use(Confirm)
Vue.use(Highlight)

// 声明全局变量
Vue.prototype['$mapi'] = api

// 关闭提示
Vue.config.productionTip = false

// 过滤器
Vue.filter('year', function(value) {
  return dayjs(value).format('YYYY')
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
