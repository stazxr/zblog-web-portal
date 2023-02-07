<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">标签</h1>
    </div>
    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div v-if="count > 0" class="tag-cloud-title">标签 - {{ count }}</div>
      <div v-else class="tag-cloud-title">暂无内容</div>
      <div class="tag-cloud">
        <router-link v-for="item of tagList" :key="item.id" :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }" :to="'/tags/' + item.id">
          {{ item.name }}
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tagList: []
    }
  },
  computed: {
    cover() {
      let cover = ''
      this.$store.state.pageList.forEach(item => {
        if (item['pageLabel'] === 'tag') {
          cover = item['pageCover']
        }
      })
      return 'background: url(' + cover + ') center center / cover no-repeat'
    },
    count() {
      return this.tagList.length
    }
  },
  created() {
    this.listTags()
  },
  methods: {
    listTags() {
      this.$mapi.portal.queryTagList().then(({ data }) => {
        this.tagList = data
      }).catch(_ => {
        this.tagList = []
      })
    }
  }
}
</script>

<style scoped>
.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}
@media (max-width: 759px) {
  .tag-cloud-title {
    font-size: 25px;
  }
}
.tag-cloud {
  text-align: center;
}
.tag-cloud a {
  color: #616161;
  display: inline-block;
  text-decoration: none;
  padding: 0 8px;
  line-height: 2;
  transition: all 0.3s;
}
.tag-cloud a:hover {
  color: #03a9f4 !important;
  transform: scale(1.1);
}
</style>
