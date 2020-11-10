'use strict';

const Controller = require('egg').Controller;

//首页控制器
class IndexController extends Controller {
  //模板->首页
  async index() {
    const { ctx } = this;
    await ctx.render('index/index', {

    });
  }

}

module.exports = IndexController;
