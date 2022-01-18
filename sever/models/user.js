var mongoose = require('../common/db')


var user = new mongoose.Schema({
  username : String,
  password : String 
})

user.statics.findAll = ()=>{

}

user.statics.admitLogin =function(req,cb){
 
  const {username,password} =req.body
     
  this.find({username,password},cb)
}

user.statics.findByUserName = function (req,cb){
  const {username,password} =req.body
  this.find({username,password},cb)
}

var userModel = mongoose.model('user',user)

module.exports  = userModel