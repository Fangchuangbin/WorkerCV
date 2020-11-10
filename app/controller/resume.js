'use strict';

const Controller = require('egg').Controller;

//我的简历控制器
class ResumeController extends Controller {
  //模板->我的简历
  async index() {
    const { ctx } = this;
    if(ctx.cookies.get('loginToken') == undefined) { ctx.redirect('/'); return false; };//登录状态

    await ctx.render('resume/index', {

    });
  }

}

module.exports = ResumeController;
