'use strict';

const Controller = require('egg').Controller;
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

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

  //接口->下载简历
  async downloadResume() {
    const { ctx } = this;
    var resumeData = ctx.request.body;
    await wkhtmltopdf('<html lang="zh-cn"><body style="margin: 0;"><style>p,h1,h2,h3,h4,h5,h6{margin: 0}</style><link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.css" rel="stylesheet">' + resumeData.resumeCode + '</body></html>', { pageSize: 'a4', encoding: 'utf-8', marginBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0 }).pipe(fs.createWriteStream('./app/public/file/' + resumeData.resumeName + '.pdf'));
    ctx.body = {
     result: {
       code: 20000,
       message: '下载成功！'
     },
     pdfUrl: 'test.pdf'
    }
  }

}

module.exports = ResumeController;
