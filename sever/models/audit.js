var mongoose = require("../common/db");

var audit = new mongoose.Schema({
  list: [
    {
      id: Number,
      auditTime: String,
      eventResult: Number,
      eventResultStr: String,
      eventType: Number,
      eventTypeStr: String,
      ip: String,
      roleName: String,
      userId: Number,
      username: String,
      eventDesc: String,
    },
  ],
});

audit.statics.findAll = (req, cb) => {
  auditModel.findOne({}, cb);
};

var auditModel = mongoose.model("audit", audit);

// var cc = new auditModel({
//   list: [
//     {
//       id: 12,
//       username: "关润开",
//       roleName: "管理员",
//       ip: "192.168.0.1",
//       eventTypeStr: "紧急事件",
//       eventResultStr: "完成",
//       auditTime: "2022/1/20",
//       eventDesc: "这是一段默认的描述",
//     },
//   ],
// });

// cc.save();

module.exports = auditModel;
