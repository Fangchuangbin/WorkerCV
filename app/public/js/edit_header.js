import { baseURL, logOut, message } from './common.js'

$(document).ready(() => {

  const resumeKey = $('.resume-key').attr('data-resume-key');//简历秘钥
  
  //获取当前简历
  var resumeData = Object();
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
        console.log(resumeData)
        loadResumeTemplate();//渲染数据->简历
      }else{ message('未知错误，请刷新网页！', 'danger'); }
    }),
    error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
  })

  //渲染模板数据
  function loadResumeTemplate() {
    //获取当前简历所属模板
    $.ajax({
      url: baseURL + '/getCurrentResumeTemplate',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeKey },
      success: ((response) => {
        if(response.result.code == 20000) {
          var codeToHtml = document.createElement('p');
          codeToHtml.innerHTML = response.getCurrentResumeTemplate.template_code;//HTML反转义
          $('.resume-right').find('.rounded').html(codeToHtml.firstChild.data);//渲染简历模板
          loadResume();//渲染数据->简历模板
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
  }

  //渲染简历数据
  function loadResume() {
    //渲染数据->简历名称
    $('.resume-name').text(resumeData.resume_name);

    //渲染数据->基本信息
    const resumeDataBasic = JSON.parse(resumeData.basic);
    const basic = JSON.parse(resumeData.resume_data);
    console.log(basic);
    //左
    $('.resume-left .resume-basic .realname').val(resumeDataBasic.realname);//姓名
    $('.resume-left .resume-basic .phone').val(resumeDataBasic.phone);//手机号
    $('.resume-left .resume-basic .address').val(resumeDataBasic.address);//地址
    $('.resume-left .resume-basic .email').val(resumeDataBasic.email);//电子邮箱
    $('.resume-left .resume-basic .education').val(resumeDataBasic.education);//最高学历
    $('.resume-left .resume-basic .work-time').val(resumeDataBasic.work_time);//工作时间
    $('.resume-left .resume-basic .introduction').text(resumeDataBasic.introduction);//自我介绍
    //右
    $('.resume-right .resume-basic .realname').text(resumeDataBasic.realname);//姓名
    $('.resume-right .resume-basic .phone-email-address .phone').text(resumeDataBasic.phone);//手机号
    $('.resume-right .resume-basic .phone-email-address .email').text(resumeDataBasic.email);//电子邮箱
    $('.resume-right .resume-basic .phone-email-address .address').text(resumeDataBasic.address);//地址
    $('.resume-right .resume-basic .education-work-time .education').text(resumeDataBasic.education);//学历
    $('.resume-right .resume-basic .education-work-time .work-time').text(resumeDataBasic.work_time);//工作实践
    $('.resume-right .resume-basic .introduction').text(resumeDataBasic.introduction);//自我介绍
    $('.resume-right .resume-basic .avatar').attr('src', resumeDataBasic.avatar);//个人头像

    //渲染数据->求职意向
    const resumeDataIntention = JSON.parse(resumeData.intention);
    //左
    $('.resume-left .resume-intention .position').val(resumeDataIntention.position);//职位
    $('.resume-left .resume-intention .city').val(resumeDataIntention.city);//城市
    $('.resume-left .resume-intention .salary').val(resumeDataIntention.salary);//薪资
    $('.resume-left .resume-intention .arrive-time').val(resumeDataIntention.arrive_time);//到岗时间
    //右
    $('.resume-right .resume-intention .position').text(resumeDataIntention.position);//职位
    $('.resume-right .resume-intention .city').text(resumeDataIntention.city);//城市
    $('.resume-right .resume-intention .salary').text(resumeDataIntention.salary);//薪资
    $('.resume-right .resume-intention .arrive-time').text(resumeDataIntention.arrive_time);//到岗时间

    //渲染数据->教育经历
    const resumeDataEducationExperience = JSON.parse(resumeData.education_experience);
    var resumeDataEducationExperienceListBox = '';
    $.each(resumeDataEducationExperience, function(i, n) {//左
      resumeDataEducationExperienceListBox += '<div class="resume-education-experience-list-box">';
      resumeDataEducationExperienceListBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + Number(i + 1) + '<a href="javascript:void(0);" class="resume-education-experience-list-box-remove float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="school" class="font-size-14">学校</label><input type="text" class="form-control form-control-sm school" autocomplete="off" value="' + n.school + '"></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value="' + n.city + '"></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="department" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm department" autocomplete="off" value="' + n.department + '"></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="level" class="font-size-14">层次</label><input type="text" class="form-control form-control-sm level" autocomplete="off" value="' + n.level + '"></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="major" class="font-size-14">专业</label><input type="text" class="form-control form-control-sm major" autocomplete="off" value="' + n.major + '"></p>';
      resumeDataEducationExperienceListBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
      resumeDataEducationExperienceListBox += '</div>';
    });
    $('.resume-left .resume-education-experience-list').html(resumeDataEducationExperienceListBox);
    resumeDataEducationExperienceListBox = '';
    $.each(resumeDataEducationExperience, function(i, n) {//右
      resumeDataEducationExperienceListBox += '<div class="resume-education-experience-list-box">';
      resumeDataEducationExperienceListBox += '<div class="school-time" style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
      resumeDataEducationExperienceListBox += '<p style="width: 50%;float: left;"><span class="school" style="font-weight: bold;">' + n.school + '</span></p>';
      resumeDataEducationExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
      resumeDataEducationExperienceListBox += '</div>';
      resumeDataEducationExperienceListBox += '<div class="department-city" style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
      resumeDataEducationExperienceListBox += '<p style="width: 50%;float: left;"><span class="department">' + n.department + ' ' + n.level + ' ' + n.major + '</span></p>';
      resumeDataEducationExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
      resumeDataEducationExperienceListBox += '</div>';
      resumeDataEducationExperienceListBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
      resumeDataEducationExperienceListBox += '</div>';
    });
    $('.resume-right .resume-education-experience-list').html(resumeDataEducationExperienceListBox);

    //渲染数据->工作经历
    const resumeDataWorkExperience = JSON.parse(resumeData.work_experience);
    var resumeDataWorkExperienceListBox = '';
    $.each(resumeDataWorkExperience, function(i, n) {//左
      resumeDataWorkExperienceListBox += '<div class="resume-work-experience-list-box">';
      resumeDataWorkExperienceListBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + Number(i + 1) + '<a href="javascript:void(0);" class="resume-work-experience-list-box-remove float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      resumeDataWorkExperienceListBox += '<p class="mb-1"><label for="company" class="font-size-14">公司</label><input type="text" class="form-control form-control-sm company" autocomplete="off" value="' + n.company + '"></p>';
      resumeDataWorkExperienceListBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
      resumeDataWorkExperienceListBox += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value="' + n.position + '"></p>';
      resumeDataWorkExperienceListBox += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value="' + n.city + '"></p>';
      resumeDataWorkExperienceListBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
      resumeDataWorkExperienceListBox += '</div>';
    });
    $('.resume-left .resume-work-experience-list').html(resumeDataWorkExperienceListBox);
    resumeDataWorkExperienceListBox = '';
    $.each(resumeDataWorkExperience, function(i, n) {//右
      resumeDataWorkExperienceListBox += '<div class="resume-work-experience-list-box">';
      resumeDataWorkExperienceListBox += '<div class="company-time" style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
      resumeDataWorkExperienceListBox += '<p style="width: 50%;float: left;"><span class="company" style="font-weight: bold;">' + n.company + '</span></p>';
      resumeDataWorkExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
      resumeDataWorkExperienceListBox += '</div>';
      resumeDataWorkExperienceListBox += '<div class="position-city" style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
      resumeDataWorkExperienceListBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
      resumeDataWorkExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
      resumeDataWorkExperienceListBox += '</div>';
      resumeDataWorkExperienceListBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
      resumeDataWorkExperienceListBox += '</div>';
    });
    $('.resume-right .resume-work-experience-list').html(resumeDataWorkExperienceListBox);

    //保存内容->基本内容
    $('.resume-basic-save').click(() => {
      const basicRealname = $('.resume-left .resume-basic .realname').val();//姓名
      const basicPhone = $('.resume-left .resume-basic .phone').val();//手机
      const basicAddress = $('.resume-left .resume-basic .address').val();//地址
      const basicEmail = $('.resume-left .resume-basic .email').val();//电子邮箱
      const basicEducation = $('.resume-left .resume-basic .education').val();//学历
      const basicWorkTime = $('.resume-left .resume-basic .work-time').val();//工作时间
      const basicIntroduction = $('.resume-left .resume-basic .introduction').val();//自我评价
      const basicAvatar = 'http://image-workercv.test.upcdn.net/009862297f62849aefef6a6687a71c7d.jpg';//个人头像
      //发送数据
      const basicData = { realname: basicRealname, phone: basicPhone, address: basicAddress, email: basicEmail, education: basicEducation, work_time: basicWorkTime, introduction: basicIntroduction, avatar: basicAvatar }
      $.ajax({
        url: baseURL + '/saveResumeBasic',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, basicData },
        success: ((response) => { $('.resume-save-tip').addClass('text-dark'); $('.resume-save-tip').text('已保存'); setTimeout( function() { $('.resume-save-tip').text(''); }, 3000 ); message('已保存', 'success'); }),
        error: ((error) => { $('.resume-save-tip').addClass('text-danger'); $('.resume-save-tip').text('保存失败'); setTimeout( function() { $('.resume-save-tip').text(''); }, 5000 ); message('保存失败', 'danger'); return false; })
      })
      //渲染数据
      $('.resume-right .resume-basic .realname').text(basicRealname);//姓名
      $('.resume-right .resume-basic .phone').text(basicPhone);//手机
      $('.resume-right .resume-basic .address').text(basicAddress);//地址
      $('.resume-right .resume-basic .email').text(basicEmail);//电子邮箱
      $('.resume-right .resume-basic .education').text(basicEducation);//学历
      $('.resume-right .resume-basic .work-time').text(basicWorkTime);//工作时间
      $('.resume-right .resume-basic .introduction').text(basicIntroduction);//工作时间
      $('.resume-right .resume-basic .avatar').attr('src', basicAvatar);//个人头像
    })

    //保存内容->求职意向
    $('.resume-intention-save').click(() => {
      const basicPosition = $('.resume-left .resume-intention .position').val();//职位
      const basicCity = $('.resume-left .resume-intention .city').val();//城市
      const basicSalary = $('.resume-left .resume-intention .salary').val();//薪资
      const basicArriveTime = $('.resume-left .resume-intention .arrive-time').val();//到岗时间
      //发送数据
      const intentionData = { position: basicPosition, city: basicCity, salary: basicSalary, arrive_time: basicArriveTime }
      $.ajax({
        url: baseURL + '/saveResumeIntention',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, intentionData },
        success: ((response) => { $('.resume-save-tip').addClass('text-dark'); $('.resume-save-tip').text('已保存'); setTimeout( function() { $('.resume-save-tip').text(''); }, 3000 ); message('已保存', 'success'); }),
        error: ((error) => { $('.resume-save-tip').addClass('text-danger'); $('.resume-save-tip').text('保存失败'); setTimeout( function() { $('.resume-save-tip').text(''); }, 5000 ); message('保存失败', 'danger'); return false; })
      })
      //渲染数据
      $('.resume-right .resume-intention .position').text(basicPosition);//职位
      $('.resume-right .resume-intention .city').text(basicCity);//城市
      $('.resume-right .resume-intention .salary').text(basicSalary);//薪资
      $('.resume-right .resume-intention .arrive-time').text(basicArriveTime);//到岗时间
    })

    //保存内容->教育经历
    $('.resume-education-experience-save').click(() => {
      //合并对象->数组
      var educationExperienceData = [];//教育经历->全部数组
      $('.resume-left').find('.resume-education-experience-list-box').each(function(i) {
        var educationExperienceOneData = {};//教育经历->单个对象
        educationExperienceOneData.school = $(this).find('.school').val();//学校
        educationExperienceOneData.time = $(this).find('.time').val();//时间
        educationExperienceOneData.city = $(this).find('.city').val();//城市
        educationExperienceOneData.department = $(this).find('.department').val();//院系
        educationExperienceOneData.level = $(this).find('.level').val();//层次
        educationExperienceOneData.major = $(this).find('.major').val();//专业
        educationExperienceOneData.content = $(this).find('.content').val();//内容
        educationExperienceData.push(educationExperienceOneData);
      })
      //发送数据
      $.ajax({
        url: baseURL + '/saveResumeEducationExperience',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, educationExperienceData },
        success: ((response) => { $('.resume-save-tip').addClass('text-dark'); $('.resume-save-tip').text('已保存'); setTimeout( function() { $('.resume-save-tip').text(''); }, 3000 ); message('已保存', 'success'); }),
        error: ((error) => { $('.resume-save-tip').addClass('text-danger'); $('.resume-save-tip').text('保存失败'); setTimeout( function() { $('.resume-save-tip').text('');  return false; }, 5000 ); message('保存失败', 'success'); return false; })
      })
      //渲染数据
      var educationExperienceListBox = '';
      $.each(educationExperienceData, function(i, n) {
        educationExperienceListBox += '<div class="resume-education-experience-list-box">';
        educationExperienceListBox += '<div class="school-time" style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
        educationExperienceListBox += '<p style="width: 50%;float: left;"><span class="school" style="font-weight: bold;">' + n.school + '</span></p>';
        educationExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
        educationExperienceListBox += '</div>';
        educationExperienceListBox += '<div class="department-city" style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
        educationExperienceListBox += '<p style="width: 50%;float: left;"><span class="department">' + n.department + ' ' + n.level + ' ' + n.major + '</span></p>';
        educationExperienceListBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
        educationExperienceListBox += '</div>';
        educationExperienceListBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
        educationExperienceListBox += '</div>';
      });
      $('.resume-right .resume-education-experience-list').html(educationExperienceListBox);
    })
    
    //教育经历->添加模块
    var resumeEducationExperienceListBoxCount = 1;//教育经历->序号
    $('.resume-left').find('.resume-education-experience-list-box').each(function(i) { resumeEducationExperienceListBoxCount += Number(i) });
    $('.resume-education-experience-add').click(() => {
      resumeEducationExperienceListBoxCount += 1;
      var resumeEducationExperienceListNewBox = '';
      resumeEducationExperienceListNewBox += '<div class="resume-education-experience-list-box">';
      resumeEducationExperienceListNewBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + resumeEducationExperienceListBoxCount + '<a href="javascript:void(0);" class="resume-education-experience-list-box-remove float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="school" class="font-size-14">学校</label><input type="text" class="form-control form-control-sm school" autocomplete="off" value=""></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value=""></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="department" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm department" autocomplete="off" value=""></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="level" class="font-size-14">层次</label><input type="text" class="form-control form-control-sm level" autocomplete="off" value=""></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="major" class="font-size-14">专业</label><input type="text" class="form-control form-control-sm major" autocomplete="off" value=""></p>';
      resumeEducationExperienceListNewBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      resumeEducationExperienceListNewBox += '</div>';
      $('.resume-left').find('.resume-education-experience-list').append(resumeEducationExperienceListNewBox)
    })
   
    //教育经历->删除模块
    $(document).on('click', '.resume-education-experience-list-box-remove', function() {
      var removeConfirm = confirm('确定删除当前模块？');
      if(removeConfirm) {
        $(this).parent().parent().remove();
      }
    })

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