import api from './custom-axios'

export default {
  // 查询文章默认封面
  queryArticleDefaultImg: params => {
    return api.httpRequest().get(`/api/articles/queryArticleDefaultImg`, params)
  },
  // 发送邮箱验证码
  sendEmailCode: params => {
    return api.httpRequest().post(`/api/email/sendCode`, params)
  },
  // 用户注册
  userRegister: params => {
    return api.httpRequest().post(`/api/users/register`, params)
  },
  // 通过邮箱修改密码
  updateUserPwdByEmail: params => {
    return api.httpRequest().post(`/api/users/updateUserPwdByEmail`, params)
  }
}