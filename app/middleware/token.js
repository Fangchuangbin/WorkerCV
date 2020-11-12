module.exports = options => {

  return async function token(ctx, next) {
    
    //判断是否登录
    const loginToken = ctx.cookies.get('loginToken');
    if(loginToken == undefined) {
      ctx.redirect('/');
    }else{
      const verifyLoginToken = await ctx.service.common.verifyLoginToken(loginToken);//验证loginToken
      if(verifyLoginToken.result.code == 20000) {
        await next();
      }else{
        ctx.redirect('/');
      }
    }
  }

}