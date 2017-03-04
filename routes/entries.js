var Entry = require('../lib/entry');

exports.list = function(req, res, next){
  var page = req.page;
  Entry.getRange(page.from, page.to, function(err, entries) {
    if (err) return next(err);
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
};

exports.form = function(req, res){
  res.render('post', { title: 'Post' });
};

exports.submit = function(req, res, next){

  if(!res.locals.user || !res.locals.user.name){
    res.redirect('/login');
    return;
  }
  var data = req.body.entry;
  var entry = new Entry({
    username: res.locals.user.name,
    title: data.title,
    body: data.body
  });

  entry.save(function(err, data) {
    if (err) return next(err);
    if (req.remoteUser) {
      res.json({message: 'Entry added.'});// 提供给外部接口的成功信息
    } else {
      console.log('成功提交entry信息', data);
      res.redirect('/');
    }
  });
};
