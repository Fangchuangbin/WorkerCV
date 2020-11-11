'use strict';

const Controller = require('egg').Controller;

//我的简历
class ResumeController extends Controller {
  //模板->我的简历
  async default() {
    const { ctx } = this;
    if(ctx.cookies.get('loginToken') == undefined) { ctx.redirect('/'); return false; };//登录状态
    var basicData = {
      "realname":"方创斌",
      "phone":13184845054,
      "email":"fangchuangbin@qq.com",
      "address":"广东省肇庆市"
    }
    console.log(JSON.stringify(basicData))
    await ctx.render('resume', {
      
    });
  }

}

module.exports = ResumeController;
