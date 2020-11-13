'use strict';

const Controller = require('egg').Controller;
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');
const { get } = require('http');

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
      resumeKey: getResumeContent.getResumeContent.resume_key,//简历详情
    })
  }

  //接口->下载简历
  async downloadResume() {
    const { ctx } = this;
    var resumeData = ctx.request.body;
    await wkhtmltopdf('<html lang="zh-cn"><body style="margin: 0;"><link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.css" rel="stylesheet"><style>p,h1,h2,h3,h4,h5,h6{margin: 0}</style>' + resumeData.resumeCode + '</body></html>', { pageSize: 'a4', encoding: 'utf-8', marginBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0 }).pipe(fs.createWriteStream('./app/public/file/' + resumeData.resumeName + '.pdf'));
    ctx.body = {
     result: {
       code: 20000,
       message: '下载成功！'
     },
     pdfUrl: 'test.pdf'
    }
  }

  //接口->获取当前简历
  async getCurrentResume() {
    const { ctx } = this;
    const currentResumeData = ctx.request.body;
    const getCurrentResume = await ctx.service.resume.getCurrentResume(currentResumeData);
    ctx.body = getCurrentResume;
  }

  //接口->获取当前简历所属模板
  async getCurrentResumeTemplate() {
    const { ctx } = this;
    const currentResumeTeamplateData = ctx.request.body;
    const getCurrentResumeTemplate = await ctx.service.resume.getCurrentResumeTemplate(currentResumeTeamplateData);
    ctx.body = getCurrentResumeTemplate;
  }

  //接口->更新内容->基本信息
  async saveResumeBasic() {
    const { ctx } = this;
    const resumeBasicData = ctx.request.body;
    const saveResumeBasic = await ctx.service.resume.saveResumeBasic(resumeBasicData);
    ctx.body = saveResumeBasic;
  }

  //接口->更新内容->求职意向
  async saveResumeIntention() {
    const { ctx } = this;
    const resumeIntentionData = ctx.request.body;
    const saveResumeIntention = await ctx.service.resume.saveResumeIntention(resumeIntentionData);
    ctx.body = saveResumeIntention;
  }

  //接口->更新内容->教育经历
  async saveResumeEducationExperience() {
    const { ctx } = this;
    var resumeEducationExperienceData = ctx.request.body;
    const saveResumeEducationExperience = await ctx.service.resume.saveResumeEducationExperience(resumeEducationExperienceData);
    ctx.body = saveResumeEducationExperience;
  }

}

module.exports = ResumeController;
