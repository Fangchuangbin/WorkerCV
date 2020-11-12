$(document).ready(() => {

  //退出登录
  $('#logOut').click(() => {
    $.removeCookie('loginToken');
    window.location.href = "/";
  });

  //用户中心->分类高亮
  $('.user-left li a').each(function() {
    if($(this).attr('href') == window.location.pathname){
      $(this).addClass('font-weight-bold');$(this).addClass('text-dark');
    }
  })

})