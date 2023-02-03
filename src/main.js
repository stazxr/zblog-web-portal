import Vue from 'vue'
import App from './App.vue'
import router from './router/routers'
import store from './store'
import vuetify from './plugins/vuetify'
import animated from 'animate.css'
import api from './api/http-index'
import './assets/styles/index.css'
import './assets/iconfont/iconfont.css'
import './assets/styles/markdown.css'
import './assets/styles/wangEditor.css'
import './assets/styles/vue-social-share/client.css'
import dayjs from 'dayjs'
import Share from 'vue-social-share'
import InfiniteLoading from 'vue-infinite-loading'
import Highlight from './directive/highlight'
import { vueBaberrage } from 'vue-baberrage'
import VueImageSwipe from 'vue-image-swipe'
import 'vue-image-swipe/dist/vue-image-swipe.css'
import Toast from './components/toast/index'

Vue.use(InfiniteLoading)
Vue.use(animated)
Vue.use(Share)
Vue.use(vueBaberrage)
Vue.use(VueImageSwipe)
Vue.use(Toast)
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
