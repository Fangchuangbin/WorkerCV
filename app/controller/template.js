'use strict';

const Controller = require('egg').Controller;
//简历模板
class TemplateController extends Controller {

  //简历模板->首页
  async index() {
    const { ctx } = this;
    await ctx.render('template/index', {

    });
  }

}

module.exports = TemplateController;