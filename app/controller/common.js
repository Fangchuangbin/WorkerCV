'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

class CommonController extends Controller {

  //接口->登录
  async login() {
    const { ctx, app } = this;
    var loginData = ctx.request.body;
    var login = await ctx.service.common.login(loginData);
    if(login.result.code == 20000) {
      const token = Buffer.from(crypto.createHash('sha1').update(loginData.username).digest('hex') + new Date().getTime()).toString('base64');//生成token
      await ctx.service.common.loginToken(token, loginData);//保存loginToken
      ctx.cookies.set('loginToken', token, { httpOnly: false, signed: true, maxAge: 259200000 });//3天
      ctx.body = login;
    }else{
      ctx.body = login;
    }
  }

  //接口->登录状态
  async loginStatus() {
    const { ctx } = this;
    var loginToken = ctx.cookies.get('loginToken');
    if(loginToken == undefined) {
      ctx.body = { code: 40000 }
    }else{
      ctx.body = { code: 20000 }
    }
    
  }


}

module.exports = CommonController;
