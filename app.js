/**
 * Module dependencies.
 */
// 核心模块
var http = require('http');
var path = require('path');
var express = require('express');
// 路由模块
var entries =   require('./routes/entries');
var routes =    require('./routes/index');
var register =  require('./routes/register');
var login =     require('./routes/login');
var api =       require('./routes/api');

// models
var messages =  require('./lib/messages');
var Entry =     require('./lib/entry');

// 中间件
var user =      require('./lib/middleware/user');
var page =      require('./lib/middleware/page');
var validate =  require('./lib/middleware/validate');

var app = express();
// all environments
// 服务器基本功能配置
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
// 使用自定义中间件
app.use('/api', api.auth);// 基本认证: 保证API安全和限制的方式
app.use(user);
app.use(messages);
app.use(app.router);
app.use(routes.notfound);
app.use(routes.error);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// 注册
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/registerList', register.list);
// 登陆
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
// 上传文章
app.get('/post', entries.form);
app.post('/post', entries.submit);
// 首页
app.get('/:page?', page(Entry, 5), entries.list);

// 外部API
//app.get('/api/user/:id', api.user);
//app.post('/api/entry', entries.submit);
//app.get('/api/entries/:page?', page(Entry.count), api.entries);

if (process.env.ERROR_ROUTE) {
    app.get('/dev/error', function(req, res, next){
        var err = new Error('database connection failed');
        err.type = 'database';
        next(err);
    });
}

// 启动服务器
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
