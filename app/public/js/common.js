const baseURL = 'http://127.0.0.1:7001';//请求接口

//退出登录
function logOut() {
  $.removeCookie('loginToken', { path: '/' });
  window.location.href = "/";
}

function message(content, type) {
  $('.overflow-hidden').find('.message').remove();
  $('.overflow-hidden').append('<div class="message alert font-size-14 py-2 px-4 alert-' + type + '" role="alert">' + content + '</div>');
  setTimeout(() => { $('.overflow-hidden').find('.message').css('margin-top', '5px');}, 10)
  setTimeout(() => {
    $('.overflow-hidden').find('.message').css('margin-top', '0px');
    setTimeout(() => { $('.overflow-hidden').find('.message').remove();}, 400)
  }, 3000)
}

export { baseURL, logOut, message }