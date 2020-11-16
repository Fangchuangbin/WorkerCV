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
  var accordion = {
    basic: '\
    <div class="card border-lead basic">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading1" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">基本信息<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" data-toggle="modal" data-target="#renameModal" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordionResumeContent">\
        <div class="card-body p-3">\
          <p class="mb-1"><label for="realname" class="font-size-14">姓名</label><input type="text" class="form-control form-control-sm realname" autocomplete="off"></p>\
          <p class="mb-1"><label for="phone" class="font-size-14">手机号</label><input type="text" class="form-control form-control-sm phone" autocomplete="off"></p>\
          <p class="mb-1"><label for="email" class="font-size-14">电子邮箱</label><input type="text" class="form-control form-control-sm email" autocomplete="off"></p>\
          <p class="mb-1"><label for="address" class="font-size-14">地址</label><input type="text" class="form-control form-control-sm address" autocomplete="off"></p>\
          <p class="mb-1"><label for="education" class="font-size-14">学历</label><input type="text" class="form-control form-control-sm education" autocomplete="off"></p>\
          <p class="mb-1"><label for="work-time" class="font-size-14">工作时间</label><input type="text" class="form-control form-control-sm work-time" autocomplete="off"></p>\
          <p class="mb-1"><label for="introduce" class="font-size-14">内容</label><textarea class="form-control form-control-sm introduce" autocomplete="off"></textarea></p>\
          <button type="button" class="btn btn-dark btn-sm mt-2 save-button">保存更改</button>\
        </div>\
      </div>\
    </div>\
    ',
    intention: '\
    <div class="card border-lead intention">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading2" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" aria-controls="collapse2">求职意向<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" data-toggle="modal" data-target="#renameModal" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse2" class="collapse" aria-labelledby="heading2" data-parent="#accordionResumeContent">\
        <div class="card-body p-3">\
          <p class="mb-1"><label for="position" class="font-size-14">岗位</label><input type="text" class="form-control form-control-sm position" autocomplete="off"></p>\
          <p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off"></p>\
          <p class="mb-1"><label for="salary" class="font-size-14">薪资</label><input type="text" class="form-control form-control-sm salary" autocomplete="off"></p>\
          <p class="mb-1"><label for="arrive-time" class="font-size-14">到岗时间</label><input type="text" class="form-control form-control-sm arrive-time" autocomplete="off"></p>\
          <button type="button" class="btn btn-dark btn-sm mt-2 save-button">保存更改</button>\
        </div>\
      </div>\
    </div>\
    ',
    education: '\
    <div class="card border-lead education">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading3" data-toggle="collapse" data-target="#collapse3" aria-expanded="true" aria-controls="collapse3">教育经历<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" data-toggle="modal" data-target="#renameModal" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse3" class="collapse" aria-labelledby="heading3" data-parent="#accordionResumeContent">\
        <div class="card-body px-3 pb-3 pt-1">\
          <div class="education-box"></div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
          <button type="button" class="btn btn-outline-dark btn-sm my-3 ml-2 float-left add-button">添加模块</button>\
        </div>\
      </div>\
    </div>\
    ',
    work: '\
    <div class="card border-lead work">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading4" data-toggle="collapse" data-target="#collapse4" aria-expanded="true" aria-controls="collapse4">工作经历<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#accordionResumeContent">\
        <div class="card-body px-3 pb-3 pt-1">\
          <div class="work-box"></div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
          <button type="button" class="btn btn-outline-dark btn-sm my-3 ml-2 float-left add-button">添加模块</button>\
        </div>\
      </div>\
    </div>\
    ',
    appraise: '\
    <div class="card border-lead appraise">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading5" data-toggle="collapse" data-target="#collapse5" aria-expanded="true" aria-controls="collapse5">自我评价<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordionResumeContent">\
        <div class="card-body px-3 pb-3 pt-1">\
          <div class="appraise-box">\
            <p class="mb-1"><label for="introduce" class="font-size-14">内容</label><textarea class="form-control form-control-sm introduce" autocomplete="off"></textarea></p>\
          </div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
        </div>\
      </div>\
    </div>\
    ',
    project: '\
    <div class="card border-lead project">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading6" data-toggle="collapse" data-target="#collapse6" aria-expanded="true" aria-controls="collapse6">项目经历<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse6" class="collapse" aria-labelledby="heading6" data-parent="#accordionResumeContent">\
        <div class="card-body px-3 pb-3 pt-1">\
          <div class="project-box"></div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
          <button type="button" class="btn btn-outline-dark btn-sm my-3 ml-2 float-left add-button">添加模块</button>\
        </div>\
      </div>\
    </div>\
    ',
    certificate: '\
    <div class="card border-lead certificate">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading7" data-toggle="collapse" data-target="#collapse7" aria-expanded="true" aria-controls="collapse7">技能证书<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse7" class="collapse" aria-labelledby="heading7" data-parent="#accordionResumeContent">\
        <div class="card-body px-3 pb-3 pt-1">\
          <div class="certificate-box">\
            <p class="mb-1 mt-2"><label for="skill" class="font-size-14">技能</label><textarea class="form-control form-control-sm skill" autocomplete="off"></textarea></p>\
            <p class="mb-1"><label for="prove" class="font-size-14">证书</label><textarea class="form-control form-control-sm prove" autocomplete="off"></textarea></p>\
          </div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
        </div>\
      </div>\
    </div>\
    ',
    association: '\
    <div class="card border-lead association">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading8" data-toggle="collapse" data-target="#collapse8" aria-expanded="true" aria-controls="collapse8">社团经历<a href="javascript:void(0);" class="more-button text-dark rounded float-right" id="dropdownMoreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="0.9em" height="0.9em" viewBox="0 2 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
        <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
        </svg></a><div class="dropdown-menu font-size-13 mt-2" aria-labelledby="dropdownMoreButton">\
        <a class="dropdown-item px-3 up-shift" href="javascript:void(0);">上移</a>\
        <a class="dropdown-item px-3 down-shift" href="javascript:void(0);">下移</a>\
        <a class="dropdown-item px-3 rename" href="javascript:void(0);">重命名</a>\
        </div>\
      </div>\
      <div id="collapse8" class="collapse" aria-labelledby="heading8" data-parent="#accordionResumeContent">\
        <div class="card-body resume-education-experience px-3 pb-3 pt-1">\
          <div class="association-box">\
            <p class="mb-1"><label for="introduce" class="font-size-14">内容</label><input type="text" class="form-control form-control-sm introduce" autocomplete="off"></p>\
          </div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
          <button type="button" class="btn btn-outline-dark btn-sm my-3 ml-2 float-left add-button">添加模块</button>\
        </div>\
      </div>\
    </div>\
    '
  }//简历表单
  var resumeData = Object();//简历数据
  getResume();

  //获取简历数据
  function getResume(status) {
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
          getResumeTemplate(status);//渲染数据模板
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
  }
  
  //获取简历模板
  function getResumeTemplate(status) {
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
          renderResumeTemplateModule(status);//方法->渲染->简历模块
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
    
  }

  //渲染简历模块
  function renderResumeTemplateModule(status) {
    //渲染简历名称
    $('.resume-name').text(resumeData.resume_name);
    const loadResumeModuleData = JSON.parse(resumeData.resume_data);
    if(status == 1){//1->保存内容，刷新简历右模块
      resumeRight();
      renderResume();
    }else{
      resumeLeft();
      resumeRight();
      renderResume();
    }
    function resumeRight() {
      $.each(loadResumeModuleData, function(i, n) {
        switch(n.module) {
          case 'basic':
            $('.resume-right').find('.resume-box').append(basic.firstChild.data);//基本信息
            break;
          case 'intention':
            $('.resume-right').find('.resume-box').append(intention.firstChild.data);//求职意向
            break;
          case 'education':
            if(n.data) { $('.resume-right').find('.resume-box').append(education.firstChild.data); }//教育经历
            break;
          case 'work':
            if(n.data) { $('.resume-right').find('.resume-box').append(work.firstChild.data); }//工作经历
            break;
          case 'appraise':
            if(n.data.introduce !== '') { $('.resume-right').find('.resume-box').append(appraise.firstChild.data); }//自我评价
            break;
          case 'project':
            if(n.data) { $('.resume-right').find('.resume-box').append(project.firstChild.data); }//项目经历
            break;
          case 'certificate':
            if(n.data.skill !== '' && n.data.prove !== '') { $('.resume-right').find('.resume-box').append(certificate.firstChild.data); }//技能证书
            break;
          case 'association':
            if(n.data) { $('.resume-right').find('.resume-box').append(association.firstChild.data); }//社团经历
            break;
        }
      })
    }
    function resumeLeft() {
      $('.resume-left').find('.accordion').text(null);
      $.each(loadResumeModuleData, function(i, n) {
      switch(n.module) {
        case 'basic':
          $('.resume-left').find('.accordion').append(accordion.basic);;//基本信息
          break;
        case 'intention':
          $('.resume-left').find('.accordion').append(accordion.intention);//求职意向
          break;
        case 'education':
          $('.resume-left').find('.accordion').append(accordion.education);//教育经历
          break;
        case 'work':
          $('.resume-left').find('.accordion').append(accordion.work);//工作经历
          break;
        case 'appraise':
          $('.resume-left').find('.accordion').append(accordion.appraise);//自我评价
          break;
        case 'project':
          $('.resume-left').find('.accordion').append(accordion.project);//项目经历
          break;
        case 'certificate':
          $('.resume-left').find('.accordion').append(accordion.certificate);//技能证书
          break;
        case 'association':
          $('.resume-left').find('.accordion').append(accordion.association);//社团经历
          break;
      }
    })
    }
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
          $('.resume-left .basic .introduce').text(n.data.introduce);//自我介绍
          //右
          $('.resume-right .basic .realname').text(n.data.realname);//姓名
          $('.resume-right .basic .phone').text(n.data.phone);//手机号
          $('.resume-right .basic .email').text(n.data.email);//电子邮箱
          $('.resume-right .basic .address').text(n.data.address);//地址
          $('.resume-right .basic .education').text(n.data.education);//学历
          $('.resume-right .basic .work-time').text(n.data.work_time);//工作实践
          $('.resume-right .basic .introduce').text(n.data.introduce);//自我介绍
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
            n.content = n.content.replace(/\n/g, '<br />')
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
            n.content = n.content.replace(/\n/g, '<br />')
            workBox += '<div class="work-box-main">';
            workBox += '<div style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
            workBox += '<p style="width: 50%;float: left;"><span class="company" style="font-weight: bold;">' + n.company + '</span></p>';
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
        case 'association'://社团经历
          $('.resume-left .association').attr('data-order', i);//模块顺序
          const associationData = n.data;
          var associationBox = '';
          $.each(associationData, function(i, n) {//左
            associationBox += '<div class="association-box-main">';
            associationBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + Number(i + 1) + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
            associationBox += '<p class="mb-1"><label for="association" class="font-size-14">社团</label><input type="text" class="form-control form-control-sm association" autocomplete="off" value="' + n.association + '"></p>';
            associationBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
            associationBox += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value="' + n.position + '"></p>';
            associationBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
            associationBox += '</div>';
          });
          $('.resume-left .association-box').html(associationBox);
          associationBox = '';
          $.each(associationData, function(i, n) {//右
            n.content = n.content.replace(/\n/g, '<br />')
            associationBox += '<div class="association-box-main">';
            associationBox += '<div style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
            associationBox += '<p style="width: 50%;float: left;"><span class="association" style="font-weight: bold;">' + n.association + '</span></p>';
            associationBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
            associationBox += '</div>';
            associationBox += '<div style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
            associationBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
            associationBox += '</div>';
            associationBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
            associationBox += '</div>';
          });
          $('.resume-right .association-box').html(associationBox);
          break;
        case 'project'://项目经历
          $('.resume-left .project').attr('data-order', i);//模块顺序
          const projectData = n.data;
          var projectBox = '';
          $.each(projectData, function(i, n) {//左
            projectBox += '<div class="project-box-main">';
            projectBox += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + Number(i + 1) + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
            projectBox += '<p class="mb-1"><label for="project" class="font-size-14">项目</label><input type="text" class="form-control form-control-sm project" autocomplete="off" value="' + n.project + '"></p>';
            projectBox += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value="' + n.time + '"></p>';
            projectBox += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value="' + n.position + '"></p>';
            projectBox += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off">' + n.content + '</textarea>';
            projectBox += '</div>';
          });
          $('.resume-left .project-box').html(projectBox);
          projectBox = '';
          $.each(projectData, function(i, n) {//右
            n.content = n.content.replace(/\n/g, '<br />')
            projectBox += '<div class="project-box-main">';
            projectBox += '<div style="font-size: 13px;overflow: hidden;height: 30px;line-height: 35px;">';
            projectBox += '<p style="width: 50%;float: left;"><span class="project" style="font-weight: bold;">' + n.project + '</span></p>';
            projectBox += '<p style="width: 50%;float: right;text-align: right;"><span class="time">' + n.time + '</span></p>';
            projectBox += '</div>';
            projectBox += '<div style="font-size: 13px;overflow: hidden;height: 15px;line-height: 15px;">';
            projectBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
            projectBox += '</div>';
            projectBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
            projectBox += '</div>';
          });
          $('.resume-right .project-box').html(projectBox);
          break;
        case 'certificate'://技能证书
          $('.resume-left .certificate').attr('data-order', i);//模块顺序
          //左
          $('.resume-left .certificate .skill').text(n.data.skill);//技能
          $('.resume-left .certificate .prove').text(n.data.prove);//证书
          //右
          $('.resume-right .certificate .skill').text(n.data.skill);//技能
          $('.resume-right .certificate .prove').text(n.data.prove);//证书
          break;
        case 'appraise'://自我介绍
          $('.resume-left .appraise').attr('data-order', i);//模块顺序
          //左
          $('.resume-left .appraise .introduce').text(n.data.introduce);//自我介绍
          //右
          $('.resume-right .appraise .introduce').text(n.data.introduce);//自我介绍
          break;
      
      }
    })

    //教育经历->添加模块
    $('.education .add-button').click(() => {
      var educationOrder = 1;//教育经历->序号
      $('.resume-left').find('.education-box').each(function() { educationOrder = Number($(this).children('div').length + 1) });
      var newEducationBoxMain = '';
      newEducationBoxMain += '<div class="education-box-main">';
      newEducationBoxMain += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + educationOrder + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="school" class="font-size-14">学校</label><input type="text" class="form-control form-control-sm school" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="department" class="font-size-14">院系</label><input type="text" class="form-control form-control-sm department" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="level" class="font-size-14">层次</label><input type="text" class="form-control form-control-sm level" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="major" class="font-size-14">专业</label><input type="text" class="form-control form-control-sm major" autocomplete="off" value=""></p>';
      newEducationBoxMain += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      newEducationBoxMain += '</div>';
      $('.resume-left').find('.education-box').append(newEducationBoxMain);
    })
    
    //工作经历->添加模块
    $('.work .add-button').click(() => {
      var workOrder = 1;//工作经历->序号
      $('.resume-left').find('.work-box').each(function() { workOrder = Number($(this).children('div').length + 1); });
      var newWorkBoxMain = '';
      newWorkBoxMain += '<div class="work-box-main">';
      newWorkBoxMain += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + workOrder + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      newWorkBoxMain += '<p class="mb-1"><label for="company" class="font-size-14">公司</label><input type="text" class="form-control form-control-sm company" autocomplete="off" value=""></p>';
      newWorkBoxMain += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      newWorkBoxMain += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value=""></p>';
      newWorkBoxMain += '<p class="mb-1"><label for="city" class="font-size-14">城市</label><input type="text" class="form-control form-control-sm city" autocomplete="off" value=""></p>';
      newWorkBoxMain += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      newWorkBoxMain += '</div>';
      $('.resume-left').find('.work-box').append(newWorkBoxMain);
    })
  
    //社团经历->添加模块
    $('.association .add-button').click(() => {
      var associationOrder = 1;//工作经历->序号
      $('.resume-left').find('.association-box').each(function() { associationOrder = Number($(this).children('div').length + 1); });
      var newAssociationBoxMain = '';
      newAssociationBoxMain += '<div class="association-box-main">';
      newAssociationBoxMain += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + associationOrder + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      newAssociationBoxMain += '<p class="mb-1"><label for="association" class="font-size-14">社团</label><input type="text" class="form-control form-control-sm association" autocomplete="off" value=""></p>';
      newAssociationBoxMain += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      newAssociationBoxMain += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value=""></p>';
      newAssociationBoxMain += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      newAssociationBoxMain += '</div>';
      $('.resume-left').find('.association-box').append(newAssociationBoxMain);
    })

    //项目经历->添加模块
    $('.project .add-button').click(() => {
      var projectOrder = 1;//工作经历->序号
      $('.resume-left').find('.project-box').each(function() { projectOrder = Number($(this).children('div').length + 1) });
      projectOrder += 1;
      var newProjectBoxMain = '';
      newProjectBoxMain += '<div class="project-box-main">';
      newProjectBoxMain += '<p class="my-2 pt-2 font-size-14 font-weight-bold"># NO.' + projectOrder + '<a href="javascript:void(0);" class="remove-button float-right font-size-13 font-weight-normal text-danger">删除模块</a></p>';
      newProjectBoxMain += '<p class="mb-1"><label for="project" class="font-size-14">项目</label><input type="text" class="form-control form-control-sm project" autocomplete="off" value=""></p>';
      newProjectBoxMain += '<p class="mb-1"><label for="time" class="font-size-14">时间</label><input type="text" class="form-control form-control-sm time" autocomplete="off" value=""></p>';
      newProjectBoxMain += '<p class="mb-1"><label for="position" class="font-size-14">职位</label><input type="text" class="form-control form-control-sm position" autocomplete="off" value=""></p>';
      newProjectBoxMain += '<p class="mb-1"><label for="content" class="font-size-14">内容</label><textarea class="form-control form-control-sm content" autocomplete="off"></textarea>';
      newProjectBoxMain += '</div>';
      $('.resume-left').find('.project-box').append(newProjectBoxMain);
    })
    
    //删除模块
    $(document).on('click', '.remove-button', function() {
      var removeConfirm = confirm('确定删除当前模块？');
      if(removeConfirm) {
        $(this).parent().parent().remove();
      }
    })

    //保存内容
    $('.save-button').click(function() {
      var saveData;//需要保存的内容
      var dataOrder;//模块顺序
      if($(this).parents('.basic').attr('data-order')) {
        dataOrder = $(this).parents('.basic').attr('data-order');
        const realname = $('.resume-left .basic .realname').val();//姓名
        const phone = $('.resume-left .basic .phone').val();//手机
        const address = $('.resume-left .basic .address').val();//地址
        const email = $('.resume-left .basic .email').val();//电子邮箱
        const education = $('.resume-left .basic .education').val();//学历
        const work_time = $('.resume-left .basic .work-time').val();//工作时间
        const introduce = $('.resume-left .basic .introduce').val();//自我评价
        const avatar = 'http://image-workercv.test.upcdn.net/009862297f62849aefef6a6687a71c7d.jpg';//个人头像
        saveData = { realname, phone, address, email, education, work_time, introduce, avatar }
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
      }else if($(this).parents('.work').attr('data-order')) {
        dataOrder = $(this).parents('.work').attr('data-order');
        var workArray = [];//工作经历->全部数组
        $('.resume-left').find('.work-box-main').each(function(i) {
          var workObject = {};//工作经历->单个对象
          workObject.company = $(this).find('.company').val();//公司
          workObject.time = $(this).find('.time').val();//时间
          workObject.position = $(this).find('.position').val();//职位
          workObject.city = $(this).find('.city').val();//城市
          workObject.content = $(this).find('.content').val();//内容
          workArray.push(workObject);
          saveData = workArray;
        })
      }else if($(this).parents('.project').attr('data-order')) {
        dataOrder = $(this).parents('.project').attr('data-order');
        var projectArray = [];//项目经历->全部数组
        $('.resume-left').find('.project-box-main').each(function(i) {
          var projectObject = {};//项目经历->单个对象
          projectObject.project = $(this).find('.project').val();//项目
          projectObject.time = $(this).find('.time').val();//时间
          projectObject.position = $(this).find('.position').val();//职位
          projectObject.content = $(this).find('.content').val();//内容
          projectArray.push(projectObject);
          saveData = projectArray;
        })
      }else if($(this).parents('.association').attr('data-order')) {
        dataOrder = $(this).parents('.association').attr('data-order');
        var associationArray = [];//社团经历->全部数组
        $('.resume-left').find('.association-box-main').each(function(i) {
          var associationObject = {};//社团经历->单个对象
          associationObject.association = $(this).find('.association').val();//社团
          associationObject.time = $(this).find('.time').val();//时间
          associationObject.position = $(this).find('.position').val();//职位
          associationObject.content = $(this).find('.content').val();//内容
          associationArray.push(associationObject);
          saveData = associationArray;
        })
      }else if($(this).parents('.certificate').attr('data-order')) {
        dataOrder = $(this).parents('.certificate').attr('data-order');
        $('.resume-left').find('.certificate-box').each(function(i) {
          const skill = $('.resume-left .certificate .skill').val();//技能
          const prove = $('.resume-left .certificate .prove').val();//证书
          saveData = { skill, prove }
        })
      }else if($(this).parents('.appraise').attr('data-order')) {
        dataOrder = $(this).parents('.appraise').attr('data-order');
        $('.resume-left').find('.appraise-box').each(function(i) {
          const introduce = $('.resume-left .appraise .introduce').val();//自我评价
          saveData = { introduce }
        })
      }
      var saveResumeData = resumeData.resume_data;//老数据
      if(typeof saveResumeData == 'string') { saveResumeData = JSON.parse(saveResumeData); }
      saveResumeData[Number(dataOrder)].data = saveData;//插入新数据
      $.ajax({
        url: baseURL + '/saveResume',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, saveResumeData },
        success: ((response) => { getResume(1); message('已保存', 'success'); }),
        error: ((error) => { message('保存失败', 'danger'); return false; })
      })
    })

    //简历模块->上移
    $(document).on('click', '.up-shift', function() {
      var saveResumeData = resumeData.resume_data;//老数据
      if(typeof saveResumeData == 'string') { saveResumeData = JSON.parse(saveResumeData); }
      var resumeOrder = Number($(this).parents('.card').attr('data-order'));
      saveResumeData[resumeOrder] = saveResumeData.splice(resumeOrder - 1, 1, saveResumeData[resumeOrder])[0];
      $.ajax({
        url: baseURL + '/saveResume',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, saveResumeData },
        success: ((response) => { getResume(); message('移动模块成功', 'success'); }),
        error: ((error) => { message('移动模块成功失败', 'danger'); return false; })
      })
      saveResumeData = '';
    })

    //简历模块->下移
    $(document).on('click', '.down-shift', function() {
      var saveResumeData = resumeData.resume_data;//老数据
      if(typeof saveResumeData == 'string') { saveResumeData = JSON.parse(saveResumeData); }
      var resumeOrder = Number($(this).parents('.card').attr('data-order'));
      saveResumeData[resumeOrder] = saveResumeData.splice(resumeOrder + 1, 1, saveResumeData[resumeOrder])[0];
      $.ajax({
        url: baseURL + '/saveResume',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, saveResumeData },
        success: ((response) => { getResume(); message('移动模块成功', 'success'); }),
        error: ((error) => { message('移动模块成功失败', 'danger'); return false; })
      })
      saveResumeData = '';
    })

    //简历模块->重命名
    $(document).on('click', '.rename', function() {

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