//连接数据库
var mongoose = require('mongoose');
var url = 'mongodb://localhost/design';
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});


module.exports = mongoose;