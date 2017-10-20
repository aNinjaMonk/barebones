var express = require('express');
var router = express.Router();
var path = require('path');
var constant = require('../app/constant');
var app = require('../app/app');
var auth = require('./auth');

var databaseUri = process.env.DATABASE_URI || constant.DATABASE_URI;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

/* GET home page. */

router.post('/login',auth.login);
router.post('/signup',auth.signup);
router.post('/logout',auth.logout);

router.get('/v1/note',app.db.getNotes);
router.get('/v1/note/:id',app.db.getNoteById);
router.post('/v1/note',app.db.addNote);
router.put('/v1/note/:id',app.db.updateNote);
router.delete('/v1/note/:id',app.db.deleteNote);

module.exports = router;
