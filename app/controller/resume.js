'use strict';

const Controller = require('egg').Controller;

//我的简历
class ResumeController extends Controller {
  //模板->我的简历
  async index() {
    const { ctx } = this;
    var loginToken = ctx.cookies.get('loginToken');
    var getResumeList = await ctx.service.resume.getResumeList(loginToken);//我的简历
    await ctx.render('resume/index', {
      getResumeList: getResumeList.getResumeList,//我的简历
    });
  }

  //模板->编辑简历
  async edit() {
    const { ctx } = this;
    var resumeKey = ctx.params.resumeKey;
    const getResumeContent = await ctx.service.resume.getResumeContent(resumeKey);//简历详情
    await ctx.render('resume/edit', {
      getResumeContent: JSON.stringify(getResumeContent.getResumeContent),//简历详情
    })
  }

}

module.exports = ResumeController;
