var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/router');
var app = express();
var auth = require('./routes/auth');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static assets from the /public folder
app.use('/*',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
  next();
});
app.use('/v1/',auth.verify);
app.use('/', routes);
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(function(req,res,next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var port = process.env.PORT || 5000;
var httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log('Server running on port ' + port + '.'));
