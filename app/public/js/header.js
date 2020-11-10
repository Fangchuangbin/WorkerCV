$(document).ready(() => {

  //公共变量
  const baseURL = 'http://192.168.0.5:7001'


  //登录状态
  if($.cookie('loginToken')) {
    $.ajax({
      url: baseURL + '/loginStatus',
      type: 'get',
      dataType: 'json',
      timeout: 5000,
      headers: {
        'x-csrf-token': $.cookie('csrfToken'),
        'Authorization': 'Bearer ' + $.cookie('loginToken')
      },
      success: (response) => {
        if(response.code == 200) {
          $('.login-modal-button').find('svg').remove(); $('.login-modal-button').text('个人中心');
          $('.login-modal-button').attr('data-target', '');
          $('.login-modal-button').attr('href', '/resume');
        }else{
          $('.login-modal-button').attr('data-toggle', 'modal');
        }
      },
      error: (error) => {
        $('.login-modal-button').attr('data-toggle', 'modal');
      }
    })
  }else{
    $('.login-modal-button').attr('data-toggle', 'modal');
  }

  //登录
  $('#loginButton').click(() => {
    const username = $('#username').val();
    const password = $('#password').val();
    if(username && password) {
      $.ajax({
        url: baseURL + '/login',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { username,password },
        success: function(response) {
          window.location.href = "/resume";
        },
        error: function(error) {
          alert('账号或密码错误！')
        }
      })
    }
  })
})