'use strict';

const Controller = require('egg').Controller;
//我的简历
class CollectController extends Controller {

  //模板->首页
  async index() {
    const { ctx } = this;
    await ctx.render('collect/index', {

    });
  }

}

module.exports = CollectController;