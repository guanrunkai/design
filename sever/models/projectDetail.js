var mongoose = require("../common/db");

var detail = new mongoose.Schema({
  departmentName: String,
  id: Number,
  pm: String,
  projectName: String,
  riskGrading: String,
  so: String,
  vulnNumber: Number,
  projectRisk: Number | String,
  riskGradingStr: String,
  safetyFactory: Number,
  vulnDelayNum: Number,
  vulnUnFixNum: Number,
  vulnFixedNum: Number,
  vulnCheckingNum: Number,
  vulnIgnoreNum: Number,
  highRiskVulnNum: Number,
  mediumRiskVulnNum: Number,
  lowRiskVulnNum: Number,
  warnRiskVulnNum: Number,
  createdTime: String,
});

detail.statics.findAll = (id, cb) => {
  detailModel.findOne({ id }, cb);
};

detail.statics.editSafe = (req, cb) => {
  console.log(req.body.id);
  detailModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: { safetyFactory: req.body.safetyFactory } },
    cb
  );
};

detail.statics.editRisk = (req, cb) => {
  detailModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: { riskGradingStr: req.body.riskGrading } },
    cb
  );
};

var detailModel = mongoose.model("detail", detail);

module.exports = detailModel;
