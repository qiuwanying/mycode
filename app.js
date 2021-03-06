var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();


app.get('/data/:module', function (req, res, next) {
    var c_path = req.params.module;
    var Action = require('./server/action/' + c_path);
    Action.execute(req, res);
});

// 对所有的路径返回index.html
app.get('/', function (req, res) {
    res.render('index');
});

// 设置ciews路径和模版
app.set('views', './client/template/');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 静态文件配置
app.use('/client/static', express.static(path.join(__dirname, 'client/static')));


// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
}); 