import { baseURL, logOut, message } from './common.js'

$(document).ready(() => {
  const resumeKey = $('.resume-key').attr('data-resume-key');//简历秘钥
  //简历模块
  var box = document.createElement('p');//简历外盒
  var basic = document.createElement('p');//基本信息
  var intention = document.createElement('p');//求职意向
  var education = document.createElement('p');//教育经历
  var work = document.createElement('p');//工作经历
  var appraise = document.createElement('p');//自我评价
  var project = document.createElement('p');//项目经历
  var certificate = document.createElement('p');//技能证书
  var association = document.createElement('p');//社团经历
  var resumeData = Object();//简历数据
  getResume();

  //获取简历数据
  function getResume() {
    $.ajax({
      url: baseURL + '/getCurrentResume',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeKey },
      success: ((response) => {
        if(response.result.code == 20000) {
          resumeData = response.getCurrentResume;
          getResumeTemplate();//渲染数据模板
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
  }
  
  //获取简历模板
  function getResumeTemplate() {
    $.ajax({
      url: baseURL + '/getCurrentResumeTemplate',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeKey },
      success: ((response) => {
        if(response.result.code == 20000) {
          box.innerHTML = response.getCurrentResumeTemplate.template_box;//简历外盒
          basic.innerHTML = response.getCurrentResumeTemplate.template_basic;//基本信息
          intention.innerHTML = response.getCurrentResumeTemplate.template_intention;//基本信息
          education.innerHTML = response.getCurrentResumeTemplate.template_education;//基本信息
          work.innerHTML = response.getCurrentResumeTemplate.template_work;//基本信息
          appraise.innerHTML = response.getCurrentResumeTemplate.template_appraise;//基本信息
          project.innerHTML = response.getCurrentResumeTemplate.template_project;//基本信息
          certificate.innerHTML = response.getCurrentResumeTemplate.template_certificate;//基本信息
          association.innerHTML = response.getCurrentResumeTemplate.template_association;//基本信息
          $('.resume-right').find('.rounded').html(box.firstChild.data);//渲染->简历外盒
          renderResumeTemplateModule();//方法->渲染->简历模块
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
    
  }

  //渲染简历模块
  function renderResumeTemplateModule() {
    //渲染简历名称
    $('.resume-name').text(resumeData.resume_name);

    const loadResumeModuleData = JSON.parse(resumeData.resume_data);
    $.each(loadResumeModuleData, function(i, n) {
      switch(n.module) {
        case 'basic':
          $('.resume-right').find('.resume-box').append(basic.firstChild.data);//基本信息
          break;
        case 'intention':
          $('.resume-right').find('.resume-box').append(intention.firstChild.data);//求职意向
          break;
        case 'education':
          $('.resume-right').find('.resume-box').append(education.firstChild.data);//教育经历
          break;
        case 'work':
          $('.resume-right').find('.resume-box').append(work.firstChild.data);//工作经历
          break;
        case 'appraise':
          $('.resume-right').find('.resume-box').append(appraise.firstChild.data);//自我评价
          break;
        case 'project':
          $('.resume-right').find('.resume-box').append(project.firstChild.data);//项目经历
          break;
        case 'certificate':
          $('.resume-right').find('.resume-box').append(certificate.firstChild.data);//技能证书
          break;
        case 'association':
          $('.resume-right').find('.resume-box').append(association.firstChild.data);//社团经历
          break;
      }
    })
    renderResume();//方法->渲染->简历数据
  }

  //渲染简历数据
  function renderResume() {
    const loadResumeData = JSON.parse(resumeData.resume_data);
    $.each(loadResumeData, function(i, n) {
      switch(n.module) {
        case 'basic'://基本信息
          $('.resume-left .basic').attr('data-order', i);//模块顺序
          //左
          $('.resume-left .basic .realname').val(n.data.realname);//姓名
          $('.resume-left .basic .phone').val(n.data.phone);//手机号
          $('.resume-left .basic .address').val(n.data.address);//地址
          $('.resume-left .basic .email').val(n.data.email);//电子邮箱
          $('.resume-left .basic .education').val(n.data.education);//最高学历
          $('.resume-left .basic .work-time').val(n.data.work_time);//工作时间
          $('.resume-left .basic .introduction').text(n.data.introduction);//自我介绍
          //右
          $('.resume-right .basic .realname').text(n.data.realname);//姓名
          $('.resume-right .basic .phone').text(n.data.phone);//手机号
          $('.resume-right .basic .email').text(n.data.email);//电子邮箱
          $('.resume-right .basic .address').text(n.data.address);//地址
          $('.resume-right .basic .education').text(n.data.education);//学历
          $('.resume-right .basic .work-time').text(n.data.work_time);//工作实践
          $('.resume-right .basic .introduction').text(n.data.introduction);//自我介绍
          $('.resume-right .basic .avatar').attr('src', n.data.avatar);//个人头像
          break;
        case 'intention'://求职意向
        $('.resume-left .intention').attr('data-order', i);//模块顺序
          //左
          $('.resume-left .intention .position').val(n.data.position);//姓名
          $('.resume-left .intention .city').val(n.data.city);//手机号
          $('.resume-left .intention .salary').val(n.data.salary);//地址
          $('.resume-left .intention .arrive-time').val(n.data.arrive_time);//电子邮箱
          //右
          $('.resume-right .intention h6').text(n.name)
          $('.resume-right .intention .position').text(n.data.position);//姓名
          $('.resume-right .intention .city').text(n.data.city);//手机号
          $('.resume-right .intention .salary').text(n.data.salary);//电子邮箱
          $('.resume-right .intention .arrive-time').text(n.data.arrive_time);//地址
          break;
        case 'education'://教育经历
          $('.resume-left .education').attr('data-order', i);//模块顺序
          const educationData = n.data;
          var educationBox = '';
          $.each(educationData, function(i, n) {//左
            educationBox += '<div class="education-box-main">';
            educationBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + Number(i + 1) + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
            educationBox += '<p class="mb-1"><label for="school" class="font-size-14">学校</label><input type="text" class="form-control form-control-sm school" autocomplete="off" value="' + n.school + '"></p>';
            educationBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
            educationBox += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value="' + n.city + '"></p>';
            educationBox += '<p class="mb-1"><label for="department" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm department" autocomplete="off" value="' + n.department + '"></p>';
            educationBox += '<p class="mb-1"><label for="level" class="font-size-14">层次</label><input type="text" class="form-control form-control-sm level" autocomplete="off" value="' + n.level + '"></p>';
            educationBox += '<p class="mb-1"><label for="major" class="font-size-14">专业</label><input type="text" class="form-control form-control-sm major" autocomplete="off" value="' + n.major + '"></p>';
            educationBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
            educationBox += '</div>';
          });
          $('.resume-left .education-box').html(educationBox);
          educationBox = '';
          $.each(educationData, function(i, n) {//右
            educationBox += '<div class="education-box-main">';
            educationBox += '<div style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
            educationBox += '<p style="width: 50%;float: left;"><span class="school" style="font-weight: bold;">' + n.school + '</span></p>';
            educationBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
            educationBox += '</div>';
            educationBox += '<div style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
            educationBox += '<p style="width: 50%;float: left;"><span class="department">' + n.department + ' ' + n.level + ' ' + n.major + '</span></p>';
            educationBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
            educationBox += '</div>';
            educationBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
            educationBox += '</div>';
          });
          $('.resume-right .education-box').html(educationBox);
          break;
        case 'work'://工作经历
        $('.resume-left .work').attr('data-order', i);//模块顺序
          const workData = n.data;
          var workBox = '';
          $.each(workData, function(i, n) {//左
            workBox += '<div class="work-box-main">';
            workBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + Number(i + 1) + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
            workBox += '<p class="mb-1"><label for="company" class="font-size-14">公司</label><input type="text" class="form-control form-control-sm company" autocomplete="off" value="' + n.company + '"></p>';
            workBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
            workBox += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value="' + n.position + '"></p>';
            workBox += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value="' + n.city + '"></p>';
            workBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
            workBox += '</div>';
          });
          $('.resume-left .work-box').html(workBox);
          workBox = '';
          $.each(workData, function(i, n) {//右
            workBox += '<div class="education-box-main">';
            workBox += '<div style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
            workBox += '<p style="width: 50%;float: left;"><span class="school" style="font-weight: bold;">' + n.company + '</span></p>';
            workBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
            workBox += '</div>';
            workBox += '<div style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
            workBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
            workBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
            workBox += '</div>';
            workBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
            workBox += '</div>';
          });
          $('.resume-right .work-box').html(workBox);
          break;
      }
    })
    //关闭效果
    $('.waiting').remove();

    

    //教育经历->添加模块
    var educationOrder = 1;//教育经历->序号
    $('.resume-left').find('.education-box-main').each(function(i) { resumeEducationExperienceListBoxCount += Number(i) });
    $('.add-button').click(() => {
      educationOrder += 1;
      var newEducationBoxMain = '';
      newEducationBoxMain += '<div class="education-box-main">';
      newEducationBoxMain += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + resumeEducationExperienceListBoxCount + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="school" class="font-size-14">学校</label><input type="text" class="form-control form-control-sm school" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="department" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm department" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="level" class="font-size-14">层次</label><input type="text" class="form-control form-control-sm level" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="major" class="font-size-14">专业</label><input type="text" class="form-control form-control-sm major" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      newEducationBoxMain += '</div>';
      $('.resume-left').find('.education-box').append(newEducationBoxMain)
    })
    
    //教育经历->删除模块
    $(document).on('click', '.remove-button', function() {
      var removeConfirm = confirm('确定删除当前模块？');
      if(removeConfirm) {
        $(this).parent().parent().remove();
      }
    })
    return false;
    //保存内容->工作经历
    $('.resume-work-experience-save').click(() => {
      //合并对象->数组
      var workExperienceData = [];//教育经历->全部数组
      $('.resume-left').find('.resume-work-experience-list-box').each(function(i) {
        var workExperienceOneData = {};//教育经历->单个对象
        workExperienceOneData.company = $(this).find('.company').val();//公司
        workExperienceOneData.time = $(this).find('.time').val();//时间
        workExperienceOneData.city = $(this).find('.city').val();//城市
        workExperienceOneData.position = $(this).find('.position').val();//职位
        workExperienceOneData.content = $(this).find('.content').val();//内容
        workExperienceData.push(workExperienceOneData);
      })
      //发送数据
      $.ajax({
        url: baseURL + '/saveResumeWorkExperience',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, workExperienceData },
        success: ((response) => { $('.resume-save-tip').addClass('text-dark'); $('.resume-save-tip').text('已保存'); setTimeout( function() { $('.resume-save-tip').text(''); }, 3000 ); message('已保存', 'success'); }),
        error: ((error) => { $('.resume-save-tip').addClass('text-danger'); $('.resume-save-tip').text('保存失败'); setTimeout( function() { $('.resume-save-tip').text('');  return false; }, 5000 ); message('保存失败', 'success'); return false; })
      })
      //渲染数据
      var workExperienceListBox = '';
      $.each(workExperienceData, function(i, n) {
        workExperienceListBox += '<div class="resume-work-experience-list-box">';
        workExperienceListBox += '<div class="company-time" style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
        workExperienceListBox += '<p style="width: 50%;float: left;"><span class="company" style="font-weight: bold;">' + n.company + '</span></p>';
        workExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
        workExperienceListBox += '</div>';
        workExperienceListBox += '<div class="position-city" style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
        workExperienceListBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
        workExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
        workExperienceListBox += '</div>';
        workExperienceListBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
        workExperienceListBox += '</div>';
      });
      $('.resume-right .resume-work-experience-list').html(workExperienceListBox);
    })
  
    //工作经历->添加模块
    var resumeWorkExperienceListBoxCount = 1;//工作经历->序号
    $('.resume-left').find('.resume-work-experience-list-box').each(function(i) { resumeWorkExperienceListBoxCount += Number(i) });
    $('.resume-work-experience-add').click(() => {
      resumeWorkExperienceListBoxCount += 1;
      var resumeWorkExperienceListNewBox = '';
      resumeWorkExperienceListNewBox += '<div class="resume-work-experience-list-box">';
      resumeWorkExperienceListNewBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + resumeWorkExperienceListBoxCount + '<a href="javascript:void(0);" class="resume-work-experience-list-box-remove float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      resumeWorkExperienceListNewBox += '<p class="mb-1"><label for="company" class="font-size-14">公司</label><input type="text" class="form-control form-control-sm company" autocomplete="off" value=""></p>';
      resumeWorkExperienceListNewBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      resumeWorkExperienceListNewBox += '<p class="mb-1"><label for="position" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value=""></p>';
      resumeWorkExperienceListNewBox += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value=""></p>';
      resumeWorkExperienceListNewBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      resumeWorkExperienceListNewBox += '</div>';
      $('.resume-left').find('.resume-work-experience-list').append(resumeWorkExperienceListNewBox)
    })
  
    //工作经历->删除模块
    $(document).on('click', '.resume-work-experience-list-box-remove', function() {
      var removeConfirm = confirm('确定删除当前模块？');
      if(removeConfirm) {
        $(this).parent().parent().remove();
      }
    })

    //关闭效果
    $('.waiting').remove();
  };

  //保存内容
  $('.save-button').click(function() {
    var saveData;//需要保存的内容
    var dataOrder;//模块顺序
    if($(this).parents('.basic').attr('data-order')) { //基本信息
      dataOrder = $(this).parents('.basic').attr('data-order');
      const realname = $('.resume-left .basic .realname').val();//姓名
      const phone = $('.resume-left .basic .phone').val();//手机
      const address = $('.resume-left .basic .address').val();//地址
      const email = $('.resume-left .basic .email').val();//电子邮箱
      const education = $('.resume-left .basic .education').val();//学历
      const work_time = $('.resume-left .basic .work-time').val();//工作时间
      const introduction = $('.resume-left .basic .introduction').text();//自我评价
      const avatar = 'http://image-workercv.test.upcdn.net/009862297f62849aefef6a6687a71c7d.jpg';//个人头像
      saveData = { realname, phone, address, email, education, work_time, introduction, avatar }
    }else if($(this).parents('.intention').attr('data-order')) { //求职意向
      dataOrder = $(this).parents('.intention').attr('data-order');
      const position = $('.resume-left .intention .position').val();//职位
      const city = $('.resume-left .intention .city').val();//城市
      const salary = $('.resume-left .intention .salary').val();//薪资
      const arrive_time = $('.resume-left .intention .arrive-time').val();//到岗时间
      saveData = { position, city, salary, arrive_time }
    }else if($(this).parents('.education').attr('data-order')) {
      dataOrder = $(this).parents('.education').attr('data-order');
      var educationArray = [];//教育经历->全部数组
      $('.resume-left').find('.education-box-main').each(function(i) {
        var educationObject = {};//教育经历->单个对象
        educationObject.school = $(this).find('.school').val();//学校
        educationObject.time = $(this).find('.time').val();//时间
        educationObject.city = $(this).find('.city').val();//城市
        educationObject.department = $(this).find('.department').val();//院系
        educationObject.level = $(this).find('.level').val();//层次
        educationObject.major = $(this).find('.major').val();//专业
        educationObject.content = $(this).find('.content').val();//内容
        educationArray.push(educationObject);
        saveData = educationArray;
      })
    }

    var saveResumeData = resumeData.resume_data;//老数据
    saveResumeData = JSON.parse(saveResumeData);
    saveResumeData[Number(dataOrder)].data = saveData;//插入新数据
    resumeData.resume_data = saveResumeData;//合并数据
    $.ajax({
      url: baseURL + '/saveResume',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeKey, saveResumeData },
      success: ((response) => { $('.resume-save-tip').addClass('text-dark'); getResume(); $('.resume-save-tip').text('已保存'); setTimeout( function() { $('.resume-save-tip').text(''); }, 3000 ); message('已保存', 'success'); }),
      error: ((error) => { $('.resume-save-tip').addClass('text-danger'); $('.resume-save-tip').text('保存失败'); setTimeout( function() { $('.resume-save-tip').text(''); }, 5000 ); message('保存失败', 'danger'); return false; })
    })
  })

  //退出登录
  $('#logOut').click(() => {
    logOut();
  });

  //下载简历
  $('.download-resume').click(() => {
    $.ajax({
      url: baseURL + '/downloadResume',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeCode: $('.resume-right .rounded').html() },
      success: ((response) => { message('下载成功', 'success') }),
      error: ((error) => { console.log(error) })
    })
  })

})