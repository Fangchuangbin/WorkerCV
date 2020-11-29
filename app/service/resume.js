const Service = require('egg').Service;
const crypto = require('crypto');
const moment = require('moment');

//公共变量
var success = { code: 20000, message: '请求成功' };
var fail = { code: 40000, message: '请求失败' }

class ResumeService extends Service {

  //我的简历
  async getResumeList(loginToken) {
    const { ctx, app } = this;
    const getUser = await app.mysql.get('workercv_user', { login_token: loginToken });//获取loginToken所属用户ID
    const getResumeList = await app.mysql.select('workercv_resume', { where: { user_id: getUser.id }, orders: [['update_time', 'desc']] });//获取该用户ID的所有简历
    if(getResumeList) {
      return { result: success, getResumeList, getUser }
    }else{
      return { result: fail }
    }
  }

  //编辑简历
  async getResumeContent(resumeKey) {
    const { ctx, app } = this;
    const getResumeContent = await app.mysql.get('workercv_resume', { resume_key: resumeKey });//获取简历详情
    if(getResumeContent) {
      return { result: success, getResumeContent }
    }else{
      return { result: fail }
    }
  }

  //获取当前简历
  async getCurrentResume(currentResumeData) {
    const { ctx, app } = this;
    const getCurrentResume = await app.mysql.get('workercv_resume', { resume_key: currentResumeData.resumeKey });//获取loginToken的所属简历
    if(getCurrentResume) {
      return { result: success, getCurrentResume }
    }else{ return { result: fail } }
  }

  //获取当前简历所属模板
  async getCurrentResumeTemplate(currentResumeTemplateData) {
    const { ctx, app } = this;
    const getCurrentResume = await app.mysql.get('workercv_resume', { resume_key: currentResumeTemplateData.resumeKey });//获取loginToken的所属简历
    if(getCurrentResume) {
      const getCurrentResumeTemplate = await app.mysql.get('workercv_template', { template_key: getCurrentResume.template_key })//获取当前简历所属的模板
      if(getCurrentResumeTemplate) { return { result: success, getCurrentResumeTemplate }
      }else{ return { result: fail } }
    }else{ return { result: fail } }
  }
  
  //保存更改
  async saveCurrentResume(resumeData) {
    const { ctx, app } = this;
    const saveCurrentResume = await app.mysql.update('workercv_resume', { resume_data: JSON.stringify(resumeData.saveResumeData) }, { where: { resume_key: resumeData.resumeKey } })
    if(saveCurrentResume.affectedRows === 1) {
      return { result: success }
    }else{
      return { result: fail }
    }
  }

  //修改简历名称
  async changeCurrentResumeName(resumeData) {
    const { ctx, app } = this;
    const changeCurrentResumeName = await app.mysql.update('workercv_resume', { resume_name: resumeData.resumeName }, { where: { resume_key: resumeData.resumeKey } })
    if(changeCurrentResumeName.affectedRows === 1) {
      return { result: success }
    }else{
      return { result: fail }
    }
  }

  //修改简历配置
  async changeCurrentResumeConfig(resumeData) {
    const { ctx, app } = this;
    const changeCurrentResumeConfig = await app.mysql.update('workercv_resume', { resume_config: JSON.stringify(resumeData.resumeConfig) }, { where: { resume_key: resumeData.resumeKey } })
    if(changeCurrentResumeConfig.affectedRows === 1) {
      return { result: success }
    }else{
      return { result: fail }
    }
  }

  //新建简历
  async createResume(resumeData) {
    const { ctx, app } = this;
    //初始化简历数据
    var initResumeData = [
      {
        "name":"基本信息",
        "status":"1",
        "module":"basic",
        "data":{
          "realname":"你的姓名",
          "phone":"手机号码",
          "address":"现居地址",
          "email":"电子邮箱",
          "education":"学历",
          "work_time":"工作时间",
          "introduce":"用一句话来介绍你自己！",
          "avatar":"http://image-workercv.test.upcdn.net/009862297f62849aefef6a6687a71c7d.jpg"
        }
      },
      {
        "name":"求职意向",
        "status":"1",
        "module":"intention",
        "data":{
          "position":"岗位名称",
          "city":"城市名称",
          "salary":"目标薪资",
          "arrive_time":"设置时间"
        }
      },
      {
        "name":"教育经历",
        "status":"1",
        "module":"education",
        "data":[
          {
            "school":"学校名称",
            "time":"开始时间 - 结束时间",
            "city":"所在城市",
            "department":"所在院系",
            "level":"学历层次",
            "major":"你的专业",
            "content":"尽量简洁，突出重点，成绩优异的话建议写上GPA及排名等信息，如：GPA：3.72/4（专业前10%）GRE：324"
          }
        ]
      },
      {
        "name":"项目经历",
        "module":"project",
        "status":"1",
        "data":[
          {
            "project":"项目名称",
            "time":"设置时间",
            "position":"所在职位",
            "content":"描述你参加的项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩。"
          }
        ]
      },
      {
        "name":"工作经历",
        "status":"1",
        "module":"work",
        "data":[
          {
            "company":"公司名称",
            "time":"开始时间 - 结束时间",
            "position":"所在职位",
            "city":"所在城市",
            "content":"详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精准。"
          }
        ]
      },
      {
        "name":"社团经历",
        "module":"association",
        "status":"1",
        "data":[
          {
            "association":"社团名称",
            "time":"设置时间",
            "position":"所在职位",
            "content":"描述你参加的社团负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩。"
          }
        ]
      },
      {
        "name":"技能证书",
        "module":"certificate",
        "status":"1",
        "data":{
          "skill":"技能特长",
          "prove":"证书名称"
        }
      },
      {
        "name":"自我评价",
        "module":"appraise",
        "status":"1",
        "data":{
          "introduce":"篇幅不要太长，注意结合简历整体的美观度，如果真的有很多话要说，建议以求职信的形式附上。自我评价应做到突出自身符合目标岗位要求的“卖点”，避免过多使用形容词，而应该通过数据及实例来对自身价值进行深化。"
        }
      }
    ];
    var initResumeConfig = {
      "color":"#000000",
      "font":"微软雅黑",
      "size":"14px",
      "line":"1.2",
      "padding":"35px"
    };
    initResumeData[0].data.realname = resumeData.newResumeData.realname;
    initResumeData[0].data.phone = resumeData.newResumeData.phone;
    initResumeData[0].data.email = resumeData.newResumeData.email;
    initResumeData[0].data.introduce = resumeData.newResumeData.introduce;
    const updateTime = JSON.stringify(Date.now());
    const resumeKey = crypto.createHash('md5').update(resumeData.userId + updateTime).digest('hex');//用户ID+时间戳
    const createResume = await app.mysql.insert('workercv_resume', {
      user_id: resumeData.userId,
      template_key: resumeData.templateKey,
      resume_key: resumeKey,
      resume_name: resumeData.newResumeData.resumeName,
      update_time: updateTime,
      resume_data: JSON.stringify(initResumeData),
      resume_config: JSON.stringify(initResumeConfig),
     })
     if(createResume.affectedRows === 1) {
       return { result: success, resume_key: resumeKey }
     }else{
       return {result: fail }
     }
  }

  //删除简历
  async deleteResume(resumeData) {
    const { ctx, app } = this;
    const deleteResume = await app.mysql.delete('workercv_resume', { resume_key: resumeData.resumeKey })
    if(deleteResume.affectedRows === 1) {
      return { result: success }
    }else{
      return { result: fial }
    }
  }
}

module.exports = ResumeService;