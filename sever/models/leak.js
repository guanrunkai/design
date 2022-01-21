var mongoose = require("../common/db");

var leak = new mongoose.Schema({
  list: [
    {
      id: Number, // 漏洞总表的主键id,
      vulnId: String, // 具体漏洞引擎扫出来的漏洞id
      vulnType: String, // 漏洞类型
      projectId: Number, // 项目id
      projectName: String, // 项目名称
      departmentName: String, // 部门
      vulnDetectionType: Number, // 漏洞引擎  1、SCA；2、SAST；3、IAST；4、DAST；5、checkmax.sast；6、tenable.sc
      vulnLevel: String, // 漏洞等级  1:高危  2：中危 3：低危
      vulnStatus: String, // 漏洞状态  1：检查中 2：修复中 3：复测中  4：已修复 5：已忽略
      submitterName: String, // 提交人姓名
      ownerName: String, // 负责人姓名
      vulnFamilyId: Number, // 漏洞族id 暂时还没定好枚举
      assignReason: String, // 指派原因
      createdTime: String, // 创建时间
      modifiedTime: String, // 更新时间
      taskName: String, // 任务名称
      impact: String, // 漏洞影响相关
      url: String, // 漏洞地址
      argName: String, // 漏洞参数
    },
  ],
});

leak.statics.findAll = (req, cb) => {
  const page = req.body.page;
  const limit = req.body.limit;

  leakModel
    .findOne({}, cb)
    .skip((page - 1) * req.body.limit)
    .limit(limit);
};

var leakModel = mongoose.model("leaks", leak);

// var cc = new leakModel({
//   list: [
//     {
//       id: 123,
//       vulnId: 1234,
//       vulnType: "高危", // 漏洞类型
//       projectId: 123, // 项目id
//       projectName: "资产漏洞平台",
//       departmentName: "前端组", // 部门
//       vulnDetectionType: 1, // 漏洞引擎  1、SCA；2、SAST；3、IAST；4、DAST；5、checkmax.sast；6、tenable.sc
//       vulnLevel: "高危", // 漏洞等级  1:高危  2：中危 3：低危
//       vulnStatus: 1, // 漏洞状态  1：检查中 2：修复中 3：复测中  4：已修复 5：已忽略
//       submitterName: "关润开", // 提交人姓名
//       ownerName: "关润开", // 负责人姓名
//       vulnFamilyId: 44, // 漏洞族id 暂时还没定好枚举
//       assignReason: "指派的原因是因为...", // 指派原因
//       createdTime: Date.now(),
//       // 创建时间
//       modifiedTime: Date.now(), // 更新时间
//       taskName: "漏洞", // 任务名称
//       impact: "此漏洞影响组件使用", // 漏洞影响相关
//       url: "http:github.com", // 漏洞地址
//       argName: "漏洞参数是...", // 漏洞参数
//     },
//     {
//       id: 1234,
//       vulnId: 12345,
//       vulnType: "低危", // 漏洞类型
//       projectId: 1234, // 项目id
//       projectName: "上证资产漏洞",
//       departmentName: "软件", // 部门
//       vulnDetectionType: 1, // 漏洞引擎  1、SCA；2、SAST；3、IAST；4、DAST；5、checkmax.sast；6、tenable.sc
//       vulnLevel: "低危", // 漏洞等级  1:高危  2：中危 3：低危
//       vulnStatus: 1, // 漏洞状态  1：检查中 2：修复中 3：复测中  4：已修复 5：已忽略
//       submitterName: "关润开", // 提交人姓名
//       ownerName: "关润开", // 负责人姓名
//       vulnFamilyId: 44, // 漏洞族id 暂时还没定好枚举
//       assignReason: "指派的原因是因为...", // 指派原因
//       createdTime: Date.now(),
//       // 创建时间
//       modifiedTime: Date.now(), // 更新时间
//       taskName: "漏洞", // 任务名称
//       impact: "此漏洞影响组件使用", // 漏洞影响相关
//       url: "http:github.com", // 漏洞地址
//       argName: "漏洞参数是...", // 漏洞参数
//     },
//   ],
// });

// cc.save();

module.exports = leakModel;
