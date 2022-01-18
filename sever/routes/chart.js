var express = require("express");
var router = express.Router();
var chartModel = require("../models/chart");

router.get("/getChartData", function (req, res) {
  chartModel.findAll(req, function (day, userSave) {
    var currentDay = req.query.day === "1" ? 7 : 30;

    var currentData = userSave.map((item) => ({
      engineName: item.engineName,
      vulnFixedSumList: item.vulnFixedSumList.slice(0, currentDay),
    }));

    res.json({
      status: 1,
      message: "查询成功",
      data: currentData,
      code: 2000,
    });
  });
});

module.exports = router;
