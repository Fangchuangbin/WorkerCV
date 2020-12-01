import { baseURL, logOut, message } from './common.js'

$(document).ready(() => {
  //简历秘钥
  var resumeKey = document.location.pathname.replace(/\/resume\//g, '');
  //创建空的简历模板模块
  var basic = document.createElement('p');//基本信息
  var intention = document.createElement('p');//求职意向
  var education = document.createElement('p');//教育经历
  var work = document.createElement('p');//工作经历
  var appraise = document.createElement('p');//自我评价
  var project = document.createElement('p');//项目经历
  var certificate = document.createElement('p');//技能证书
  var association = document.createElement('p');//社团经历
  //左边->简历表单
  var accordion = {
    basic: '\
    <div class="card border-lead basic">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading1" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
      <div id="collapse1" class="collapse show" aria-labelledby="heading1" data-parent="#accordionResumeContent">\
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
      <div class="card-header font-size-14 bg-lead border-lead" id="heading2" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" aria-controls="collapse2">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
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
      <div class="card-header font-size-14 bg-lead border-lead" id="heading3" data-toggle="collapse" data-target="#collapse3" aria-expanded="true" aria-controls="collapse3">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
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
      <div class="card-header font-size-14 bg-lead border-lead" id="heading4" data-toggle="collapse" data-target="#collapse4" aria-expanded="true" aria-controls="collapse4">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
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
      <div class="card-header font-size-14 bg-lead border-lead" id="heading5" data-toggle="collapse" data-target="#collapse5" aria-expanded="true" aria-controls="collapse5">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
      <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordionResumeContent">\
        <div class="card-body px-3 pb-3 pt-1">\
          <div class="appraise-box">\
            <p class="mb-1 mt-2"><label for="introduce" class="font-size-14">内容</label><textarea class="form-control form-control-sm introduce" autocomplete="off"></textarea></p>\
          </div>\
          <button type="button" class="btn btn-dark btn-sm my-3 mr-1 float-left save-button">保存更改</button>\
        </div>\
      </div>\
    </div>\
    ',
    project: '\
    <div class="card border-lead project">\
      <div class="card-header font-size-14 bg-lead border-lead" id="heading6" data-toggle="collapse" data-target="#collapse6" aria-expanded="true" aria-controls="collapse6">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
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
      <div class="card-header font-size-14 bg-lead border-lead" id="heading7" data-toggle="collapse" data-target="#collapse7" aria-expanded="true" aria-controls="collapse7">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
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
      <div class="card-header font-size-14 bg-lead border-lead" id="heading8" data-toggle="collapse" data-target="#collapse8" aria-expanded="true" aria-controls="collapse8">\
      <span class="resume-name"></span>\
      </div><a href="javascript:void(0);" class="rename-button text-dark"><svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-pencil-square mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\
    </svg></a>\
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
  }
  //创建一个空的简历数据变量
  var resumeData;
  //执行初始化
  getCurrentResume();

  //编辑->初始化简历数据
  function getCurrentResume(status) {
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
          $('.edit-header').find('.resume-name').html('<span class="save-name-button float-right font-size-13">保存</span>');
          $('.edit-header').find('.resume-name').append('<span class="resume-name-main" contenteditable="true">' + resumeData.resume_name + '</span>');//渲染简历名称
          getCurrentResumeTemplate(status);//渲染数据模板
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
  }
  
  //编辑->初始化简历模板
  function getCurrentResumeTemplate(status) {
    $.ajax({
      url: baseURL + '/getCurrentResumeTemplate',
      type: 'post',
      dataType: 'json',
      timeout: 5000,
      headers: { 'x-csrf-token': $.cookie('csrfToken') },
      data: { resumeKey },
      success: ((response) => {
        if(response.result.code == 20000) {
          basic.innerHTML = response.getCurrentResumeTemplate.template_basic;//基本信息
          intention.innerHTML = response.getCurrentResumeTemplate.template_intention;//基本信息
          education.innerHTML = response.getCurrentResumeTemplate.template_education;//基本信息
          work.innerHTML = response.getCurrentResumeTemplate.template_work;//基本信息
          appraise.innerHTML = response.getCurrentResumeTemplate.template_appraise;//基本信息
          project.innerHTML = response.getCurrentResumeTemplate.template_project;//基本信息
          certificate.innerHTML = response.getCurrentResumeTemplate.template_certificate;//基本信息
          association.innerHTML = response.getCurrentResumeTemplate.template_association;//基本信息
          renderCurrentResumeTemplateModule(status);//方法->渲染->简历模块
        }else{ message('未知错误，请刷新网页！', 'danger'); }
      }),
      error: ((error) => { message('未知错误，请刷新网页！', 'danger'); })
    })
    
  }

  //编辑->渲染简历模板模块
  function renderCurrentResumeTemplateModule(status) {
    
    const loadResumeModuleData = JSON.parse(resumeData.resume_data);
    if(status == 1){//1->刷新简历右模块
      renderCurrentResumeRight();
      renderCurrentResume();
    }else{
      renderCurrentResumeLeft();
      renderCurrentResumeRight();
      renderCurrentResume();
    }
    function renderCurrentResumeRight() {
      $('.resume-right').find('.resume-box').html('');
      $.each(loadResumeModuleData, function(i, n) {
        switch(n.module) {
          case 'basic':
            if(n.status == 1) {
              $('.resume-right').find('.resume-box').append(basic.firstChild.data);//基本信息
            }
            break;
          case 'intention':
              if(n.status == 1) {
                $('.resume-right').find('.resume-box').append(intention.firstChild.data);//求职意向
              }
            break;
          case 'education':
            if(n.data && n.status == 1) { $('.resume-right').find('.resume-box').append(education.firstChild.data); }//教育经历
            break;
          case 'work':
            if(n.data && n.status == 1) { $('.resume-right').find('.resume-box').append(work.firstChild.data); }//工作经历
            break;
          case 'appraise':
            if(n.data.introduce !== '' && n.status == 1) { $('.resume-right').find('.resume-box').append(appraise.firstChild.data); }//自我评价
            break;
          case 'project':
            if(n.data && n.status == 1) { $('.resume-right').find('.resume-box').append(project.firstChild.data); }//项目经历
            break;
          case 'certificate':
            if(n.data.skill !== '' && n.data.prove !== '' && n.status == 1) { $('.resume-right').find('.resume-box').append(certificate.firstChild.data); }//技能证书
            break;
          case 'association':
            if(n.data && n.status == 1) { $('.resume-right').find('.resume-box').append(association.firstChild.data); }//社团经历
            break;
        }
      })
    }
    function renderCurrentResumeLeft() {
      $('.resume-left').find('.accordion').text(null);
      $.each(loadResumeModuleData, function(i, n) {
      switch(n.module) {
        case 'basic':
          if(n.status == 1){
            $('.resume-left').find('.accordion').append(accordion.basic);//基本信息
          }
          break;
        case 'intention':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.intention);//求职意向
          }
          break;
        case 'education':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.education);//教育经历
          }
          break;
        case 'work':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.work);//工作经历
          }
          break;
        case 'appraise':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.appraise);//自我评价
          }
          break;
        case 'project':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.project);//项目经历
          }
          break;
        case 'certificate':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.certificate);//技能证书
          }
          break;
        case 'association':
          if(n.status == 1) {
            $('.resume-left').find('.accordion').append(accordion.association);//社团经历
          }
          break;
      }
    })
    }
  }

  //编辑->渲染简历数据
  function renderCurrentResume() {
    const loadResumeData = JSON.parse(resumeData.resume_data);
    $.each(loadResumeData, function(i, n) {
      switch(n.module) {
        case 'basic'://基本信息
          if(n.status == 1) {
            $('.resume-left .basic').attr('data-sort', i);//模块顺序
            $('.resume-left .basic .resume-name').text(n.name);//模块名称
            //左
            $('.resume-left .basic .realname').val(n.data.realname);//姓名
            $('.resume-left .basic .phone').val(n.data.phone);//手机号
            $('.resume-left .basic .address').val(n.data.address);//地址
            $('.resume-left .basic .email').val(n.data.email);//电子邮箱
            $('.resume-left .basic .education').val(n.data.education);//最高学历
            $('.resume-left .basic .work-time').val(n.data.work_time);//工作时间
            $('.resume-left .basic .introduce').text(n.data.introduce);//自我评价
            //右
            $('.resume-right .basic .realname').text(n.data.realname);//姓名
            $('.resume-right .basic .phone').text(n.data.phone);//手机号
            $('.resume-right .basic .email').text(n.data.email);//电子邮箱
            $('.resume-right .basic .address').text(n.data.address);//地址
            $('.resume-right .basic .education').text(n.data.education);//学历
            $('.resume-right .basic .work-time').text(n.data.work_time);//工作实践
            $('.resume-right .basic .introduce').text(n.data.introduce);//自我评价
            $('.resume-right .basic .avatar').attr('src', n.data.avatar);//个人头像
          }
          break;
        case 'intention'://求职意向
          if(n.status == 1) {
            $('.resume-left .intention').attr('data-sort', i);//模块顺序
            $('.resume-left .intention .resume-name').text(n.name);//模块名称
            //左
            $('.resume-left .intention .position').val(n.data.position);//姓名
            $('.resume-left .intention .city').val(n.data.city);//手机号
            $('.resume-left .intention .salary').val(n.data.salary);//地址
            $('.resume-left .intention .arrive-time').val(n.data.arrive_time);//电子邮箱
            //右
            $('.resume-right .intention h6').text(n.name);//模块名称
            $('.resume-right .intention .position').text(n.data.position);//姓名
            $('.resume-right .intention .city').text(n.data.city);//手机号
            $('.resume-right .intention .salary').text(n.data.salary);//电子邮箱
            $('.resume-right .intention .arrive-time').text(n.data.arrive_time);//地址
          }
          break;
        case 'education'://教育经历
          if(n.status == 1) {
            $('.resume-left .education').attr('data-sort', i);//模块顺序
            $('.resume-left .education .resume-name').text(n.name);//模块名称
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
              educationBox += '<div style="font-size: 13px;overflow: hidden;">';
              educationBox += '<p style="width: 50%;float: left;"><span class="department">' + n.department + ' ' + n.level + ' ' + n.major + '</span></p>';
              educationBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
              educationBox += '</div>';
              educationBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
              educationBox += '</div>';
            });
            $('.resume-right .education h6').text(n.name);//模块名称
            $('.resume-right .education-box').html(educationBox);
          }
          break;
        case 'work'://工作经历
          if(n.status == 1) {
            $('.resume-left .work').attr('data-sort', i);//模块顺序
            $('.resume-left .work .resume-name').text(n.name);//模块名称
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
                workBox += '<div style="font-size: 13px;overflow: hidden;">';
                workBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
                workBox += '<p style="width: 50%;float: right;text-align: right;"><span class="city">' + n.city + '</span></p>';
                workBox += '</div>';
                workBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
                workBox += '</div>';
              });
              $('.resume-right .work h6').text(n.name);//模块名称
              $('.resume-right .work-box').html(workBox);
          }
          break;
        case 'association'://社团经历
          if(n.status == 1) {
            $('.resume-left .association').attr('data-sort', i);//模块顺序
            $('.resume-left .association .resume-name').text(n.name);//模块名称
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
              associationBox += '<div style="font-size: 13px;overflow: hidden;">';
              associationBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
              associationBox += '</div>';
              associationBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
              associationBox += '</div>';
            });
            $('.resume-right .association h6').text(n.name);//模块名称
            $('.resume-right .association-box').html(associationBox);
          }
          break;
        case 'project'://项目经历
          if(n.status == 1) {
            $('.resume-left .project').attr('data-sort', i);//模块顺序
            $('.resume-left .project .resume-name').text(n.name);//模块名称
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
              projectBox += '<div style="font-size: 13px;overflow: hidden;">';
              projectBox += '<p style="width: 50%;float: left;"><span class="position">' + n.position + '</span></p>';
              projectBox += '</div>';
              projectBox += '<div class="content" style="font-size: 13px;margin-top: 3px;">' + n.content + '</div>';
              projectBox += '</div>';
            });
            $('.resume-right .project h6').text(n.name);//模块名称
            $('.resume-right .project-box').html(projectBox);
          }
          break;
        case 'certificate'://技能证书
          if(n.status == 1) {
            $('.resume-left .certificate').attr('data-sort', i);//模块顺序
            $('.resume-left .certificate .resume-name').text(n.name);//模块名称
            //左
            $('.resume-left .certificate .skill').text(n.data.skill);//技能
            $('.resume-left .certificate .prove').text(n.data.prove);//证书
            //右
            $('.resume-right .certificate h6').text(n.name);//模块名称
            $('.resume-right .certificate .skill').text(n.data.skill);//技能
            $('.resume-right .certificate .prove').text(n.data.prove);//证书
          }
          break;
        case 'appraise'://自我评价
          if(n.status == 1) {
            $('.resume-left .appraise').attr('data-sort', i);//模块顺序
            $('.resume-left .appraise .resume-name').text(n.name);//模块名称
            //左
            $('.resume-left .appraise .introduce').text(n.data.introduce);//自我评价
            //右
            $('.resume-right .appraise h6').text(n.name);//模块名称
            $('.resume-right .appraise .introduce').text(n.data.introduce);//自我评价
          }
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
      $('.resume-left').find('.project-box').each(function() { projectOrder = Number($(this).children('div').length + 1); });
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
        message('已删除，请保存更改！','success');
      }
    })
    
    //执行->模块排序
    renderCurrentResumeSort();

    //执行->模块开关
    renderCurrentResumeModule();

    //关闭效果
    $('.waiting').remove();

    //编辑->保存内容
    $('.accordion').find('.save-button').click(function() {
      var saveData;//保存数据
      var dataSort;//模块排序
      if($(this).parents('.basic').attr('data-sort')) {
        dataSort = $(this).parents('.basic').attr('data-sort');
        const realname = $('.resume-left .basic .realname').val();//姓名
        const phone = $('.resume-left .basic .phone').val();//手机
        const address = $('.resume-left .basic .address').val();//地址
        const email = $('.resume-left .basic .email').val();//电子邮箱
        const education = $('.resume-left .basic .education').val();//学历
        const work_time = $('.resume-left .basic .work-time').val();//工作时间
        const introduce = $('.resume-left .basic .introduce').val();//自我评价
        const avatar = 'http://image-workercv.test.upcdn.net/009862297f62849aefef6a6687a71c7d.jpg';//个人头像
        saveData = { realname, phone, address, email, education, work_time, introduce, avatar }
      }else if($(this).parents('.intention').attr('data-sort')) { //求职意向
        dataSort = $(this).parents('.intention').attr('data-sort');
        const position = $('.resume-left .intention .position').val();//职位
        const city = $('.resume-left .intention .city').val();//城市
        const salary = $('.resume-left .intention .salary').val();//薪资
        const arrive_time = $('.resume-left .intention .arrive-time').val();//到岗时间
        saveData = { position, city, salary, arrive_time }
      }else if($(this).parents('.education').attr('data-sort')) {
        dataSort = $(this).parents('.education').attr('data-sort');
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
      }else if($(this).parents('.work').attr('data-sort')) {
        dataSort = $(this).parents('.work').attr('data-sort');
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
      }else if($(this).parents('.project').attr('data-sort')) {
        dataSort = $(this).parents('.project').attr('data-sort');
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
      }else if($(this).parents('.association').attr('data-sort')) {
        dataSort = $(this).parents('.association').attr('data-sort');
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
      }else if($(this).parents('.certificate').attr('data-sort')) {
        dataSort = $(this).parents('.certificate').attr('data-sort');
        $('.resume-left').find('.certificate-box').each(function(i) {
          const skill = $('.resume-left .certificate .skill').val();//技能
          const prove = $('.resume-left .certificate .prove').val();//证书
          saveData = { skill, prove }
        })
      }else if($(this).parents('.appraise').attr('data-sort')) {
        dataSort = $(this).parents('.appraise').attr('data-sort');
        $('.resume-left').find('.appraise-box').each(function(i) {
          const introduce = $('.resume-left .appraise .introduce').val();//自我评价
          saveData = { introduce }
        })
      }
      var saveResumeData = resumeData.resume_data;//老数据
      if(typeof saveResumeData == 'string') { saveResumeData = JSON.parse(saveResumeData); }
      saveResumeData[Number(dataSort)].data = saveData;//插入新数据
      $.ajax({
        url: baseURL + '/saveCurrentResume',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, saveResumeData },
        success: ((response) => { getCurrentResume(1); message('已保存', 'success'); }),
        error: ((error) => { message('保存失败', 'danger'); return false; })
      })
    })

    //激活修改简历名称
    $(document).on('click', '.resume-name-current-button', function(e) {
      $(this).addClass('resume-name-current')
      $(document).one('click', function() {
        if($('.resume-name-main').text() == '') {
          message('请输入简历名称','danger');
        }else{
          $('.resume-name-current-button').removeClass('resume-name-current')
        }
      })
      e.stopPropagation();
    })
    
    //保存简历名称
    $(document).on('click', '.save-name-button', function() {
      const resumeName = $('.resume-name-main').text();//新数据
      $.ajax({
        url: baseURL + '/changeCurrentResumeName',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, resumeName: resumeName },
        success: ((response) => { message('已保存', 'success'); }),
        error: ((error) => { message('保存失败', 'danger'); return false; })
      })
    })
 
    //保存简历配置
    $(document).on('click', '.save-config-button', function() {
      const color = $('.resume-color').find('input').val();//颜色
      const font = $('.resume-font').find('select').val();//字体
      const size = $('.resume-size').find('select').val();//字号
      const line = $('.resume-line').find('select').val();//行距
      const padding = $('.resume-padding').find('select').val();//边距
      const saveResumeConfigData = {"color": color, "font": font, "size": size, "line": line, "padding": padding};
      $.ajax({
        url: baseURL + '/changeCurrentResumeConfig',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, resumeConfig: saveResumeConfigData },
        success: ((response) => { message('已保存', 'success'); getCurrentResume(); }),
        error: ((error) => { message('保存失败', 'danger'); return false; })
      })
    })
  
    //获取简历配置
    getCurrentResumeConfig();
    function getCurrentResumeConfig() {
      const resumeConfigData = JSON.parse(resumeData.resume_config);
      $('.resume-color').find('input').val(resumeConfigData.color);
      $('.resume-font').find('select').val(resumeConfigData.font);//字体
      $('.resume-size').find('select').val(resumeConfigData.size);//字号
      $('.resume-line').find('select').val(resumeConfigData.line);//行距
      $('.resume-padding').find('select').val(resumeConfigData.padding);//边距
      $('.resume-box').css('padding', resumeConfigData.padding);
      $('.resume-box').css('line-height', resumeConfigData.line);
      $('.resume-box').find('span').css('font-size', resumeConfigData.size);
      $('.resume-box').find('.content').css('font-size', resumeConfigData.size);
      $('.resume-box').find('h6').css('font-size', resumeConfigData.size);
      $('.resume-box').find('p').css('font-size', resumeConfigData.size);
      $('.resume-box').find('h6').css('color', resumeConfigData.color);
      $('.resume-box').find('h6').css('border-color', resumeConfigData.color);
    }
  };

  //排序->渲染模块
  function renderCurrentResumeSort() {
    var publicResumeSortData;
    $('.resume-left').find('.sort').html('');
    const loadResumeSortData = JSON.parse(resumeData.resume_data);
    eachResumeSortData();//遍历模块排序
    function eachResumeSortData() {
      $('.resume-left').find('.sort').html('');
      $.each(loadResumeSortData, function(i, n) {
        switch(n.module) {
          case "basic"://基本信息
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 基本信息</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "intention"://求职意向
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 求职意向</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "education"://教育经历
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 教育经历</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "work"://工作经历
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 工作经历</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "project"://项目经历
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 项目经历</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "association"://社团经历
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 社团经历</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "certificate"://技能证书
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 技能证书</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
          case "appraise"://自我评价
            if(n.status == 1) {
              $('.resume-left').find('.sort').append('\
                <li class="list-group-item list-group-item-action" data-sort="' + i +'">\
                  <span class="resume-module-name font-size-14 float-left">#'+ Number(i+1) +' - 自我评价</span>\
                  <span class="float-right font-size-14">\
                    <a href="javascript:void(0);" class="text-danger up-shift">上移</a>\
                    <a href="javascript:void(0);" class="text-primary down-shift">下移</a>\
                  </span>\
                </li>\
              ')
            }
          break;
        }
      })
      $('.resume-left').find('.sort').append('\<button type="button" class="btn btn-sm btn-dark mt-3 save-sort-button">保存更改</button>');
    }

    //模块重命名
    $(document).on('click', '.rename-button', function() {
      $('#renameModal').modal('show');
      const sortId = $(this).parents('.card').attr('data-sort');
      $('#renameModal').find('.form-control').val(loadResumeSortData[sortId].name);
      $(document).on('click', '.save-rename-button', function() {
        loadResumeSortData[sortId].name = $('#renameModal').find('.form-control').val();
        $.ajax({
          url: baseURL + '/saveCurrentResume',
          type: 'post',
          dataType: 'json',
          timeout: 5000,
          headers: { 'x-csrf-token': $.cookie('csrfToken') },
          data: { resumeKey, saveResumeData: loadResumeSortData },
          success: ((response) => { getCurrentResume(1); message('已保存', 'success'); $('#renameModal').modal('hide'); }),
          error: ((error) => { message('保存失败', 'danger'); return false; })
        })
      })
    })
    
    //上移
    $(document).on('click', '.up-shift', function() {
      const sortId = Number($(this).parents('.list-group-item').attr('data-sort'));
      if(sortId < 2) {
        message('无法上移', 'danger');
      }else{
        loadResumeSortData[sortId] = loadResumeSortData.splice(sortId - 1, 1, loadResumeSortData[sortId])[0];
        publicResumeSortData = loadResumeSortData;
        eachResumeSortData();
      }
    })

    //下移
    $(document).on('click', '.down-shift', function() {
      const sortId = Number($(this).parents('.list-group-item').attr('data-sort'));
      if(sortId == 7 || sortId == 0) {
        message('无法下移', 'danger');
      }else{
        loadResumeSortData[sortId] = loadResumeSortData.splice(sortId + 1, 1, loadResumeSortData[sortId])[0];
        publicResumeSortData = loadResumeSortData;
        eachResumeSortData();
      }
    })

    //保存排序
    $(document).on('click', '.sort .save-sort-button', function() {
        $.ajax({
          url: baseURL + '/saveCurrentResume',
          type: 'post',
          dataType: 'json',
          timeout: 5000,
          headers: { 'x-csrf-token': $.cookie('csrfToken') },
          data: { resumeKey, saveResumeData: publicResumeSortData },
          success: ((response) => { getCurrentResume(); message('已保存', 'success'); }),
          error: ((error) => { message('保存失败', 'danger'); return false; })
        })
      })
    }

  //模块->模块开关
  function renderCurrentResumeModule() {
    $('.resume-left').find('.module').find('.module-on').html('');
    $('.resume-left').find('.module').find('.module-off').html('');
    var loadResumeModuleData = JSON.parse(resumeData.resume_data);
    eachModuleOnData();//已开启的模块
    function eachModuleOnData() {
      $('.resume-left').find('.module-on').html('');
      $.each(loadResumeModuleData, function(i, n) {
        switch(n.module) {
          case "basic":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">基本信息</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "intention":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">求职意向</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "education":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">教育经历</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "work":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">工作经历</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "project":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">项目经历</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "association":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">社团经历</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "certificate":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">技能证书</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
          case "appraise":
            if(n.status == 1) {
              $('.resume-left').find('.module-on').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">自我评价</span>\
                <span class="float-right font-size-20">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-off">-</a>\
                </span>\
              </li>')
            }
          break;
        }
      })
      if($('.resume-left').find('.module-on').html() == '') {
        $('.resume-left').find('.module-on').html('<span class="text-secondary font-size-14 text-center">全部已关闭</span>')
      }
    }
    eachModuleoffData();//已关闭的模块
    function eachModuleoffData() {
      $('.resume-left').find('.module-off').html('');
      $.each(loadResumeModuleData.filter(n => n.status == 0), function(i, n) {
        switch(n.module) {
          case "basic":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">基本信息</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "intention":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">求职意向</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "education":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">教育经历</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "work":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">工作经历</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "project":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">项目经历</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "association":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">社团经历</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "certificate":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">技能证书</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
          case "appraise":
              $('.resume-left').find('.module-off').append('\
                <li class="list-group-item list-group-item-active" data-module="' + n.module + '">\
                <span class="module-name font-size-14 float-left">自我评价</span>\
                <span class="float-right font-size-16">\
                  <a href="javascript:void(0);" class="module-status float-right text-dark rounded module-come-on">+</a>\
                </span>\
              </li>')
          break;
        }
      })
      if($('.resume-left').find('.module-off').html() == '') {
        $('.resume-left').find('.module-off').html('<span class="text-secondary font-size-14 text-center">全部已开启</span>')
      }
    }
    ModuleSwitch();//模块开关
    function ModuleSwitch() {
      //开启模块
      $(document).on('click', '.module-come-on', function() {
        const moduleName = $(this).parents('.list-group-item').attr('data-module');
        for(var i = 0; i < loadResumeModuleData.length; i++) {
          if(loadResumeModuleData[i].module == moduleName && loadResumeModuleData[i].status == 0) {
            loadResumeModuleData[i].status = "1";
            eachModuleOnData();//已开启的模块
            eachModuleoffData();//已关闭的模块
          }
        }
      })

      //关闭模块
      $(document).on('click', '.module-come-off', function() {
        const moduleName = $(this).parents('.list-group-item').attr('data-module');
        for(var i = 0; i < loadResumeModuleData.length; i++) {
          if(loadResumeModuleData[i].module == moduleName && loadResumeModuleData[i].status == 1) {
            loadResumeModuleData[i].status = "0";
            eachModuleOnData();//已开启的模块
            eachModuleoffData();//已关闭的模块
          }
        }
      })
    }

    //保存模块开关
    $(document).on('click', '.save-switch-button', function() {
      $.ajax({
        url: baseURL + '/saveCurrentResume',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        headers: { 'x-csrf-token': $.cookie('csrfToken') },
        data: { resumeKey, saveResumeData: loadResumeModuleData },
        success: ((response) => { getCurrentResume(); message('已保存', 'success'); }),
        error: ((error) => { message('保存失败', 'danger'); return false; })
      })
    })
  }

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
      data: { resumeCode: $('.resume-right .rounded').html(), resumeName: resumeData.resume_name },
      success: ((response) => { message('下载成功', 'success') }),
      error: ((error) => { console.log(error) })
    })
  })

  $('.print-resume').click(() => {
    alert("敬请期待...")
  })

  //提示框
  $('.resume-more').find('svg').tooltip();
  $('.download-resume').tooltip();
  $('.print-resume').tooltip();
  $('#colorFormControlSelect').tooltip();
  $('#fontFormControlSelect').tooltip();
  $('#lineFormControlSelect').tooltip();
  $('#sizeFormControlSelect').tooltip();
  $('#paddingFormControlSelect').tooltip();
})