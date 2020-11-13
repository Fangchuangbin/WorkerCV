import { baseURL, logOut } from './common.js'

$(document).ready(() => {
  //退出登录
  $('#logOut').click(() => {
    logOut();
  });

  //用户中心->分类高亮
  $('.user-left li a').each(function() {
    if($(this).attr('href') == window.location.pathname){
      $(this).addClass('font-weight-bold');$(this).addClass('text-dark');
    }
  })

  //用户中心->我的简历->简历数量
  var resumeListCount = 1;
  $('.resume-list').find('a').each(function(i) {
    resumeListCount += Number(i);
  })
  $('.resume-list-count').text(resumeListCount);

})