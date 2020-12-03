'use strict';

const Controller = require('egg').Controller;
//推荐模板
class RecommendController extends Controller {

  //模板->首页
  async index() {
    const { ctx } = this;
    await ctx.render('recommend/index', {

    });
  }

}

module.exports = RecommendController;