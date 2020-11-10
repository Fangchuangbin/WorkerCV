'use strict';

const Controller = require('egg').Controller;

//首页控制器
class HeaderController extends Controller {

  //接口->登录
  async login() {
    const { ctx, app } = this;
    var loginData = ctx.request.body;
    var login = await ctx.service.header.login(loginData);
    if(login.result.code == 20000) {
      const token = app.jwt.sign({
        code: 200
      }, app.config.jwt.secret);
      ctx.cookies.set('loginToken', token, {
        httpOnly: false,
        signed: true,
      });
      ctx.body = { token, login };
    }else{
      ctx.body = login
    }
  }

  //接口->登录状态
  async loginStatus() {
    const { ctx } = this;
    ctx.body = ctx.state.user;
  }


}

module.exports = HeaderController;
