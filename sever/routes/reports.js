var express = require("express");
var router = express.Router();

const handleCondition = require("../common/handleCondition");

var reportModel = require("../models/report");

router.post("/getReportList", async (req, res) => {
  if (req.body.condition) {
    let nowData = await reportModel.aggregate([
      { $unwind: "$list" },
      { $match: handleCondition(req.body.condition, "projectName") },
    ]);

    let arr = [];
    nowData.map((item) => {
      return arr.push(item.list);
    });

    res.send({
      code: 2000,
      data: {
        list: arr || [],
        pageNo: 1,
        total: arr || 0,
      },
    });
  } else {
    await reportModel.findAll(req, (err, data) => {
      res.send({ code: 2000, data: data });
    });
  }
});

module.exports = router;
