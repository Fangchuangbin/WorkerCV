const Service = require('egg').Service;
const crypto = require('crypto');

//公共变量
var success = { code: 20000, message: '请求成功' };
var fail = { code: 40000, message: '请求失败' }

class DefaultHeaderService extends Service {

  //用户登录
  async login(loginData) {
    const { ctx, app } = this;
    loginData.password = crypto.createHash('md5').update(loginData.password).digest('hex');
    var login = await app.mysql.get('workercv_user', { phone: loginData.username, password: loginData.password });
    if(login) {
      return { result: success, login };
    }else{
      return { result: fail };
    }
  }

}

module.exports = DefaultHeaderService;