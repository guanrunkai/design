var crypto=require('crypto')
var init_token = 'sdasdasdasdasdasa'; //密钥
function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    //加密的时候习惯性的将  用户信息+密钥
    var token_before = id + init_token;  //等待加密的token
    var token_after = md5.update(token_before).digest('hex'); //加密好的token
    return token_after;
}
module.exports=getMD5Password
