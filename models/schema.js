var Schema = require('mongoose').Schema;

var noteSchema = new Schema({
  content : String,
  created : Date,
  updated : Date
});
var userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: String
});
module.exports = {noteSchema,userSchema};
