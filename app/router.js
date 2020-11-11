'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  //模板
  router.get('/', controller.index.default);//首页
  router.get('/resume', controller.resume.default);//我的简历

  //接口
  router.post('/login', controller.common.defaultHeader.login);//登录
  router.get('/loginStatus', jwt, controller.common.defaultHeader.loginStatus);//登录状态

};
