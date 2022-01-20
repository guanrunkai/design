var mongoose = require("../common/db");

var safeKnowledge = new mongoose.Schema({
  list: [
    {
      id: Number,
      // type: Number,
      name: String,
      desc: String,
      repairAdvice: String,
    },
  ],
});

safeKnowledge.statics.findAll = function (req, cb) {
  safeKnowledgeModel.findOne({}, cb);
};

var safeKnowledgeModel = mongoose.model("safeKnowledge", safeKnowledge);

// var asd = new safeKnowledgeModel({
//   list: [
//     {
//       id: 123,
//       type: 1,
//       name: "这是一条来自外部威胁的安全知识库信息",
//       desc: "此安全知识库仅对于测试",
//       repairAdvice: "修复建议来自",
//     },
//     {
//       id: 1243,
//       type: 2,
//       name: "这是一条来自外部威胁的安全知识库信息",
//       desc: "此安全知识库仅对于测试",
//       repairAdvice: "修复建议来自",
//     },
//     {
//       id: 12453,
//       type: 3,
//       name: "这是一条来自外部威胁的安全知识库信息",
//       desc: "此安全知识库仅对于测试",
//       repairAdvice: "修复建议来自",
//     },
//     {
//       id: 121233,
//       type: 3,
//       name: "这是一条来自外部威胁的安全知识库信息",
//       desc: "此安全知识库仅对于测试",
//       repairAdvice: "修复建议来自",
//     },
//   ],
// });

// asd.save();

module.exports = safeKnowledgeModel;
