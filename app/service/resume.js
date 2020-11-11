const Service = require('egg').Service;
const moment = require('moment');

//公共变量
var success = { code: 20000, message: '请求成功' };
var fail = { code: 40000, message: '请求失败' }

class ResumeService extends Service {

  //我的简历
  async getResumeList(loginToken) {
    const { ctx, app } = this;
    const getUser = await app.mysql.get('workercv_user', { login_token: loginToken });//获取loginToken所属用户ID
    console.log(getUser)
    const getResumeList = await app.mysql.select('workercv_resume', { where: { user_id: getUser.id }, orders: [['update_time', 'desc']] });//获取该用户ID的所有简历
    if(getResumeList) {
      return { result: success, getResumeList }
    }else{
      return { result: fail }
    }
  }

  //简历详情
  async getResumeContent(resumeKey) {
    const { ctx, app } = this;
    const getResumeContent = await app.mysql.get('workercv_resume', { resume_key: resumeKey });//获取简历详情
    if(getResumeContent) {
      return { result: success, getResumeContent }
    }else{
      return { result: fail }
    }
  }

}

module.exports = ResumeService;