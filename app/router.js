'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  //模板
  router.get('/', controller.index.index);//首页
  router.get('/resume', controller.resume.index);//我的简历

  //接口
  router.post('/login', controller.header.login);//登录
  router.get('/loginStatus', jwt, controller.header.loginStatus);//登录状态

};
