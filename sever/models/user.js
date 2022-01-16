var mongoose = require('../common/db')


var user = new mongoose.Schema({
  userName : String,
  password : String 
})

user.statics.findAll = ()=>{

}

user.statics.admitLogin =function(req,cb){
 
  const {userName,password} =req.body
     
  this.find({userName,password},cb)
}

user.statics.findByUserName = function (req,cb){
  const {userName,password} =req.body
  this.find({userName,password},cb)
}

var userModel = mongoose.model('user',user)

module.exports  = userModel