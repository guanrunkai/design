var express = require("express");
var router = express.Router();
var userModel = require("../models/user");

router.post("/login", function (req, res) {
  userModel.admitLogin(req, function (err, userSave) {
    console.log(userSave);
    if (userSave.length !== 0) {
      res.json({ status: 1, message: "登录成功", data: userSave, code: 2000 });
    } else {
      res.json({ message: "用户名或密码错误" });
    }
  });
});

router.post("/userInfo", async (req, res) => {
  await userModel.findAll(req, function (err, data) {
    res.send({ code: 2000, data: data });
  });
});

router.post("/register", function (req, res) {
  userModel.findByUserName(req, function (err, userSave) {
    // console.log('asd',userSave);
    if (userSave.length !== 0) {
      res.json({ status: 1, message: "用户已经注册" });
    } else {
      const { username, password } = req.body;
      var registerUser = new userModel({
        username,
        password,
      });
      registerUser.save();
    }
  });
});

module.exports = router;
