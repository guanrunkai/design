var express = require('express');
var router = express.Router();
var userModel = require('../models/user')
var async = require('async')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res){

  
    userModel.admitLogin(req,function(err,userSave){
        
      if(userSave.length !==0){
      res.json({status:1,message:'登录成功',data:userSave,code:2000})
      }else {
        
        res.json({message:'用户名或密码错误'})
      }
      
    })
  }


   
)

router.post('/register',function(req,res){

  userModel.findByUserName(req,function(err,userSave){
    // console.log('asd',userSave);
    if(userSave.length!==0){

      res.json({status:1,message:'用户已经注册'})
    }else {
      const {userName,password} =req.body
      var registerUser = new userModel({
        userName,password
      })
      registerUser.save()
    }
  })
})

module.exports = router;
