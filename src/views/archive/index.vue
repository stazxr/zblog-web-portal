<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">归档</h1>
    </div>
    <!-- 归档列表 -->
    <v-card class="blog-container">
      <timeline>
        <timeline-title> 目前共计{{ count }}篇文章，继续加油 </timeline-title>
        <timeline-item v-for="item of archiveList" :key="item.id" style="padding: 5px 0">
          <!-- 日期 -->
          <span class="time">{{ item['createTime'] }}</span>
          <!-- 文章标题 -->
          <router-link :to="'/articles/' + item.id" style="color:#666;text-decoration: none">
            {{ item['title'] }}
          </router-link>
        </timeline-item>
      </timeline>
      <!-- 分页按钮 -->
      <v-pagination v-model="current" color="#00C4B6" :length="Math.ceil(count / 10)" total-visible="7" />
    </v-card>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data: function() {
    return {
      current: 1,
      count: 0,
      archiveList: []
    }
  },
  computed: {
    cover() {
      let cover = ''
      this.$store.state.pageList.forEach(item => {
        if (item['pageLabel'] === 'archive') {
          cover = item['pageCover']
        }
      })
      return 'background: url(' + cover + ') center center / cover no-repeat'
    }
  },
  watch: {
    current(value) {
      this.listArchives(value)
    }
  },
  created() {
    this.listArchives(this.current)
  },
  methods: {
    listArchives(value) {
      const param = {
        current: value
      }

      this.$mapi.portal.queryArchiveList(param).then(({ data }) => {
        this.archiveList = data.list
        this.count = data.total
      }).catch(_ => {
        this.archiveList = []
        this.count = 0
      })
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
</style>
