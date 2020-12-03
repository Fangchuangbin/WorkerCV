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
  router.get('/collect', token, controller.collect.index);//我的收藏
  router.get('/recommend', token, controller.recommend.index);//推荐模板
  //接口
  router.post('/login', controller.common.login);//登录
  router.post('/loginStatus', controller.common.loginStatus);//登录状态
  router.post('/downloadResume', token, controller.resume.downloadResume);//下载简历
  router.post('/getCurrentResume', token, controller.resume.getCurrentResume);//获取当前简历所属模板
  router.post('/getCurrentResumeTemplate', token, controller.resume.getCurrentResumeTemplate);//获取当前简历所属模板
  router.post('/saveCurrentResume', token, controller.resume.saveCurrentResume);//保存内容
  router.post('/changeCurrentResumeName', token, controller.resume.changeCurrentResumeName);//修改简历名称
  router.post('/changeCurrentResumeConfig', token, controller.resume.changeCurrentResumeConfig);//修改简历配置
  router.post('/createResume', token, controller.resume.createResume);//创建简历
  router.post('/deleteResume', token, controller.resume.deleteResume);//删除简历
};
