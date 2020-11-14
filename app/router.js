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

  //接口
  router.post('/login', controller.common.login);//登录
  router.post('/loginStatus', controller.common.loginStatus);//登录状态
  router.post('/downloadResume', token, controller.resume.downloadResume);//下载简历
  router.post('/getCurrentResume', token, controller.resume.getCurrentResume);//获取当前简历所属模板
  router.post('/getCurrentResumeTemplate', token, controller.resume.getCurrentResumeTemplate);//获取当前简历所属模板
  router.post('/saveResumeBasic', token, controller.resume.saveResumeBasic);//更新内容->基本信息
  router.post('/saveResumeIntention', token, controller.resume.saveResumeIntention);//更新内容->求职意向
  router.post('/saveResumeEducationExperience', token, controller.resume.saveResumeEducationExperience);//更新内容->教育经历
  router.post('/saveResumeWorkExperience', token, controller.resume.saveResumeWorkExperience);//更新内容->工作经历
};
