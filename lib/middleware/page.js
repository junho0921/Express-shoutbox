module.exports = function(fn, perpage){
  perpage = perpage || 10;
  return function(req, res, next){
    var page = Math.max(
      parseInt(req.param('page') || '1', 10),
      1
    ) - 1;
    console.log('查询的页码', req.param('page'));

    fn.count(function(err, total){
      if (err) {
        console.log('本次请求获取entry数量失败');
        return next(err);
      }

      console.log('获取到的总数量', total);
      req.page = res.locals.page = {
        number: page,
        perpage: perpage,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      };

      next();
    });
  }
};