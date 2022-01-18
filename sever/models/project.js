var mongoose = require("../common/db");

var project = new mongoose.Schema({
  list: [
    {
      departmentName: String,
      id: Number,
      pm: String,
      projectName: String,
      riskGrading: String,
      so: String,
      vulnNumber: Number,
      projectRisk: Number | String,
    },
  ],
});

project.statics.findAll = (req, cb) => {
  console.log(req);
  projectModel.find({}, cb);
};

var projectModel = mongoose.model("project", project);

// var cc = new projectModel({
//   list: [
//     {
//       departmentName: "软件18-3",
//       id: 2,
//       pm: "关润开",
//       riskGrading: "高危",
//       so: "关润开",
//       vulnNumber: 100,
//       projectRisk: 3,
//       projectName: "黑工程毕设",
//     },
//   ],
// });

// cc.save();

module.exports = projectModel;
