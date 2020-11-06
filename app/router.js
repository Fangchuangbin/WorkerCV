'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  //模板
  router.get('/', controller.index.index);

  //接口
  router.get('/login', controller.index.login);
  router.get('/getStatus', jwt, controller.index.getStatus);

};
