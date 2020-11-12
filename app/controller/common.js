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

    //公共变量
    var success = { code: 20000, message: '请求成功' };
    var fail = { code: 40000, message: '请求失败' }

    const { ctx } = this;
    var loginToken = ctx.cookies.get('loginToken');
    
    if(loginToken == undefined) {
      ctx.body = { result: fail }
    }else{
      const verifyLoginToken = await ctx.service.common.verifyLoginToken(loginToken);//验证loginToken
        if(verifyLoginToken.result.code == 20000) {
          ctx.body = { result: success }
        }else{
          ctx.body = { result: fail }
      }
    }
    
  }


}

module.exports = CommonController;
