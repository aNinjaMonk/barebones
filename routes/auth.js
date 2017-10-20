var jwt = require('jsonwebtoken');
var models = require('../models/model');
var secret = require('../app/constant').SECRET;
const crypto = require('crypto');

var auth = {
  login: function(req,res){
    var username = req.body.username || '';
    var password = req.body.password || '';

    if(username == '' || password == ''){
      res.status(401).send({"status":401,"message":"Invalid Credentials"});
      return;
    }

    models.User.findOne({
      username: username,
      password: encryptPassword(password)
    },function(err,user){
      if(err) throw err;
      if(!user){
        res.status(401).send({success: false, message: 'Authentication failed. User not found.'});
      }
      else if(user){
        if(user.password != encryptPassword(password)){
          res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
        }
        else{
          var expires = expiresIn(7);
          console.log(user);
          var token = jwt.sign({username:user.username,password:user.password},secret,{
            expiresIn: expires
          });
          res.send({
            sucess:true,
            token: token
          });
        }
      }
    });
  },
  signup: function(req,res){
    var username = req.body.username || '';
    var password = req.body.password || '';
    var email = req.body.email;

    if(username == '' || password == '' || email == ""){
      res.status(401).send({"status":401,"message":"Required"});
      return;
    }

    var user = new models.User();
    user.username = username;
    user.password = encryptPassword(password);
    user.email = email;
    user.save(function(err,user){
      if(err){
        res.status(401).send({success: false, message: 'Error creating User.'});
      }
      else{
        res.send(user);
      }
    });
  },
  logout: function(req,res){

  },
  verify : function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
      jwt.verify(token,secret,function(err,decoded){
        if(err){
          return res.json({success:false,message:"Failed to authenticate token."});
        }
        else{
            req.decoded = decoded;
            next();
        }
      });
    }
    else{
      return res.status(403).send({
        success:false,
        message: "No Token provided."
      });
    }
  }
}
function encryptPassword(password) {
  return crypto.createHmac('sha1',secret).update(password).digest('hex');
}


function expiresIn(numDays){
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
