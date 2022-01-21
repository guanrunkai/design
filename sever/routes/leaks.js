var express = require("express");
const handleCondition = require("../common/handleCondition");
var router = express.Router();

var leakModel = require("../models/leak");

router.post("/getLeakList", async (req, res) => {
  if (req.body.condition) {
    let nowData = await leakModel.aggregate([
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
    await leakModel.findAll(req, function (err, data) {
      res.send({ code: 2000, data: data, message: "查询成功" });
    });
  }
});

module.exports = router;
