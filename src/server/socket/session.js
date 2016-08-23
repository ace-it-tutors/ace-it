var _ = require('lodash');

// teacher and student are the relevant sockets
function Session(id) {
  this.id = id;
  this.teachers = [];
  this.students = [];
  this.messages = [];
}

Session.prototype.addStudent = function(student) {
  this.students.push(student);
};

Session.prototype.addTeacher = function(teacher) {
  this.teachers.push(teacher);
};

Session.prototype.leave = function(socket) {
  this.students = _.difference(this.students, [socket]);
  this.teachers = _.difference(this.teachers, [socket]);
};

Session.prototype.reconnect = function(oldSocket, newSocket) {
  var userID = newSocket.meta.getUserID();
  var replacer = socket => socket === oldSocket ? newSocket : socket;

  this.students = _.map(this.students, replacer);
  this.teachers = _.map(this.teachers, replacer);

  newSocket.meta.setCurrentSessionID(this.id);
  newSocket.emit('session-reconnect', this.getSessionData(userID));
};

Session.prototype.start = function(teacherID, studentID) {
  var data = {
    sessionID: this.id,
    teacherID: teacherID,
    studentID: studentID
  };
  this.emitToAll('session-start', data);
};

Session.prototype.emitMessage = function(message) {
  this.messages.push(message);
  this.emitToAll('session-message', message);
};

Session.prototype.emitToTeachers = function(event, data) {
  this.teachers.forEach(function(teacher) {
    teacher.emit(event, this.wrapData('teacher', data));
  }.bind(this));
};

Session.prototype.emitToStudents = function(event, data) {
  this.students.forEach(function(student) {
    student.emit(event, this.wrapData('student', data));
  }.bind(this));
};

Session.prototype.emitToAll = function(event, data) {
  this.emitToTeachers(event, data);
  this.emitToStudents(event, data);
};

Session.prototype.wrapData = function(role, data) {
  return {
    role,
    data,
    id: this.id
  };
};

Session.prototype.getSessionData = function(userID) {
  var studentID = this.students[0].meta.getUserID();
  var teacherID = this.teachers[0].meta.getUserID();

  return {
    sessionID: this.id,
    studentID: studentID,
    teacherID: teacherID,
    messages: this.messages
  };
};

module.exports = Session;
