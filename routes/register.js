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

function validate(name, pass){
  if(!name){
    return '不可以没有姓名'
  }
  if(!pass){
    return '请输入密码';
  }
  if(name.length < 2){
    return '名字需要大于等于2位'
  }
  if(name.indexOf('主席') >= 0 ||
      name.indexOf('皇帝') >= 0 ||
      name.indexOf('那个') >= 0){
    return '改名字不能注册'
  }
}
exports.submit = function(req, res, next){
  var data = req.body.user;

  var validateResult = validate(data.name, data.pass);
  if(validateResult){
    res.error(validateResult);
    res.redirect('back');
    return;
  }
  var user = new User({
    name: data.name,
    pass: data.pass
  });

  user.save(function (err, data) {
    if(err){
      console.log('注册失败原因', err);
      if(err.code == 11000){
        res.error("该名称已被注册");
        res.redirect('back');
      }
    }else{
      console.log('成功注册');
      req.session.uid = user.id;
      res.redirect('/');
    }
  });
};
