module.exports = options => {

  return async function token(ctx, next) {
    
    //判断是否登录
    var loginToken = ctx.cookies.get('loginToken');
    if(loginToken == undefined) {
      ctx.redirect('/');
    }else{
      await next();
    }
  }

}