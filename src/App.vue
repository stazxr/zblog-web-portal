<template>
  <v-app>
    <!-- 导航栏 -->
    <TopNavBar />
    <!-- 侧边导航栏 -->
    <SideNavBar />
    <!-- 内容 -->
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <!-- 页脚 -->
    <Footer />
    <!-- 返回顶部 -->
    <BackTop />
    <!-- 搜索模态框 -->
    <SearchModel />
    <!-- 登录模态框 -->
    <LoginModel />
    <!-- 注册模态框 -->
    <RegisterModel />
    <!-- 忘记密码模态框 -->
    <ForgetModel />
  </v-app>
</template>

<script>
import TopNavBar from './components/layout/TopNavBar'
import SideNavBar from './components/layout/SideNavBar'
import Footer from './components/layout/Footer'
import BackTop from './components/BackTop'
import SearchModel from './components/model/SearchModel'
import LoginModel from './components/model/LoginModel'
import RegisterModel from './components/model/RegisterModel'
import ForgetModel from './components/model/ForgetModel'
export default {
  name: 'App',
  components: {
    TopNavBar, SideNavBar, Footer, BackTop, SearchModel, LoginModel, RegisterModel, ForgetModel
  },
  computed: {
    websiteConfig() {
      return this.$store.state.websiteConfig
    },
    isMobile() {
      return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    }
  },
  created() {
    // 获取博客信息
    this.getBlogInfo()
    // 上传访客信息
    this.recordVisitor()
  },
  methods: {
    getBlogInfo() {
      this.$mapi.portal.queryBlogInfo().then(res => {
        this.$store.commit('setBlogInfo', res.data)
      })
    },
    recordVisitor() {
      this.$mapi.portal.recordVisitor()
    }
  }
}
</script>
