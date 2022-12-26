import Vue from 'vue'
import App from './App.vue'
import router from './router/routers'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api/http-index'
import './assets/styles/index.css'
import './assets/iconfont/iconfont.css'
import dayjs from 'dayjs'
import InfiniteLoading from 'vue-infinite-loading'
import Toast from './components/toast/index'

Vue.use(InfiniteLoading)
Vue.use(Toast)

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
