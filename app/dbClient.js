var mongoose = require('mongoose');
var models = require('../models/model');
var multer = require('multer'); // v1.0.5
var upload = multer();
var Promise = require('mpromise');
var promise = new Promise;

module.exports.addNote = (req,res,next) => {
  var note = new models.Note();
  note.content = req.body.content;
  note.created = new Date();
  note.updated = new Date();
  note.save(function(err,note){
    if(err){
      res.status(500).send(err);
    }
    else{
      res.status(200).send(note);
    }
  });
}

module.exports.getNotes = (req,res,next) => {
  //{amount:3000}
  var query = models.Note
                .find()
                .sort({'created':-1})
                .limit(parseInt(req.query.limit))
                .skip(parseInt(req.query.limit) * (parseInt(req.query.page)-1));

  query.exec(function(err,notes){
    if(err){
      res.status(500).send(err);
    }
    else{
      res.status(200).send(notes);
    }
  });
}

module.exports.getNoteById = (req,res,next) => {
  models.Note.findOne({_id:req.params.id},function(err,note){
    if(err){
      res.status(500).send(err);
    }
    else{
      res.status(200).send(note);
    }
  });
}

module.exports.updateNote = (req,res,next) => {
  models.Note.findByIdAndUpdate(req.params.id,
    {$set:{content:req.body.content,updated:new Date()}},
    {new:true},
    function(err,note){
      if(err){
        res.status(500).send(err);
      }
      else{
        res.status(200).send(note);
      }
  });
}

module.exports.deleteNote = (req,res,next) => {
  models.Note.findOneAndRemove({_id:req.params.id},function(err,note){
    if(err){
      res.status(500).send(err);
    }
    else{
      res.status(204).send("Deleted");
    }
  });
}
