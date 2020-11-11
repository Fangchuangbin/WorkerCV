'use strict';

const Controller = require('egg').Controller;

//首页
class IndexController extends Controller {
  //模板->首页
  async default() {
    const { ctx } = this;
    await ctx.render('index', {
    });
  }

}

module.exports = IndexController;
