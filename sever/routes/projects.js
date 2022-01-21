var express = require("express");
var router = express.Router();

var projectModel = require("../models/project");
var detailModel = require("../models/projectDetail");
var safeKnowledgeModel = require("../models/safeKnowledge");
var auditModel = require("../models/audit");

var handleCondition = require("../common/handleCondition");

const getCurrentList = (data, condition) => {
  var nowList = [];
  data.map((item) => nowList.push(...item.list));

  var nowData = {
    list:
      (condition.projectRisk && condition.projectRisk !== " ") ||
      (condition.departmentId && condition.departmentId !== "") ||
      (condition.pattern && condition.pattern !== "")
        ? nowList.filter((item) => {
            if (
              condition.departmentId &&
              (condition.projectRisk == " " || !condition.projectRisk) &&
              (condition.pattern == "" || !condition.pattern)
            ) {
              return item.departmentName == condition.departmentId;
            } else if (
              condition.projectRisk &&
              (condition.departmentId == "" || !condition.departmentId) &&
              (condition.pattern == "" || !condition.pattern)
            ) {
              return item.projectRisk == condition.projectRisk;
            } else if (
              condition.pattern &&
              (condition.departmentId == "" || !condition.departmentId) &&
              (condition.projectRisk == " " || !condition.projectRisk)
            ) {
              return item.projectName.includes(condition.pattern);
            } else if (
              condition.departmentId &&
              condition.projectRisk &&
              (!condition.pattern || condition.pattern == "")
            ) {
              return (
                item.projectRisk == condition.projectRisk &&
                item.departmentName == condition.departmentId
              );
            } else if (
              condition.departmentId &&
              condition.pattern &&
              (!condition.projectRisk || condition.projectRisk == " ")
            ) {
              return (
                item.departmentName == condition.departmentId &&
                item.projectName.includes(condition.pattern)
              );
            } else if (
              condition.pattern &&
              condition.projectRisk &&
              (!condition.departmentId || condition.departmentId == "")
            ) {
              return (
                item.projectName.includes(condition.pattern) &&
                item.projectRisk == condition.projectRisk
              );
            }
          })
        : condition.departmentId
        ? item.departmentName == condition.departmentId
        : nowList,
    pageNo: 1,
    total: nowList.length,
  };
  return nowData;
};

const successFunction = (res, data, condition) => {
  return res.json({
    status: 1,
    message: "查询成功",
    data: getCurrentList(data, condition),
    code: 2000,
  });
};

router.post("/getAllProjects", function (req, res) {
  var condition = req.body.condition;

  projectModel.findAll(req, (err, data) => {
    successFunction(res, data, condition);
  });
});

router.get("/getAllDepartment", function (req, res) {
  projectModel.findDepartment(req, (err, data) => {
    var nowList = [];
    var departmentList = [];
    data.map((item) => nowList.push(...item.list));
    nowList.map((item) => departmentList.push(item.departmentName));

    res.json({
      status: 1,
      message: "查询成功",
      data: [...new Set(departmentList)],
      code: 2000,
    });
  });
});

router.post("/addProject", function (req, res) {
  const randomNumberId = Math.floor(Math.random() * (500 - 1 + 1) + 1);
  var addProject = new projectModel({
    list: [
      {
        id: randomNumberId,
        projectName: req.body.projectName,
        departmentName: req.body.departmentName,
        pm: req.body.pm,
        so: req.body.so,
        vulnNumber: req.body.vulnNumber,
        projectRisk: req.body.projectRisk,
        riskGrading: req.body.riskGrading,
      },
    ],
  });
  addProject.save();

  var addDetail = new detailModel({
    projectName: req.body.projectName,
    departmentName: req.body.departmentName,
    pm: req.body.pm,
    so: req.body.so,
    vulnNumber: req.body.vulnNumber,
    projectRisk: req.body.projectRisk,
    riskGrading: req.body.riskGrading,
    id: randomNumberId,
    riskGradingStr: req.body.riskGrading,
    safetyFactory: Math.floor(Math.random() * (100 - 1 + 1) + 1),
    vulnDelayNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 复测中漏洞数
    vulnUnFixNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 修复中漏洞数
    vulnFixedNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 已修复漏洞数
    vulnCheckingNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 检查中漏洞数
    vulnIgnoreNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 已忽略漏洞数
    highRiskVulnNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 高危漏洞数
    mediumRiskVulnNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 中危漏洞数
    lowRiskVulnNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 低危漏洞数
    warnRiskVulnNum: Math.floor(Math.random() * (100 - 1 + 1) + 1), // 提示漏洞数,
    createdTime: Date.now(),
  });
  addDetail.save();
  res.send({ code: 2000, message: "新建成功" });
});

router.post("/deleteProject", function (req, res) {
  projectModel.deleteProject(req, function (err, data) {
    res.send({ code: 2000, message: "删除成功" });
  });
});

router.get("/getProjectDetail", function (req, res) {
  detailModel.findAll(req.query.id, function (err, data) {
    if (!req.query.id) {
      res.send("缺少项目ID");
    } else {
      res.send({ code: 2000, message: "查找成功", data: data });
    }
  });
});

router.post("/projectEditSafe", function (req, res) {
  detailModel.editSafe(req, function (err, data) {
    res.send({ code: 2000, message: "成功修改" });
  });
});

router.post("/projectEditRisk", function (req, res) {
  detailModel.editRisk(req, function (err, data) {
    res.send({ code: 2000, message: "成功修改" });
  });
});

//安全知识库

router.post("/safeKnowledge", function (req, res) {
  safeKnowledgeModel.findAll(req, function (err, data) {
    const nowData = req.body.condition.name
      ? {
          list: data.list.filter((item) =>
            item.name.includes(req.body.condition.name)
          ),
        }
      : data;
    res.send({ data: nowData, code: 2000, message: "查询成功" });
  });
});

//日志审计

router.post("/auditPage", async (req, res) => {
  console.log(handleCondition(req.body.condition));
  const key = [...Object.keys(req.body.condition)];
  const value = [...Object.values(req.body.condition)];

  if (value == "") {
    await auditModel.findAll(req, function (err, data) {
      res.send({ code: 2000, message: "查询成功", data: data });
    });
  } else {
    let nowData = await auditModel.aggregate([
      { $match: handleCondition(req.body.condition) },
    ]);

    var currentList = [];
    nowData.map((item) => currentList.push(...item.list));
    res.send({
      code: 2000,
      message: "查询成功",
      data: { list: currentList, pageNo: 1, total: currentList.length },
    });
  }
});

module.exports = router;
