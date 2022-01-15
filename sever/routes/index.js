var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('123')
});

router.get('/test',function(req,res){
mongoose.connect('mongodb://localhost/design',{useNewUrlParser: true, useUnifiedTopology: true})

//封装集合 
var Cat = mongoose.model('Cat',{name:String})
var kitty = new Cat({name:'asd'})
kitty.save().then(() => console.log('meow'));
})

module.exports = router;


