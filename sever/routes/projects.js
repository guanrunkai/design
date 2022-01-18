var express = require("express");
var router = express.Router();

var projectModel = require("../models/project");

router.post("/getAllProjects", function (req, res) {
  projectModel.findAll(req, (err, data) => {
    var nowList = [];
    data.map((item) => nowList.push(...item.list));

    const nowData = { list: nowList, pageNo: 1, total: nowList.length };
    res.json({
      status: 1,
      message: "查询成功",
      data: nowData,
      code: 2000,
    });
  });
});

module.exports = router;
