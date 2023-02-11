<template>
  <v-dialog v-model="loginFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="loginFlag = false">mdi-close</v-icon>
      <div class="login-wrapper">
        <v-text-field
          v-model="username"
          label="账号"
          placeholder="请输入您的用户名或邮箱"
          clearable
          @keyup.enter="login"
        />
        <v-text-field
          v-model="password"
          class="mt-7"
          label="密码"
          placeholder="请输入您的密码"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @keyup.enter="login"
          @click:append="show = !show"
        />
        <!-- 登录 -->
        <v-btn :disabled="loginDisabled" class="mt-7" block color="blue" style="color:#fff" @click="login">登录</v-btn>
        <!-- 注册和找回密码 -->
        <div class="mt-10 login-tip">
          <span @click="openRegister">立即注册</span>
          <span class="float-right" @click="openForget">忘记密码?</span>
        </div>
        <div v-if="socialLoginList.length > 0">
          <div class="social-login-title">社交账号登录</div>
          <div class="social-login-wrapper">
            <!-- qq登录 -->
            <a v-if="showLogin('qq')" class="iconfont icon-qq" style="color:#00AAEE" @click="qqLogin" />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { encrypt } from '../../utils/rsaEncrypt'
export default {
  data: function() {
    return {
      username: '',
      password: '',
      show: false,
      loginDisabled: false
    }
  },
  computed: {
    loginFlag: {
      set(value) {
        this.$store.state.loginFlag = value
      },
      get() {
        return this.$store.state.loginFlag
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth
      return clientWidth <= 960
    },
    socialLoginList() {
      return this.$store.state.websiteConfig.socialLoginList || []
    },
    showLogin() {
      return function(type) {
        return this.socialLoginList.indexOf(type) !== -1
      }
    }
  },
  methods: {
    login() {
      if (this.username.trim().length === 0) {
        this.$toast({ type: 'error', message: '账号不能为空' })
        return false
      }
      if (this.password.trim().length === 0) {
        this.$toast({ type: 'error', message: '密码不能为空' })
        return false
      }

      const param = {
        username: this.username.trim(),
        password: encrypt(this.password.trim())
      }

      this.loginDisabled = true
      this.$mapi.portal.webLogin(param).then(({ code, data, message }) => {
        if (code === 200) {
          this.username = ''
          this.password = ''
          this.$store.commit('login', data)
          this.$store.commit('closeModel')
          this.$toast({ type: 'success', message: '登录成功' })
        } else {
          this.$toast({ type: 'error', message: message })
        }
      }).catch(_ => {
        this.$toast({ type: 'error', message: '登录失败' })
      }).finally(_ => {
        this.loginDisabled = false
      })
    },
    openRegister() {
      this.$store.state.loginFlag = false
      this.$store.state.registerFlag = true
    },
    openForget() {
      this.$store.state.loginFlag = false
      this.$store.state.forgetFlag = true
    },
    qqLogin() {
      // 保留当前路径
      this.$store.commit('saveLoginUrl', this.$route.path)
      if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i)) {
        // eslint-disable-next-line no-undef
        // QC.Login.showPopup({
        //   appId: this.config.QQ_APP_ID,
        //   redirectURI: this.config.QQ_REDIRECT_URI
        // })
      } else {
        // window.open(
        //   'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=' +
        //     +this.config.QQ_APP_ID +
        //     '&response_type=token&scope=all&redirect_uri=' +
        //     this.config.QQ_REDIRECT_URI,
        //   '_self'
        // )
      }
    }
  }
}
</script>

<style scoped>
.social-login-title {
  margin-top: 1.5rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}
.social-login-title::before {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-title::after {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}
.social-login-wrapper a {
  text-decoration: none;
}
</style>
