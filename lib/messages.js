var express = require('express');
var res = express.response;

/*
* 给response原型添加api向session添加: 进度信息
* */
res.message = function(msg, type){
  type = type || 'info';
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push({ type: type, string: msg });
};

res.error = function(msg){
  return this.message(msg, 'error');
};

/*
* 输出中间件, 给每个res实例添加清理进度信息
* */
module.exports = function(req, res, next){
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = function(){
    req.session.messages = [];
  };
  next();
};
