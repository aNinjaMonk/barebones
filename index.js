var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '8889',
  password: 'root',
  database: 'notes'
  //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('db/notes');
var express = require('express');
var app = express();
var router = express.Router();
var moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/*',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-type,Accept,X-Access-Token,X-Key');
  next();
});
app.get('/', function(req,res) {
  res.send('Notes running');
});

connection.connect();

app.use('/v1/',router);
router.get('/note',function(req,res){
  connection.query('SELECT * from NOTES',function(error,results,fields){
      if(error) throw error;
      res.send(results);
  });

});
router.post('/note',function(req,res){
  var post = {
    content: req.body.content
  };
  connection.query('INSERT INTO NOTES SET ?',post,function(error,results,fields){
        if(error){
          throw error;
          res.status(500).send(err);
        }
        else{
          res.status(200).send(results);
        }
    });
});
router.get('/sync',function(req,res){
  res.send('Start data sync ...');

  //Open connection to both databases.... mobile & server..
  //Call the sync code from client.


});
app.use(function(req,res,next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var port = process.env.PORT || 5000;
app.listen(port,function(){
  console.log('App listening on port : ' + port);
});
