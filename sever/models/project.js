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
  const page = req.body.page;
  const limit = req.body.limit;

  projectModel
    .find({}, cb)
    .skip((page - 1) * req.body.limit)
    .limit(limit);
};

project.statics.findDepartment = (req, cb) => {
  projectModel.find({}, cb);
};

project.statics.deleteProject = function (req, cb) {
  projectModel.updateOne(
    {},
    { $pull: { list: { _id: req.body._id } } },
    { new: true },
    cb
  );
};

var projectModel = mongoose.model("project", project);

// var cc = new projectModel({
//   list: [
//     {
//       departmentName: "软件18-3",
//       id: 2,
//       pm: "关润开",
//       riskGrading: "低危",
//       so: "关润开",
//       vulnNumber: 100,
//       projectRisk: 3,
//       projectName: "黑工程毕设",
//     },
//     {
//       departmentName: "软件18-3",
//       id: 3,
//       pm: "关润开",
//       riskGrading: "安全",
//       so: "关润开",
//       vulnNumber: 100,
//       projectRisk: 4,
//       projectName: "黑工程毕设",
//     },
//     {
//       departmentName: "软件18-3",
//       id: 4,
//       pm: "关润开",
//       riskGrading: "中危",
//       so: "关润开",
//       vulnNumber: 100,
//       projectRisk: 2,
//       projectName: "黑工程毕设",
//     },
//     {
//       departmentName: "软件18-3",
//       id: 5,
//       pm: "关润开",
//       riskGrading: "高危",
//       so: "关润开",
//       vulnNumber: 100,
//       projectRisk: 1,
//       projectName: "黑工程毕设",
//     },
//   ],
// });

// cc.save();

module.exports = projectModel;
