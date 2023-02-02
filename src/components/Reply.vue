<template>
  <div ref="reply" class="reply-input-wrapper" style="display: none">
    <textarea v-model="commentContent" class="comment-textarea" :placeholder="'回复 @' + nickname + '：'" auto-grow dense />
    <div class="emoji-container">
      <span :class="chooseEmoji ? 'emoji-btn-active' : 'emoji-btn'" @click="chooseEmoji = !chooseEmoji">
        <i class="iconfont icon-face" />
      </span>
      <div style="margin-left:auto">
        <button class="cancle-btn v-comment-btn" @click="cancelReply">
          取消
        </button>
        <button class="upload-btn v-comment-btn" @click="insertReply">
          提交
        </button>
      </div>
    </div>
    <!-- 表情框 -->
    <emoji :choose-emoji="chooseEmoji" @addEmoji="addEmoji" />
  </div>
</template>

<script>
import Emoji from './Emoji'
import EmojiList from '../assets/emoji/emoji'
export default {
  components: {
    Emoji
  },
  props: {
    type: {
      type: Number,
      default: null
    }
  },
  data: function() {
    return {
      index: 0,
      chooseEmoji: false,
      nickname: '',
      replyUserId: null,
      parentId: null,
      commentContent: ''
    }
  },
  methods: {
    cancelReply() {
      this.$refs.reply.style.display = 'none'
    },
    insertReply() {
      // 判断登录
      if (!this.$store.state.userId) {
        this.$store.state.loginFlag = true
        return false
      }
      if (this.commentContent.trim() === '') {
        this.$toast({ type: 'error', message: '回复不能为空' })
        return false
      }

      // 解析表情
      const reg = /\[.+?]/g
      this.commentContent = this.commentContent.replace(reg, function(str) {
        return (
          "<img src= '" + EmojiList[str] + "' alt='' width='24' height='24' style='margin: 0 1px;vertical-align: text-bottom' />"
        )
      })
      const path = this.$route.path
      const arr = path.split('/')
      const comment = {
        type: this.type,
        replyUserId: this.replyUserId,
        parentId: this.parentId,
        commentContent: this.commentContent
      }
      switch (this.type) {
        case 1:
        case 3:
          comment.topicId = arr[2]
          break
        default:
          break
      }
      this.commentContent = ''
      this.axios.post('/api/comments', comment).then(({ data }) => {
        if (data.flag) {
          this.$emit('reloadReply', this.index)
          this.$toast({ type: 'success', message: '回复成功' })
        } else {
          this.$toast({ type: 'error', message: data.message })
        }
      })
    },
    addEmoji(text) {
      this.commentContent += text
    }
  }
}
</script>

<style scoped>
.reply-input-wrapper {
  border: 1px solid #90939950;
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
}
</style>
