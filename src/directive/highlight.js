import Hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const Highlight = {}

// 自定义代码高亮插件
Highlight.install = function(Vue) {
  // 自定义指令 v-highlight
  Vue.directive('highlight', {
    // 被绑定元素插入父节点时调用
    inserted: function(el) {
      console.log('el', el)
      const blocks = el.querySelectorAll('pre code')
      console.log('blocks', blocks)
      for (let i = 0; i < blocks.length; i++) {
        Hljs.highlightElement(blocks[i])
      }
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function(el) {
      console.log('el2', el)
      const blocks = el.querySelectorAll('pre code')
      console.log('blocks2', blocks)
      for (let i = 0; i < blocks.length; i++) {
        Hljs.highlightElement(blocks[i])
      }
    }
  })
}

export default Highlight
