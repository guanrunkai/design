var express = require("express");
var router = express.Router();

var projectModel = require("../models/project");

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
              condition.projectRisk == " " &&
              condition.pattern == ""
            ) {
              return item.departmentName == condition.departmentId;
            } else if (
              condition.projectRisk &&
              condition.departmentId == "" &&
              condition.pattern == ""
            ) {
              return item.projectRisk == condition.projectRisk;
            } else if (
              condition.pattern &&
              condition.departmentId == "" &&
              condition.projectRisk == " "
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

module.exports = router;
