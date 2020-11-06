'use strict';

const Controller = require('egg').Controller;

//首页控制器
class IndexController extends Controller {
  //模板->首页
  async index() {
    const { ctx } = this;
    //ctx.body = ctx.state.user
    await ctx.render('index');
  }

  //接口->登录
  async login() {
    const { ctx, app } = this;
    const token = app.jwt.sign({
      code: 200
    }, app.config.jwt.secret);
    ctx.cookies.set('loginToken', token, {
      httpOnly: false,
      signed: false,
    });
    ctx.body = token;
  }

  //接口->登录状态
  async getStatus() {
    const { ctx } = this;
    ctx.body = { code: 200, msg: '登录成功', data: ctx.state.user }
  }
}

module.exports = IndexController;
