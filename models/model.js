var mongoose = require('mongoose');
var url = "mongodb://admin:admin123@ds063546.mlab.com:63546/diary";
mongoose.connect(url);

var schema = require('./schema');

exports.Note = mongoose.model('Note',schema.noteSchema);
exports.User = mongoose.model('User',schema.userSchema);
