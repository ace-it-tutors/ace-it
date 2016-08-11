//require the modules that we need
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('./queries');
var path = require('path');
//initialize the app as an express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/users', db.getAllUsers);
app.get('/api/users/:authID', db.getSingleUser);
app.get('/api/subject', db.getAllSubjects);
app.get('/api/teaching/:id', db.getSubjectForTeacher);
app.get('/api/teaching', db.getTeaching);
app.get('/api/subject/:id', db.getTeachersForSubject);
app.post('/api/users', db.createUser);
app.post('/api/subject', db.createSubject);
app.post('/api/learning', db.learningSubject);
app.post('/api/teaching', db.teachingSubject);
app.post('/api/users/:authID', db.setAuthID);
app.put('/api/users/:authID', db.updateUser);
app.delete('/api/users/:id', db.removeUser);
app.post('/api/available/:authID', db.setAvailability);
app.get('/api/learning/:id', db.findSubjectsByUser);
app.delete('/api/learning/:userID/:subjectID', db.removeSubjectByUser);


app.use(express.static(__dirname + '/../dist'));

// serve `index.html` to all unmatched routes as a failsafe, to account for
// html5 pushstate. it would be better to only do this for valid routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, function() {
  console.log("So many tacos here on 3000");
});

module.exports = app;
