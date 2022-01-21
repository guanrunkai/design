var mongoose = require("../common/db");

var report = new mongoose.Schema({
  list: [
    {
      id: Number,
      projectId: Number,
      projectName: String,
      departmentId: Number,
      departmentName: String,
      reportName: String,
      reportType: String,
      reportTypeStr: String,
      generator: String,
      createTime: String,
      exportStatus: String, // 1 2 3 4
      exportStatusStr: String, // 1：生成中 2：生成成功 3：生成失败 4：已过期
      reportFormat: String, // 报告格式 1：WORD 2：EXCEL
      engineTypeStr: String,
    },
  ],
});

report.statics.findAll = (req, cb) => {
  reportModel.findOne({}, cb);
};

var reportModel = mongoose.model("report", report);

// var cc = new reportModel({
//   list: [
//     {
//       id: 123,
//       projectId: 123,
//       projectName: "项目资产漏洞",
//       departmentId: 123,
//       departmentName: "软件18-3",
//       reportName: "漏洞报告1",
//       reportType: "项目报告",
//       reportTypeStr: "项目报告",
//       generator: "关润开",
//       createTime: "2022/4/21",
//       exportStatus: "生成成功", // 1 2 3 4
//       exportStatusStr: "生成成功", // 1：生成中 2：生成成功 3：生成失败 4：已过期
//       reportFormat: "WORD", // 报告格式 1：WORD 2：EXCEL
//       engineTypeStr: "SCA",
//     },
//     {
//       id: 1423,
//       projectId: 12344,
//       projectName: "项目资产漏洞",
//       departmentId: 12443,
//       departmentName: "软件18-3",
//       reportName: "漏洞报告1",
//       reportType: "引擎报告",
//       reportTypeStr: "引擎报告",
//       generator: "关润开",
//       createTime: "2022/4/21",
//       exportStatus: "3：生成失败", // 1 2 3 4
//       exportStatusStr: "3：生成失败", // 1：生成中 2：生成成功 3：生成失败 4：已过期
//       reportFormat: "WORD", // 报告格式 1：WORD 2：EXCEL
//       engineTypeStr: "SCA",
//     },
//     {
//       id: 1234,
//       projectId: 1234,
//       projectName: "项目资产漏洞",
//       departmentId: 1234,
//       departmentName: "软件18-3",
//       reportName: "漏洞报告1",
//       reportType: "任务报告",
//       reportTypeStr: "任务报告",
//       generator: "关润开",
//       createTime: "2022/4/21",
//       exportStatus: "已过期", // 1 2 3 4
//       exportStatusStr: "已过期", // 1：生成中 2：生成成功 3：生成失败 4：已过期
//       reportFormat: "WORD", // 报告格式 1：WORD 2：EXCEL
//       engineTypeStr: "SCA",
//     },
//   ],
// });
// cc.save();

module.exports = reportModel;
