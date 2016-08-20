var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var db = require('./queries/exports');
var path = require('path');

var PORT;

if (process.env.PORT) {
  PORT = process.env.PORT;
} else if (process.env.NODE_ENV === 'test') {
  PORT = 3131;
} else {
  PORT = 3000;
}

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var connectionManager = require('./socket/socket')(io);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));

app.use(function(req, res, next){
  console.log(`${req.method} ${req.url}`);
  if (Object.keys(req.body).length) console.log(`data: ${JSON.stringify(req.body)}`)
  next();
});

// add a reference to the socket connection manager to each request
app.use(function(req, res, next) {
  req.connectionManager = connectionManager;
  next();
});


// ******************* AVAILABLE ******************* //

app.post('/api/available/:authID', db.setAvailability);

// **************** ADVANCED SEARCH **************** //

app.post('/api/advanced-search', db.advancedSearch);

// **************** INSTANT SESSIONS *************** //

app.get('/api/instantsessions/student/:authID', db.getStudentRequests);
app.get('/api/instantsessions/teacher/:authID', db.getTeacherRequests);
app.post('/api/instantsessions', db.requestInstantSession);
app.delete('/api/instantsessions/:studentID/:teacherID', db.cancelStudentRequest);
app.delete('/api/instantsessions/:authID', db.cancelStudentRequests);

// ******************** LEARNING ******************* //

app.get('/api/learning', db.getLearning);
app.get('/api/learning/:id', db.findSubjectsByUser);
app.post('/api/learning', db.learningSubject);
app.put('/api/learning', db.levelUp);
app.put('/api/learning', db.levelUp);
app.delete('/api/learning/:userID/:subjectID', db.removeSubjectByUser);

// ********************* REVIEWS ******************* //

app.post('/api/reviews', db.addReview);

// ******************** SESSIONS ******************* //

app.get('/api/sessions/student/:id', db.getAppointmentsByStudent);
app.get('/api/sessions/teacher/:id', db.getAppointmentsByTeacher);
app.post('/api/sessions', db.addAppointment);
app.put('/api/sessions/:sessionid', db.confirmAppt);
app.delete('/api/sessions/:sessionid', db.removeAppt);

// ******************** SUBJECT ******************** //

app.get('/api/subject', db.getAllSubjects);
app.get('/api/subject/:id', db.getTeachersForSubject);
app.post('/api/subject', db.createSubject);
app.delete('/api/subject/:id', db.removeSubject);

// ******************** TEACHERS ******************* //

app.get('/api/teachers', db.getAllTeachers);
app.get('/api/teachers/:id', db.getTeachersInfo);
app.put('/api/teachers/rate/', db.updateRate);

// ******************** TEACHING ******************* //

app.get('/api/teaching', db.getTeaching);
app.get('/api/teaching/:id', db.getSubjectForTeacher);
app.post('/api/teaching', db.teachingSubject);
app.post('/api/teaching/:authID', db.insertTeacher);

// ********************** USERS ********************* //

app.get('/api/users', db.getAllUsers);
app.get('/api/users/:authID', db.getSingleUser);
app.post('/api/users', db.createUser);
app.post('/api/users/:authID', db.setAuthID);
app.put('/api/users/:authID', db.updateUser);
app.delete('/api/users/:authID', db.removeUser);

// serve `index.html` to all unmatched routes as a failsafe, to account for
// html5 pushstate. it would be better to only do this for valid routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

server.listen(PORT, function() {
  console.log("So many tacos here on " + PORT);
});

module.exports = app;
