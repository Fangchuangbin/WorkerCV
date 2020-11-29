import { baseURL, logOut, message } from './common.js'

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
  $('.resume-list').find('.resume-item').each(function(i) {
    resumeListCount = Number(i + 1);
  })
  $('.resume-list-count').text(resumeListCount);

  //创建简历->打开面板
  $('.open-create-resume-button').click(() => {
    openCreateResumeButton();
    function openCreateResumeButton() {
      $('.create-resume-name').val('我的简历_' + Date.parse(new Date()));
      //创建简历->选择模板
      $(document).on('click', '.create-resume-template-list li', function() {
        $(this).addClass('current').siblings().removeClass('current');
      })
      //创建简历按钮
      $('.create-resume-button').click(() => {
        const resumeName = $('.create-resume-name').val();
        const realname = $('.create-resume-realname').val();
        const phone = $('.create-resume-phone').val();
        const email = $('.create-resume-email').val();
        const introduce = $('.create-resume-introduce').val();
        const templateKey = $('.create-resume-template-list').find('.current').attr('data-template-key');
        const userId = $('.user-resume').attr('data-user-id');
        console.log(userId,templateKey);
        if(resumeName && realname && phone && email && introduce && userId && templateKey) {
          const newResumeData = {"resumeName": resumeName, "realname": realname, "phone": phone, "email": email, "introduce": introduce }
          $.ajax({
            url: baseURL + '/createResume',
            type: 'post',
            dataType: 'json',
            timeout: 5000,
            headers: { 'x-csrf-token': $.cookie('csrfToken') },
            data: { userId, templateKey, newResumeData },
            success: (response) => {
              if(response.result.code == 20000) {
                message('新建成功', 'success');
                setTimeout(() => {
                  window.location.href = '/resume/' + response.resume_key
                }, 500)
              }
              console.log(response)
            },
            error: (error) => {
              message('未知错误，请重试', 'danger');
              console.log(error)
            }
          })
        }else{ message('请输入完整信息', 'danger'); }
      })
    }
  })

  //简历跳转
  $(document).on('click', '.resume-item', function() {
    document.location.href = '/resume/' + $(this).parents('a').attr('data-resume-key');
  })

  //删除简历
  $(document).on('click', '.delete-button', function() {
    var deleteConfirm = confirm('确定删除该简历？');
    if(deleteConfirm) {
      const resumeKey = $(this).parents('a').attr('data-resume-key');
      $.ajax({
        url: baseURL + '/deleteResume',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey },
        success: (response) => {
          console.log(response)
          message('删除成功','success');
          setTimeout(() => {
            document.location.reload();
          }, 500);
        },
        error: (error) => {
          message('删除失败，请重试','danger');
        }
      })
    }
  })
})