const baseURL = 'http://127.0.0.1:7001';//请求接口

//退出登录
function logOut() {
  $.removeCookie('loginToken', { path: '/' });
  window.location.href = "/";
}

//提示框
function message(content, type) {
  $('.header').find('.message').remove();
  $('.header').append('<div class="message alert font-size-14 py-2 px-4 alert-' + type + '" role="alert">' + content + '</div>');
  setTimeout(() => { $('.header').find('.message').css('margin-top', '10px');}, 100)
  setTimeout(() => {
    $('.header').find('.message').css('margin-top', '0px');
    setTimeout(() => { $('.header').find('.message').remove();}, 500)
  }, 3000)
}

export { baseURL, logOut, message }