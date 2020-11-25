const Service = require('egg').Service;
const crypto = require('crypto');

//公共变量
var success = { code: 20000, message: '请求成功' };
var fail = { code: 40000, message: '请求失败' }

class CommonService extends Service {

  //用户登录
  async login(loginData) {
    const { ctx, app } = this;
    const emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const username = loginData.username;
    const password = crypto.createHash('md5').update(loginData.password).digest('hex');
    var login;
    if(emailRule.test(username)) {//判断账号类型
      login = await app.mysql.get('workercv_user', { email: username, password: password });
    }else{
      login = await app.mysql.get('workercv_user', { phone: username, password: password });
    }
    if(login) {
      return { result: success, login };
    }else{
      return { result: fail };
    }
  }

  //登录成功->保存loginToken
  async loginToken(token, loginData) {
    const { ctx, app } = this;
    const emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const username = loginData.username;
    if(emailRule.test(username)) {//判断账号类型
      await app.mysql.update('workercv_user', { login_token: token }, { where: { email: username } });
    }else{
      await app.mysql.update('workercv_user', { login_token: token }, { where: { phone: username } });
    }
  }

  //验证loginToken
  async verifyLoginToken(loginToken) {
    const { ctx, app } = this;
    var verifyLoginToken = await app.mysql.get('workercv_user', { login_token: loginToken });
    if(verifyLoginToken) {
      return { result: success, verifyLoginToken }
    }else{
      return { result: fail }
    }
  }

}

module.exports = CommonService;