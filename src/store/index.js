import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 网站配置信息
    websiteConfig: {},
    // 社交配置信息
    socialConfig: {},
    // 其他配置信息
    otherConfig: {},
    // 计数信息
    countInfo: {
      // 文章数量
      articleCount: 0,
      // 分类数量
      categoryCount: 0,
      // 标签数量
      tagCount: 0,
      // 访问量
      viewsCount: 0
    },
    // 页面信息
    pageList: [],
    drawerFlag: false,
    searchFlag: false,
    loginFlag: false,
    registerFlag: false,
    forgetFlag: false,
    emailFlag: false,
    loginUrl: '',
    userId: null,
    avatar: null,
    nickname: null,
    intro: null,
    webSite: null,
    loginType: null,
    email: null,
    articleLikeSet: [],
    commentLikeSet: [],
    talkLikeSet: []
  },
  mutations: {
    // 设置网站信息
    setBlogInfo(state, blogInfo) {
      state.websiteConfig = blogInfo['webInfo'] || {}
      state.socialConfig = blogInfo['socialInfo'] || {}
      state.otherConfig = blogInfo['otherInfo'] || {}
      state.countInfo.articleCount = blogInfo['articleCount'] || 0
      state.countInfo.categoryCount = blogInfo['categoryCount'] || 0
      state.countInfo.tagCount = blogInfo['tagCount'] || 0
      state.countInfo.viewsCount = blogInfo['viewsCount'] || 0
      state.pageList = blogInfo['pageList'] || []
    },
    login(state, user) {
      state.userId = user['']
      state.avatar = user.avatar
      state.nickname = user.nickname
      state.intro = user.intro
      state.webSite = user.webSite
      state.articleLikeSet = user.articleLikeSet ? user.articleLikeSet : []
      state.commentLikeSet = user.commentLikeSet ? user.commentLikeSet : []
      state.talkLikeSet = user.talkLikeSet ? user.talkLikeSet : []
      state.email = user.email
      state.loginType = user.loginType
    },
    logout(state) {
      state.userId = null
      state.avatar = null
      state.nickname = null
      state.intro = null
      state.webSite = null
      state.articleLikeSet = []
      state.commentLikeSet = []
      state.talkLikeSet = []
      state.email = null
      state.loginType = null
    },
    saveLoginUrl(state, url) {
      state.loginUrl = url
    },
    saveEmail(state, email) {
      state.email = email
    },
    updateUserInfo(state, user) {
      state.nickname = user.nickname
      state.intro = user.intro
      state.webSite = user.webSite
    },
    savePageInfo(state, pageList) {
      state.pageList = pageList
    },
    updateAvatar(state, avatar) {
      state.avatar = avatar
    },
    closeModel(state) {
      state.registerFlag = false
      state.loginFlag = false
      state.searchFlag = false
      state.emailFlag = false
    },
    articleLike(state, articleId) {
      const articleLikeSet = state.articleLikeSet
      if (articleLikeSet.indexOf(articleId) !== -1) {
        articleLikeSet.splice(articleLikeSet.indexOf(articleId), 1)
      } else {
        articleLikeSet.push(articleId)
      }
    },
    commentLike(state, commentId) {
      const commentLikeSet = state.commentLikeSet
      if (commentLikeSet.indexOf(commentId) !== -1) {
        commentLikeSet.splice(commentLikeSet.indexOf(commentId), 1)
      } else {
        commentLikeSet.push(commentId)
      }
    },
    talkLike(state, talkId) {
      const talkLikeSet = state.talkLikeSet
      if (talkLikeSet.indexOf(talkId) !== -1) {
        talkLikeSet.splice(talkLikeSet.indexOf(talkId), 1)
      } else {
        talkLikeSet.push(talkId)
      }
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
