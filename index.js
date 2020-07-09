var http = require('http');
var express = require('express');
var path = require('path');
var static = require('serve-static');

var app = express();
const PORT  = 3000;

app.use(static(path.join(__dirname, 'public/')));
app.set('port', process.env.PORT || PORT);

app.get('/', function(req, res){
    res.redirect('appMain.html');
});
app.get('/movie', function(req, res){
    res.redirect('html/Movie_character_view.html');
});
app.get('/ani', function(req, res){
    res.redirect('html/Animation_character_view.html');
});
app.get('/test', function(req, res){
    res.redirect('html/testpage.html');
});
app.get('/result', function(req, res){
    res.redirect('html/resultPage.html');
});
app.get('/loading', function(req, res){
    res.redirect('html/LoadingPage.html');
});
app.get('/intro', function(req, res){
    res.redirect('html/Introduction_our_team_member.html');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Server START ..." + app.get('port'));
    console.log("여기로 웹페이지 들어갈 수 있습니다! : https://team-no-2-sp-fjczd.run.goorm.io/");
});