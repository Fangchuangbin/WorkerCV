$(document).ready(() => {

  //公共变量
  const baseURL = 'http://192.168.0.5:7001';

  //下载简历
  $('.download-resume').click(() => {
    $.ajax({
      url: baseURL + '/downloadResume',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeCode: $('.resume-right .rounded').html() },
      success: ((response) => { console.log(response) }),
      error: ((error) => { console.log(error) })
    })
  })

  const resumeData = JSON.parse($('#data').attr('data-resume'));//转换为对象

  $('.resume-name').text(resumeData.resume_name);//简历名称

  //更新内容->公共
  $('.resume-update').click(() => {
    //基本信息
    $('.resume-right .resume-basic .realname').text($('.resume-left .resume-basic .realname').val());//姓名
    $('.resume-right .resume-basic .phone').text($('.resume-left .resume-basic .phone').val());//姓名
    $('.resume-right .resume-basic .address').text($('.resume-left .resume-basic .address').val());//地址
    $('.resume-right .resume-basic .email').text($('.resume-left .resume-basic .email').val());//电子邮箱
    $('.resume-right .resume-basic .education').text($('.resume-left .resume-basic .education').val());//学历
    $('.resume-right .resume-basic .work-time').text($('.resume-left .resume-basic .work-time').val());//工作时间
    //求职意向
    $('.resume-right .resume-intention .position').text($('.resume-left .resume-intention .position').val());//职位
    $('.resume-right .resume-intention .city').text($('.resume-left .resume-intention .city').val());//城市
    $('.resume-right .resume-intention .salary').text($('.resume-left .resume-intention .salary').val());//薪资
    $('.resume-right .resume-intention .arrive-time').text($('.resume-left .resume-intention .arrive-time').val());//到岗时间
  })

  //更新内容->教育经历
  $('.resume-education-experience-update').click(() => {
    var educationExperienceData = [];//教育经历->数组
    $('.resume-education-experience-list').each(function(i) {
      educationExperienceData.push($('.resume-education-experience-list-box').find('.school').text());
    })
    console.log(educationExperienceData)
  })

  //基本信息
  const resumeDataBasic = JSON.parse(resumeData.basic);
  //左
  $('.resume-left .resume-basic .realname').val(resumeDataBasic.realname);//姓名
  $('.resume-left .resume-basic .phone').val(resumeDataBasic.phone);//手机号
  $('.resume-left .resume-basic .address').val(resumeDataBasic.address);//地址
  $('.resume-left .resume-basic .email').val(resumeDataBasic.email);//电子邮箱
  $('.resume-left .resume-basic .education').val(resumeDataBasic.education);//最高学历
  $('.resume-left .resume-basic .work-time').val(resumeDataBasic.work_time);//工作时间
  //右
  $('.resume-right .resume-basic .realname').text(resumeDataBasic.realname);//姓名
  $('.resume-right .resume-basic .phone-email-address .phone').text(resumeDataBasic.phone);//手机号
  $('.resume-right .resume-basic .phone-email-address .email').text(resumeDataBasic.email);//电子邮箱
  $('.resume-right .resume-basic .phone-email-address .address').text(resumeDataBasic.address);//地址
  $('.resume-right .resume-basic .education-work-time .education').text(resumeDataBasic.education);//学历
  $('.resume-right .resume-basic .education-work-time .work-time').text(resumeDataBasic.work_time);//工作实践
  $('.resume-right .resume-basic .introduction').text(resumeDataBasic.introduction);//自我介绍

  //求职意向
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

  //教育经历
  const resumeDataEducationExperience = JSON.parse(resumeData.education_experience);
  var resumeDataEducationExperienceList = '';
  //左
  $.each(resumeDataEducationExperience, function(i, n) {
    resumeDataEducationExperienceList += '<div class="resume-education-experience-list-box">';
    resumeDataEducationExperienceList += '<p class="my-2 pt-2 font-size-14 font-weight-bold">#学校' + Number(i + 1) + '</p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="school" class="font-size-14">学校</label><input type="text" class="form-control form-control-sm school" autocomplete="off" value="' + n.school + '"></p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value="' + n.city + '"></p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="department" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm department" autocomplete="off" value="' + n.department + '"></p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="level" class="font-size-14">层次</label><input type="text" class="form-control form-control-sm level" autocomplete="off" value="' + n.level + '"></p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="major" class="font-size-14">专业</label><input type="text" class="form-control form-control-sm major" autocomplete="off" value="' + n.major + '"></p>';
    resumeDataEducationExperienceList += '<p class="mb-1"><label for="content" class="font-size-14">专业</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
    resumeDataEducationExperienceList += '</div>';
  });
  $('.resume-left .resume-education-experience-list').html(resumeDataEducationExperienceList);
  //右
  resumeDataEducationExperienceList = '';
  $.each(resumeDataEducationExperience, function(i, n) {
    resumeDataEducationExperienceList += '<div class="resume-education-experience-list-box">';
    resumeDataEducationExperienceList += '<div class="school-time" style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
    resumeDataEducationExperienceList += '<p style="width: 50%;float: left;"><span class="school" style="font-weight: bold;">' + n.school + '</span></p>';
    resumeDataEducationExperienceList += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
    resumeDataEducationExperienceList += '</div>';
    resumeDataEducationExperienceList += '<div class="department-city" style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
    resumeDataEducationExperienceList += '<p style="width: 50%;float: left;"><span class="department">' + n.department + ' ' + n.level + ' ' + n.major + '</span></p>';
    resumeDataEducationExperienceList += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
    resumeDataEducationExperienceList += '</div>';
    resumeDataEducationExperienceList += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
    resumeDataEducationExperienceList += '</div>';
  });
  $('.resume-right .resume-education-experience-list').html(resumeDataEducationExperienceList);

  //console.log(JSON.parse(resumeData.education_experience));
})