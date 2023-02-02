import api from './custom-axios'

const portalApi = '/api/portal'

export default {
  // 查询博客前台信息
  queryBlogInfo: params => {
    return api.httpRequest().get(`${portalApi}/queryBlogInfo`, params)
  },
  // 记录访客信息
  recordVisitor: params => {
    return api.httpRequest().post(`${portalApi}/recordVisitor`, params)
  },
  // 获取说说列表
  queryTalkList: params => {
    return api.httpRequest().get(`${portalApi}/queryTalkList`, params)
  },
  // 获取文章列表
  queryArticleList: params => {
    return api.httpRequest().get(`${portalApi}/queryArticleList`, params)
  },
  // 获取文章详情
  queryArticleDetail: params => {
    return api.httpRequest().get(`${portalApi}/queryArticleDetail`, params)
  }
}
