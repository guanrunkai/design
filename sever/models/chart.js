var mongoose = require("../common/db");

var chart = new mongoose.Schema({
  engineName: String,
  vulnFixedSumList: [
    {
      vulnFixedNum: Number,
      date: String,
    },
  ],
});

chart.statics.findAll = (req, cb) => {
  chartModel.find({}, cb);
};

var chartModel = mongoose.model("chart", chart);

// var cc = new chartModel({
//   engineName: "常规扫描",
//   vulnFixedSumList: [
//     { vulnFixedNum: 12, date: "2022-04-04" },
//     { vulnFixedNum: 99, date: "2022-04-05" },
//     { vulnFixedNum: 66, date: "2022-04-06" },
//     { vulnFixedNum: 33, date: "2022-04-07" },
//     { vulnFixedNum: 55, date: "2022-04-08" },
//     { vulnFixedNum: 22, date: "2022-04-09" },
//     { vulnFixedNum: 44, date: "2022-04-10" },
//     { vulnFixedNum: 11, date: "2022-04-11" },
//     { vulnFixedNum: 2, date: "2022-04-12" },
//     { vulnFixedNum: 55, date: "2022-04-13" },
//   ],
// });
// cc.save();

module.exports = chartModel;
