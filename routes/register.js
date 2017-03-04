var User = require('../lib/user');

exports.form = function(req, res){
  res.render('register', { title: 'Register' });
};

exports.list = function(req, res){
  User.find(function (err, users) {
    if(err){
      console.log('查询数据库失败')
    }else{
      res.render('registerList', { users: users });
    }
  });
};

exports.submit = function(req, res, next){
  var data = req.body.user;

  var user = new User({
    name: data.name,
    pass: data.pass
  });

  user.save(function (err, data) {
    if(err){
      res.error("Username already taken!");
      res.redirect('back');
      // 条件判断非用户已注册
      //if (err) return next(err);
    }else{

      console.log('成功注册');
      req.session.uid = user.id;
      res.redirect('/registerList');
      //res.redirect('/');
    }
  });
  /*
  User.getByName(data.name, function(err, user){
    if (err) return next(err);

    if (user.id) {
      res.error("Username already taken!");
      res.redirect('back');
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      });

      user.save(function(err){
        if (err) return next(err);
        req.session.uid = user.id;
        res.redirect('/');
      });
    }
  });
  */
};
