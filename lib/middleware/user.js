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
  User.get(uid, function(err, user){
    if (err) return next(err);
    req.user = res.locals.user = user;
    // callback后才交出中间件控制权
    next();
  });
};
