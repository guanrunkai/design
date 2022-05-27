var mongoose = require("../common/db");

var user = new mongoose.Schema({
  username: String,
  password: String,
  realName: String,
  email: String,
  phone: String,
  department: String,
  remind: String, // 提醒方式
  remindDesc: String, // 提醒方式
  modifiedTime: String,
  statusStr: String,
  status: String,
  loginTime: String,
  authorities: [String],
  funcList: [String],
});

user.statics.findAll = (req, cb) => {
  const { username } = req.body;
  userModel.findOne({ username }, cb);
};

user.statics.admitLogin = function (req, cb) {
  const { username, password } = req.body;
  console.log(req);
  this.find({ username, password }, cb);
};

user.statics.findByUserName = function (req, cb) {
  const { username, password } = req.body;
  this.find({ username, password }, cb);
};

var userModel = mongoose.model("user", user);

// var cc = new userModel({
//   username: "guanrunkai",
//   password: "qwe123456",
//   realName: "关润开",
//   email: "602768492@qq.com",
//   phone: "13288888888",
//   department: "软件18-3",
//   remind: "String", // 提醒方式
//   remindDesc: "String", // 提醒方式
//   modifiedTime: "2022/1/22",
//   statusStr: "完成",
//   status: "完成",
//   loginTime: "2022/1/22",
//   authorities: ["asd"],
//   funcList: ["qwe"],
// });

// cc.save();

module.exports = userModel;
