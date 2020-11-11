$(document).ready(() => {

  //退出登录
  $('#logOut').click(() => {
    $.removeCookie('loginToken');
    window.location.href = "/";
  });

})