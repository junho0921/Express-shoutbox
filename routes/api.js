var express = require('express');
var User = require('../lib/user');
var Entry = require('../lib/entry');

// basicAuth()中间件以一个函数为参数执行认证，函数签名为(username, password, callback)。而User.authenticate符合这个要求
exports.auth = express.basicAuth(User.authenticate);

exports.user = function(req, res, next){
  User.find({name: req.params.name}, function(err, user){
    user = user[0];
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
};

exports.entries = function(req, res, next){
  var page = req.page;
  Entry.getRange(page.from, page.to, function(err, entries){
    if (err) return next(err);

    //启用内容协商
    // 客户端可以指定它乐于接受的，以及喜欢的数据格式。
      // HTTP通过Accept请求头域提供了内容协商机制。
    //entries.reverse();
    res.format({
      json: function(){
        res.send(entries);
      },

      xml: function(){
        res.render('entries/xml', { entries: entries });
      }
    });
  });
};
