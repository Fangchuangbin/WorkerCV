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
    const getResumeList = await app.mysql.select('workercv_resume', { where: { user_id: getUser.id }, orders: [['update_time', 'desc']] });//获取该用户ID的所有简历
    if(getResumeList) {
      return { result: success, getResumeList }
    }else{
      return { result: fail }
    }
  }

  //编辑简历
  async getResumeContent(resumeKey) {
    const { ctx, app } = this;
    const getResumeContent = await app.mysql.get('workercv_resume', { resume_key: resumeKey });//获取简历详情
    if(getResumeContent) {
      return { result: success, getResumeContent }
    }else{
      return { result: fail }
    }
  }

  //获取当前简历
  async getCurrentResume(currentResumeData) {
    const { ctx, app } = this;
    const getCurrentResume = await app.mysql.get('workercv_resume', { resume_key: currentResumeData.resumeKey });//获取loginToken的所属简历
    if(getCurrentResume) {
      return { result: success, getCurrentResume }
    }else{ return { result: fail } }
  }

  //获取当前简历所属模板
  async getCurrentResumeTemplate(currentResumeTemplateData) {
    const { ctx, app } = this;
    const getCurrentResume = await app.mysql.get('workercv_resume', { resume_key: currentResumeTemplateData.resumeKey });//获取loginToken的所属简历
    if(getCurrentResume) {
      const getCurrentResumeTemplate = await app.mysql.get('workercv_template', { template_key: getCurrentResume.template_key })//获取当前简历所属的模板
      if(getCurrentResumeTemplate) { return { result: success, getCurrentResumeTemplate }
      }else{ return { result: fail } }
    }else{ return { result: fail } }
  }
  
  //更新内容->基本信息
  async saveResume(resumeData) {
    const { ctx, app } = this;
    const saveResume = await app.mysql.update('workercv_resume', { resume_data: JSON.stringify(resumeData.saveResumeData) }, { where: { resume_key: resumeData.resumeKey } })
    if(saveResume.affectedRows === 1) {
      return { result: success }
    }else{
      return { result: fail }
    }
  }

}

module.exports = ResumeService;