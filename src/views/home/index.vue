<template>
  <div>
    <!-- 封面 -->
    <div class="home-banner" :style="cover">
      <div class="banner-container">
        <h1 class="blog-title animated zoomIn">
          {{ websiteConfig['websiteName'] }}
        </h1>
        <div class="blog-intro">
          {{ typedConfig.output }} <span class="typed-cursor">|</span>
        </div>
      </div>
      <div class="scroll-down" @click="scrollDown">
        <v-icon color="#fff" class="scroll-down-effects">mdi-chevron-down</v-icon>
      </div>
    </div>
    <!-- 主页内容 -->
    <v-row class="home-container">
      <v-col md="9" cols="12">
        <!-- 说说轮播 -->
        <v-card v-if="talkList.length > 0" class="animated zoomIn">
          <Swiper :list="talkList" />
        </v-card>
        <!-- 文章列表 -->
        <v-card v-for="(item, index) of articleList" :key="item.id" class="animated zoomIn article-card" style="border-radius: 12px 8px 8px 12px">
          <!-- 文章封面图 -->
          <div :class="isRight(index)">
            <router-link :to="'/articles/' + item.id">
              <!-- 无封面 -->
              <v-img v-if="item['coverImageType'] === 5" class="on-hover" width="100%" height="100%" :src="noArticleCoverImg">
                <div class="ribbon">
                  <span v-if="item['articleType'] === 1">原创</span>
                  <span v-if="item['articleType'] === 2">转载</span>
                  <span v-if="item['articleType'] === 3">翻译</span>
                </div>
              </v-img>
              <!-- 默认封面 -->
              <v-img v-if="item['coverImageType'] === 3" class="on-hover" width="100%" height="100%" :src="articleDefaultImg">
                <div class="ribbon">
                  <span v-if="item['articleType'] === 1">原创</span>
                  <span v-if="item['articleType'] === 2">转载</span>
                  <span v-if="item['articleType'] === 3">翻译</span>
                </div>
              </v-img>
              <!-- 单封面、多封面、封面自动生成 -->
              <v-img v-else class="on-hover" width="100%" height="100%" :src="item['articleImgLinkList'] && item['articleImgLinkList'].length > 0 ? item['articleImgLinkList'][0] : ''">
                <div class="ribbon">
                  <span v-if="item['articleType'] === 1">原创</span>
                  <span v-if="item['articleType'] === 2">转载</span>
                  <span v-if="item['articleType'] === 3">翻译</span>
                </div>
              </v-img>
            </router-link>
          </div>
          <!-- 文章信息 -->
          <div class="article-wrapper">
            <div style="line-height:1.4">
              <router-link :to="'/articles/' + item.id" class="article-title"> {{ item['title'] }} </router-link>
            </div>
            <div class="article-info">
              <!-- 最新 -->
              <span v-if="index === 0">
                <span style="color:#ff7242">
                  <i class="iconfont icon-top" /> 最新
                </span>
                <span class="separator">|</span>
              </span>
              <!-- 作者 -->
              <v-icon size="14">mdi-account-circle</v-icon>
              {{ item['authorNickname'] }}
              <span class="separator">|</span>
              <!-- 发表时间 -->
              <v-icon size="14">mdi-calendar-month-outline</v-icon>
              {{ item['createTime'] }}
              <span class="separator">|</span>
              <!-- 文章分类 -->
              <router-link :to="'/categories/' + item['categoryId']">
                <v-icon size="14">mdi-inbox-full</v-icon>
                {{ item['categoryName'] }}
              </router-link>
              <span class="separator">|</span>
              <!-- 文章标签 -->
              <router-link v-for="tag of item['tagList']" :key="tag.id" style="display:inline-block" :to="'/tags/' + tag.id" class="mr-1">
                <v-icon size="14">mdi-tag-multiple</v-icon>{{ tag['name'] }}
              </router-link>
            </div>
            <!-- 文章摘要 -->
            <div class="article-content">
              {{ item['remark'] }}
            </div>
          </div>
        </v-card>
        <!-- 无限加载 -->
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-results" />
          <div slot="no-more" />
        </infinite-loading>
      </v-col>
      <!-- 博主信息 -->
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div class="blog-wrapper">
          <v-card class="animated zoomIn blog-card mt-5">
            <div class="author-wrapper">
              <!-- 博主头像 -->
              <v-avatar size="110">
                <img :src="websiteConfig['websiteAvatar']" class="author-avatar" alt="">
              </v-avatar>
              <div style="font-size: 1.375rem;margin-top:0.625rem">
                {{ websiteConfig['websiteAuthor'] }}
              </div>
              <div style="font-size: 0.875rem;">
                {{ websiteConfig['websiteIntro'] }}
              </div>
            </div>
            <!-- 博客信息 -->
            <div class="blog-info-wrapper">
              <div class="blog-info-data">
                <router-link to="/archives">
                  <div style="font-size: 0.875rem">文章</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.articleCount }}
                  </div>
                </router-link>
              </div>
              <div class="blog-info-data">
                <router-link to="/categories">
                  <div style="font-size: 0.875rem">分类</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.categoryCount }}
                  </div>
                </router-link>
              </div>
              <div class="blog-info-data">
                <router-link to="/tags">
                  <div style="font-size: 0.875rem">标签</div>
                  <div style="font-size: 1.25rem">
                    {{ countInfo.tagCount }}
                  </div>
                </router-link>
              </div>
            </div>
            <a class="collection-btn" @click="tip = true">
              <v-icon color="#fff" size="18" class="mr-1">mdi-bookmark</v-icon>
              加入书签
            </a>
            <!-- 社交信息 -->
            <div class="card-info-social">
              <a v-if="socialConfig['qq'] !== null && socialConfig['qq'] !== ''" target="_blank" :href="socialConfig['qq']" class="mr-5 iconfont icon-qq" />
              <a v-if="socialConfig['github'] !== null && socialConfig['github'] !== ''" target="_blank" :href="socialConfig['github']" class="mr-5 iconfont icongithub" />
              <a v-if="socialConfig['gitee'] !== null && socialConfig['gitee'] !== ''" target="_blank" :href="socialConfig['gitee']" class="iconfont icongitee-fill-round" />
            </div>
          </v-card>
          <!-- 网站公告 -->
          <v-card class="blog-card animated zoomIn mt-5 big">
            <div class="web-info-title">
              <v-icon size="18">mdi-bell</v-icon>
              公告
            </div>
            <div style="font-size:0.875rem">
              {{ websiteConfig['websiteNotice'] }}
            </div>
          </v-card>
          <!-- 网站资讯 -->
          <v-card class="blog-card animated zoomIn mt-5">
            <div class="web-info-title">
              <v-icon size="18">mdi-chart-line</v-icon>
              网站资讯
            </div>
            <div class="web-info">
              <div style="padding:4px 0 0">
                总访问量:<span class="float-right"> {{ countInfo.viewsCount }}</span>
              </div>
              <div style="padding:4px 0 0">
                运行时间:<span class="float-right">{{ time }}</span>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- 提示消息 -->
    <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar>
  </div>
</template>

<script>
import NoArticleCoverImg from '../../assets/images/no-article-cover.png'
import Swiper from '../../components/Swiper.vue'
import EasyTyper from 'easy-typer-js'
export default {
  name: 'Home',
  components: {
    Swiper
  },
  data() {
    return {
      tip: false,
      time: '',
      typedConfig: {
        output: '',
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: 'rollback',
        backSpeed: 40,
        sentencePause: true
      },
      noArticleCoverImg: NoArticleCoverImg,
      articleDefaultImg: '',
      articleList: [],
      talkList: [],
      articlePage: 1,
      articlePageSize: 10
    }
  },
  computed: {
    cover() {
      let cover = ''
      this.$store.state.pageList.forEach(item => {
        if (item['pageLabel'] === 'home') {
          cover = item['pageCover']
        }
      })
      return 'background: url(' + cover + ') center center / cover no-repeat'
    },
    isRight() {
      return function(index) {
        if (index % 2 === 0) {
          return 'article-cover left-radius'
        }
        return 'article-cover right-radius'
      }
    },
    websiteConfig() {
      return this.$store.state.websiteConfig
    },
    socialConfig() {
      return this.$store.state.socialConfig
    },
    countInfo() {
      return this.$store.state.countInfo
    }
  },
  created() {
    this.init()
    this.listHomeTalks()
    this.queryArticleDefaultImg()
    this.timer = setInterval(this.runTime, 1000)
  },
  methods: {
    init() {
      document.title = this.websiteConfig['websiteName']
      fetch('https://v1.hitokoto.cn?c=i').then(res => {
        return res.json()
      }).then(({ hitokoto }) => {
        this.initTyped(hitokoto)
      })
    },
    initTyped(input, fn, hooks) {
      const config = this.typedConfig
      // eslint-disable-next-line no-unused-vars
      const typed = new EasyTyper(config, input, fn, hooks)
    },
    scrollDown() {
      window.scrollTo({
        behavior: 'smooth',
        top: document.documentElement.clientHeight
      })
    },
    listHomeTalks() {
      this.$mapi.portal.queryBoardTalkList().then(({ data }) => {
        this.talkList = data
      }).catch(_ => {
        this.talkList = []
      })
    },
    queryArticleDefaultImg() {
      this.$mapi.other.queryArticleDefaultImg().then(res => {
        const { data } = res
        this.articleDefaultImg = data || ''
      }).catch(_ => {
        this.articleDefaultImg = ''
      })
    },
    runTime() {
      const createTime = this.websiteConfig['websiteCreateTime']
      const timeOld = new Date().getTime() - new Date(createTime).getTime()
      const msPerDay = 24 * 60 * 60 * 1000
      const daysOld = Math.floor(timeOld / msPerDay)
      let str = ''
      const day = new Date()
      str += daysOld + '天'
      str += day.getHours() + '时'
      str += day.getMinutes() + '分'
      str += day.getSeconds() + '秒'
      this.time = str
    },
    infiniteHandler($state) {
      const param = {
        page: this.articlePage,
        pageSize: this.articlePageSize
      }
      this.$mapi.portal.queryArticleList(param).then(({ data }) => {
        if (data.list.length === 0) {
          $state.complete()
        } else {
          this.articleList.push(...data.list)
          this.articlePage++
          $state.loaded()
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.typed-cursor
  opacity: 1
  -webkit-animation: blink 0.7s infinite
  -moz-animation: blink 0.7s infinite
  animation: blink 0.7s infinite
  @keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  @-webkit-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  @-moz-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
</style>

<style scoped>
.home-banner {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 100vh;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
}
.banner-container {
  margin-top: 43vh;
  line-height: 1.5;
  color: #eee;
}
.card-info-social {
  line-height: 40px;
  text-align: center;
  margin: 6px 0 -6px;
}
.card-info-social a {
  font-size: 1.5rem;
}
.left-radius {
  border-radius: 8px 0 0 8px !important;
  order: 0;
}
.right-radius {
  border-radius: 0 8px 8px 0 !important;
  order: 1;
}
.article-wrapper {
  font-size: 14px;
}
.article-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ribbon {
  background-color: #54CBFF;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  right: -80px;
  opacity: 95%;
  top: 15px;
  transform: rotate(45deg);
  box-shadow: 0 0 10px #888;
}
.ribbon span {
  border: 1px solid #54CBFF;
  color: #fff;
  display: block;
  font: bold 100% 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 5px 100px;
  text-align: center;
  text-shadow: 0 0 5px #444;
}
@media (min-width: 760px) {
  .blog-title {
    font-size: 2.5rem;
  }
  .blog-intro {
    font-size: 1.5rem;
  }
  .home-container {
    max-width: 1200px;
    margin: calc(100vh - 48px) auto 28px auto;
    padding: 0 5px;
  }
  .article-card {
    display: flex;
    align-items: center;
    height: 280px;
    width: 100%;
    margin-top: 20px;
  }
  .article-cover {
    overflow: hidden;
    height: 100%;
    width: 45%;
  }
  .on-hover {
    transition: all 0.6s;
  }
  .article-card:hover .on-hover {
    transform: scale(1.1);
  }
  .article-wrapper {
    padding: 0 2.5rem;
    width: 55%;
  }
  .article-wrapper a {
    font-size: 1.5rem;
    transition: all 0.3s;
  }
}
@media (max-width: 759px) {
  .blog-title {
    font-size: 26px;
  }
  .home-container {
    width: 100%;
    margin: calc(100vh - 66px) auto 0 auto;
  }
  .article-card {
    margin-top: 1rem;
  }
  .article-cover {
    border-radius: 8px 8px 0 0 !important;
    height: 230px !important;
    width: 100%;
  }
  .article-cover div {
    border-radius: 8px 8px 0 0 !important;
  }
  .article-wrapper {
    padding: 1.25rem 1.25rem 1.875rem;
  }
  .article-wrapper a {
    font-size: 1.25rem;
    transition: all 0.3s;
  }
}
.scroll-down {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.scroll-down i {
  font-size: 2rem;
}
.article-wrapper a:hover {
  color: #8e8cd8;
}
.article-info {
  font-size: 95%;
  color: #858585;
  line-height: 2;
  margin: 0.375rem 0;
}
.article-info a {
  font-size: 95%;
  color: #858585 !important;
}
.article-content {
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.blog-wrapper {
  position: sticky;
  top: 10px;
}
.blog-card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}
.author-wrapper {
  text-align: center;
}
.blog-info-wrapper {
  display: flex;
  justify-self: center;
  padding: 0.875rem 0;
}
.blog-info-data {
  flex: 1;
  text-align: center;
}
.blog-info-data a {
  text-decoration: none;
}
.collection-btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  transition-duration: 1s;
  transition-property: color;
}
.collection-btn:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: "";
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
}
.collection-btn:hover:before {
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transform: scaleX(1);
}
.author-avatar {
  transition: all 0.5s;
}
.author-avatar:hover {
  transform: rotate(360deg);
}
.web-info {
  padding: 0.25rem;
  font-size: 0.875rem;
}
.scroll-down-effects {
  color: #eee !important;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}
.big i {
  color: #f00;
  animation: big 0.8s linear infinite;
}
@keyframes big {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>
