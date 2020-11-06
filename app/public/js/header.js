$(document).ready(() => {
  //公共变量
  const baseURL = 'http://192.168.0.254:7001'

  //登录状态
  if($.cookie('loginToken')) {
    $.ajax({
      url: baseURL + '/getStatus',
      dataType: 'json',
      timeout: 5000,
      headers: {
        'x-csrf-token': $.cookie('csrfToken'),
        'Authorization': 'Bearer ' + $.cookie('loginToken')
      },
      data: {},
      success: (response) => {
        console.log(response)
        //alert('登录成功')
      },
      error: (error) => {
        console.log(error)
        //alert('暂未登录')
      }
    })
  }else{
    // alert('暂未登录')
  }

  $('#loginButton').click(() => {
    const username = $('#username').val();
    const password = $('#password').val();
    console.log(username,password)
  })
})