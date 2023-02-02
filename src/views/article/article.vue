<template>
  <div>
    <!-- 文章信息 -->
    <div class="banner" :style="articleCover">
      <div class="article-info-container">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-info">
          <div class="first-line">
            <span>
              <i class="iconfont icon-riLi" />
              发表于 {{ article.createTime }}
            </span>
            <span class="separator">|</span>
            <span>
              <i class="iconfont icon-updateTime" />
              更新于
              <template v-if="article.updateTime != null && article.updateTime !== ''">
                {{ article.updateTime }}
              </template>
              <template v-else>
                {{ article.createTime }}
              </template>
            </span>
            <span class="separator">|</span>
            <span class="article-category">
              <i class="iconfont icon-category" />
              <router-link :to="'/categories/' + article.categoryId">
                {{ article.categoryName }}
              </router-link>
            </span>
          </div>
          <div class="second-line">
            <span>
              <i class="iconfont icon-wordNum" />
              字数统计: {{ article.wordNum }}
            </span>
            <span class="separator">|</span>
            <span>
              <i class="iconfont icon-time" />
              阅读时长: {{ readTime }}
            </span>
          </div>
          <div class="third-line">
            <span class="separator">|</span>
            <!-- 阅读量 -->
            <span>
              <i class="iconfont icon-viewsCount" /> 阅读量: {{ article.viewCount }}
            </span>
            <span class="separator">|</span>
            <!-- 评论量 -->
            <span>
              <i class="iconfont icon-commentCount" />评论数: {{ commentCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 文章内容 -->
    <v-row class="article-container">
      <v-col md="9" cols="12">
        <v-card class="article-wrapper">
          <article
            id="write"
            ref="article"
            v-highlight
            class="article-content wangEditor-body"
            v-html="article.content"
          />
          <!-- 版权声明 -->
          <div class="article-copyright">
            <div>
              <span>文章作者：</span>
              <router-link to="/">
                {{ article.authorNickname }}
              </router-link>
            </div>
            <div>
              <span>文章链接：</span>
              <a :href="articleLink" target="_blank">{{ articleLink }} </a>
            </div>
            <div>
              <span>版权声明：</span>本文为博主原创文章，遵循&nbsp;
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                CC BY-NC-SA 4.0
              </a>
              &nbsp;版权协议，转载请附上原文出处链接和本声明。
            </div>
          </div>
          <!-- 标签 / 转发 -->
          <div class="article-operation">
            <div class="tag-container">
              <router-link v-for="item of article.tagList" :key="item.id" :to="'/tags/' + item.id">
                {{ item.name }}
              </router-link>
            </div>
            <share style="margin-left:auto" :config="shareConfig" />
          </div>
          <!-- 点赞 / 打赏 -->
          <div class="article-reward">
            <a :class="isLike" @click="likeArticle">
              <v-icon size="14" color="#fff">mdi-thumb-up</v-icon> 点赞
              <span v-show="article.likeCount > 0">{{ article.likeCount }}</span>
            </a>
            <a v-if="otherConfig['isReward'] === 1" class="reward-btn">
              <i class="iconfont icon-qrCode" /> 打赏
              <div class="animated fadeInDown reward-main">
                <ul class="reward-all">
                  <li class="reward-item">
                    <img :src="otherConfig['weiXinQrCode']" alt="" class="reward-img">
                    <div class="reward-desc">微信</div>
                  </li>
                  <li class="reward-item">
                    <img :src="otherConfig['alipayQrCode']" alt="" class="reward-img">
                    <div class="reward-desc">支付宝</div>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          <!-- 上一篇 / 下一篇 -->
          <div class="pagination-post">
            <div v-if="neighbourList.lastArticle" :class="isFull(article.lastArticle)">
              <router-link :to="'/articles/' + neighbourList.lastArticle.id">
                <img :src="neighbourList.lastArticle.articleCover" alt="" class="post-cover">
                <div class="post-info">
                  <div class="label">上一篇</div>
                  <div class="post-title">
                    {{ neighbourList.lastArticle.title }}
                  </div>
                </div>
              </router-link>
            </div>
            <div v-if="neighbourList.nextArticle" :class="isFull(neighbourList.nextArticle)">
              <router-link :to="'/articles/' + neighbourList.nextArticle.id">
                <img :src="neighbourList.nextArticle.articleCover" alt="" class="post-cover">
                <div class="post-info" style="text-align: right">
                  <div class="label">下一篇</div>
                  <div class="post-title">
                    {{ neighbourList.nextArticle.title }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 推荐文章 -->
          <div v-if="recommendList.length > 0" class="recommend-container">
            <div class="recommend-title">
              <v-icon size="20" color="#4c4948">mdi-thumb-up</v-icon> 相关推荐
            </div>
            <div class="recommend-list">
              <div v-for="item of recommendList" :key="item.id" class="recommend-item">
                <router-link :to="'/articles/' + item.id">
                  <img :src="item.articleCover" alt="" class="recommend-cover">
                  <div class="recommend-info">
                    <div class="recommend-date">
                      <i class="iconfont icon-riLi" />
                      {{ item.createTime }}
                    </div>
                    <div>{{ item.title }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
          <hr>
          <!-- 评论 -->
          <!-- <comment :type="commentType" @getCommentCount="getCommentCount" /> -->
        </v-card>
      </v-col>
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div style="position: sticky;top: 20px;">
          <!-- 文章目录 -->
          <v-card class="right-container">
            <div class="right-title">
              <i class="iconfont iconhanbao" style="font-size: 16px" />
              <span style="margin-left:10px">目录</span>
            </div>
            <div id="toc" />
          </v-card>
          <!-- 最新文章 -->
          <v-card class="right-container" style="margin-top:20px">
            <div class="right-title">
              <i class="iconfont icon-updateTime" style="font-size:16px" />
              <span style="margin-left:10px">最新文章</span>
            </div>
            <div class="article-list">
              <div v-for="item of newestList" :key="item.id" class="article-item">
                <router-link :to="'/articles/' + item.id" class="content-cover">
                  <img :src="item.articleCover" alt="">
                </router-link>
                <div class="content">
                  <div class="content-title">
                    <router-link :to="'/articles/' + item.id">
                      {{ item.title }}
                    </router-link>
                  </div>
                  <div class="content-time">{{ item.createTime }}</div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import tocbot from 'tocbot'
// import Comment from '../../components/Comment'
export default {
  name: 'Article',
  // components: {
  //   Comment
  // },
  data() {
    return {
      readTime: 0,
      commentCount: 0,
      commentType: 1,
      clipboard: null,
      articleLink: window.location.href,
      shareConfig: {
        sites: ['qzone', 'wechat', 'weibo', 'qq']
      },
      article: {
        title: '',
        content: '',
        wordNum: 0,
        categoryId: '',
        categoryName: '',
        authorNickname: '',
        createTime: '',
        updateTime: '',
        viewCount: 0,
        likeCount: 0,
        tagList: [],
        isLike: false
      },
      neighbourList: {
        lastArticle: {
          id: 1,
          title: '测试',
          articleCover: ''
        },
        nextArticle: null
      },
      recommendList: [],
      newestList: []
    }
  },
  computed: {
    otherConfig() {
      return this.$store.state.otherConfig
    },
    articleCover() {
      const cover = ''
      return 'background: url(' + cover + ') center center / cover no-repeat'
    },
    isLike() {
      return this.article.isLike ? 'like-btn-active' : 'like-btn'
    },
    isFull() {
      return function(article) {
        return article ? 'post full' : 'post'
      }
    }
  },
  created() {
    this.getArticle()
  },
  destroyed() {
    tocbot.destroy()
    if (this.clipboard != null) {
      this.clipboard.destroy()
    }
  },
  methods: {
    getArticle() {
      this.$mapi.portal.queryArticleDetail({ articleId: this.$route.params.articleId }).then(({ data }) => {
        document.title = data['title']
        this.article.title = data['title'] || ''
        this.article.content = data['content'] || ''
        this.article.wordNum = data['wordNum'] || 0
        this.article.categoryId = data['categoryId'] || ''
        this.article.categoryName = data['categoryName'] || ''
        this.article.authorNickname = data['authorNickname'] || ''
        this.article.createTime = data['createTime'] || ''
        this.article.updateTime = data['updateTime'] || ''
        this.article.viewCount = data['viewCount'] || 0
        this.article.likeCount = data['likeCount'] || 0
        this.article.tagList = data['tagList'] || []
        this.article.isLike = data['isLike'] || false

        this.$nextTick(() => {
          // 添加代码复制功能
          this.clipboard = new Clipboard('.copy-btn')
          this.clipboard.on('success', () => {
            this.$toast({ type: 'success', message: '复制成功' })
          })

          // 添加文章生成目录功能
          const nodes = this.$refs.article.children
          if (nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
              const node = nodes[i]
              const reg = /^H[1-4]$/
              if (reg.exec(node.tagName)) {
                node.id = i
              }
            }
          }
          tocbot.init({
            tocSelector: '#toc', // 要把目录添加元素位置，支持选择器
            contentSelector: '.article-content', // 获取html的元素
            headingSelector: 'h1, h2, h3', // 要显示的id的目录
            hasInnerContainers: true,
            onClick: function(e) {
              e.preventDefault()
            }
          })
        })
      }).catch(_ => {
        this.clearArticleInfo()
      })
    },
    clearArticleInfo() {
      this.article = {
        title: '',
        content: '',
        wordNnt: '',
        wordNum: 0,
        categoryId: '',
        categoryName: '',
        authorNickname: '',
        createTime: '',
        updateTime: '',
        viewCount: 0,
        likeCount: 0,
        tagList: [],
        isLike: false
      }
    },
    likeArticle() {

    },
    getCommentCount(count) {
      this.commentCount = count
    }
  }
}
</script>

<style scoped>
.banner:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.article-info i {
  font-size: 14px;
}
.article-info {
  font-size: 14px;
  line-height: 1.9;
  display: inline-block;
}
@media (min-width: 760px) {
  .banner {
    color: #eee !important;
  }
  .article-info span {
    font-size: 95%;
  }
  .article-info-container {
    position: absolute;
    bottom: 6.25rem;
    padding: 0 8%;
    width: 100%;
    text-align: center;
  }
  .second-line,
  .third-line {
    display: inline;
  }
  .article-title {
    font-size: 35px;
    margin: 20px 0 8px;
  }
  .pagination-post {
    display: flex;
  }
  .post {
    width: 50%;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(33.333% - 6px);
    height: 200px;
    background: #000;
    vertical-align: bottom;
  }
}
@media (max-width: 759px) {
  .banner {
    color: #eee !important;
    height: 360px;
  }
  .article-info span {
    font-size: 90%;
  }
  .separator:first-child {
    display: none;
  }
  .blog-container {
    margin: 322px 5px 0 5px;
  }
  .article-info-container {
    position: absolute;
    bottom: 1.3rem;
    padding: 0 5%;
    width: 100%;
    color: #eee;
    text-align: left;
  }
  .article-title {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
  .post {
    width: 100%;
  }
  .pagination-post {
    display: block;
  }
  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: calc(100% - 4px);
    height: 150px;
    margin: 2px;
    background: #000;
    vertical-align: bottom;
  }
}
.article-operation {
  display: flex;
  align-items: center;
}
.article-category a {
  color: #fff !important;
}
.tag-container a {
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0;
  padding: 0 0.75rem;
  width: fit-content;
  border: 1px solid #49b1f5;
  border-radius: 1rem;
  color: #49b1f5 !important;
  font-size: 12px;
  line-height: 2;
}
.tag-container a:hover {
  color: #fff !important;
  background: #49b1f5;
  transition: all 0.5s;
}

.article-copyright {
  position: relative;
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 0.875rem;
  line-height: 2;
  padding: 0.625rem 1rem;
  border: 1px solid #eee;
}
.article-copyright span {
  color: #49b1f5;
  font-weight: bold;
}
.article-copyright a {
  text-decoration: underline !important;
  color: #99a9bf !important;
}
.article-copyright:before {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: #49b1f5;
  content: "";
}
.article-copyright:after {
  position: absolute;
  top: 0.95rem;
  right: 0.95rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5em;
  background: #fff;
  content: "";
}

.article-reward {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reward-btn {
  position: relative;
  display: inline-block;
  width: 100px;
  background: #49b1f5;
  margin: 0 1rem;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}
.reward-btn:hover .reward-main {
  display: block;
}
.reward-main {
  display: none;
  position: absolute;
  bottom: 40px;
  left: 0;
  margin: 0;
  padding: 0 0 15px;
  width: 100%;
}
.reward-all {
  display: inline-block;
  margin: 0 0 0 -110px;
  padding: 20px 10px 8px !important;
  width: 320px;
  border-radius: 4px;
  background: #f5f5f5;
}
.reward-all:before {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}
.reward-all:after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-top: 13px solid #f5f5f5;
  border-right: 13px solid transparent;
  border-left: 13px solid transparent;
}
.reward-item {
  display: inline-block;
  padding: 0 8px;
  list-style-type: none;
}
.reward-img {
  width: 130px;
  height: 130px;
  display: block;
}
.reward-desc {
  margin: -5px 0;
  color: #858585;
  text-align: center;
}
.like-btn {
  display: inline-block;
  width: 100px;
  background: #969696;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}
.like-btn-active {
  display: inline-block;
  width: 100px;
  background: #ec7259;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}
.pagination-post {
  margin-top: 40px;
  overflow: hidden;
  width: 100%;
  background: #000;
}
.post {
  position: relative;
  height: 150px;
  overflow: hidden;
}
.post-info {
  position: absolute;
  top: 50%;
  padding: 20px 40px;
  width: 100%;
  transform: translate(0, -50%);
  line-height: 2;
  font-size: 14px;
}
.post-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}
.post a {
  position: relative;
  display: block;
  overflow: hidden;
  height: 150px;
}
.post:hover .post-cover {
  opacity: 0.8;
  transform: scale(1.1);
}
.label {
  font-size: 90%;
  color: #eee;
}
.post-title {
  font-weight: 500;
  color: #fff;
}
hr {
  position: relative;
  margin: 40px auto;
  border: 2px dashed #d2ebfd;
  width: calc(100% - 4px);
}
.full {
  width: 100% !important;
}
.right-container {
  padding: 20px 24px;
  font-size: 14px;
}
.right-title {
  display: flex;
  align-items: center;
  line-height: 2;
  font-size: 16px;
  margin-bottom: 6px;
}
.right-title i {
  font-weight: bold;
}
.recommend-container {
  margin-top: 40px;
}
.recommend-title {
  font-size: 20px;
  line-height: 2;
  font-weight: bold;
  margin-bottom: 5px;
}
.recommend-cover {
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}
.recommend-info {
  line-height: 2;
  color: #fff;
  position: absolute;
  top: 50%;
  padding: 0 20px;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
  font-size: 14px;
}
.recommend-date {
  font-size: 90%;
}
.recommend-item:hover .recommend-cover {
  opacity: 0.8;
  transform: scale(1.1);
}
.article-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
}
.article-item:first-child {
  padding-top: 0;
}
.article-item:last-child {
  padding-bottom: 0;
}
.article-item:not(:last-child) {
  border-bottom: 1px dashed #f5f5f5;
}
.article-item img {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
  object-fit: cover;
}
.article-item img:hover {
  transform: scale(1.1);
}
.content {
  flex: 1;
  padding-left: 10px;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.content-cover {
  width: 58px;
  height: 58px;
  overflow: hidden;
}
.content-title a {
  transition: all 0.2s;
  font-size: 95%;
}
.content-title a:hover {
  color: #2ba1d1;
}
.content-time {
  color: #858585;
  font-size: 85%;
  line-height: 2;
}
</style>

<style lang="scss">
.article-content pre {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  &:hover .copy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 7px;
    right: 45px;
    z-index: 1;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    color: #ccc;
    background-color: #525252;
    border-radius: 6px;
    display: none;
    font-size: 14px;
    width: 32px;
    height: 24px;
    outline: none;
  }
}
</style>
