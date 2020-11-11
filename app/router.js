'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const token = app.middleware.token();

  //模板
  router.get('/', controller.index.index);//首页
  router.get('/resume', token, controller.resume.index);//我的简历
  router.get('/resume/:resumeKey', token, controller.resume.edit);//编辑简历

  //接口
  router.post('/login', controller.common.login);//登录
  router.get('/loginStatus', controller.common.loginStatus);//登录状态

};
