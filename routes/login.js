var User = require('../lib/user');

exports.form = function(req, res){
  res.render('login', { title: 'Login' });
};

exports.submit = function(req, res, next){
  var data = req.body.user;
  User.find({name: data.name}, function (err, datas) {
    var user = datas[0];
    if(!user){
      res.error("该用户不存在");
      res.redirect('back');
    }else if(err) {
      res.error("数据库崩溃了");
      res.redirect('back');
    }else if(data.pass !== user.pass){
      res.error("密码错误");
      res.redirect('back');
    }else{
      console.log('登陆的用户信息是', user);
      req.session.uid = user._id;
      res.redirect('/post');
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err) {
    if (err) throw err;
    res.redirect('/');
  });
};
