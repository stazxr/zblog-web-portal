import api from './custom-axios'

export default {
  // 查询文章默认封面
  queryArticleDefaultImg: params => {
    return api.httpRequest().get(`/api/articles/queryArticleDefaultImg`, params)
  }
}
