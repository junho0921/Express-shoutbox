var User = require('../user');

module.exports = function(req, res, next){
  /*每个请求都以userId抽取数据库的user数据*/
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
  }
  // 当用户ID出现时，表明用户已经通过认证了，所以从Redis中取出用户数据是安全的。
  // 借助session中间件, 读取缓存的通信记录, 获取userId
  var uid = req.session.uid;
  if (!uid) return next();
  User.find({_id:uid}, function(err, data){
    var user = data[0];
    if (err) {
      console.log('用户验证信息报错', err);
      return next(err);
    }else{
      console.log('本请求的用户信息', user);
    }
    req.user = res.locals.user = user;
    // callback后才交出中间件控制权
    next();
  });
};
