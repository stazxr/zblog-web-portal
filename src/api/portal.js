import api from './custom-axios'

const portalApi = '/api/portal'

export default {
  // 登录
  webLogin: params => {
    return api.httpRequest().post(`${portalApi}/webLogin`, params)
  },
  // 查询博客前台信息
  queryBlogInfo: params => {
    return api.httpRequest().get(`${portalApi}/queryBlogInfo`, params)
  },
  // 记录访客信息
  recordVisitor: params => {
    return api.httpRequest().post(`${portalApi}/recordVisitor`, params)
  },
  // 获取文章列表
  queryArticleList: params => {
    return api.httpRequest().get(`${portalApi}/queryArticleList`, params)
  },
  // 获取文章详情
  queryArticleDetail: params => {
    return api.httpRequest().get(`${portalApi}/queryArticleDetail`, params)
  },
  // 获取留言列表
  queryMessageList: params => {
    return api.httpRequest().get(`${portalApi}/queryMessageList`, params)
  },
  // 保存留言
  saveMessage: params => {
    return api.httpRequest().post(`${portalApi}/saveMessage`, params)
  },
  // 获取友链列表
  queryFriendLinkList: params => {
    return api.httpRequest().get(`${portalApi}/queryFriendLinkList`, params)
  },
  // 获取评论列表
  queryCommentList: params => {
    return api.httpRequest().get(`${portalApi}/queryCommentList`, params)
  },
  // 保存评论
  saveComment: params => {
    return api.httpRequest().post(`${portalApi}/saveComment`, params)
  },
  // 点赞评论
  likeComment: params => {
    return api.httpRequest().post(`${portalApi}/likeComment`, params)
  },
  // 回复评论
  replyComment: params => {
    return api.httpRequest().post(`${portalApi}/replyComment`, params)
  },
  // 删除评论
  deleteComment: params => {
    return api.httpRequest().post(`${portalApi}/deleteComment`, params)
  },
  // 获取评论回复列表
  queryCommentReplyList: params => {
    return api.httpRequest().get(`${portalApi}/queryCommentReplyList`, params)
  },
  // 获取轮播的说说列表
  queryBoardTalkList: params => {
    return api.httpRequest().get(`${portalApi}/queryBoardTalkList`, params)
  },
  // 获取说说列表
  queryTalkList: params => {
    return api.httpRequest().get(`${portalApi}/queryTalkList`, params)
  },
  // 获取说说详情
  queryTalkById: params => {
    return api.httpRequest().get(`${portalApi}/queryTalkById`, params)
  },
  // 点赞说说
  likeTalk: params => {
    return api.httpRequest().post(`${portalApi}/likeTalk`, params)
  },
  // 点赞文章
  likeArticle: params => {
    return api.httpRequest().post(`${portalApi}/likeArticle`, params)
  }
}
