var _ = require('lodash');
var Session = require('./session');

function ConnectionManager() {
  this.connections = {};
  this.sessions = {};

  _.each(ConnectionManager.prototype, function(method, name) {
    this[name] = method.bind(this);
  }.bind(this));
}

ConnectionManager.prototype.getConnection = function(id) {
  return this.connections[id];
};

ConnectionManager.prototype.setConnection = function(id, socket) {
  this.connections[id] = socket;
};

ConnectionManager.prototype.onConnect = function(socket) {
  var userID = socket.meta.getUserID();

  this.trySessionReconnect(socket);

  this.setConnection(userID, socket);
};

ConnectionManager.prototype.trySessionReconnect = function(newSocket) {
  var userID = newSocket.meta.getUserID();

  var oldSocket = this.getConnection(userID);
  if (!oldSocket) return;

  var sessionID = oldSocket.meta.getCurrentSessionID();
  var session = this.sessions[sessionID];
  if (!session) return;

  session.reconnect(oldSocket, newSocket);
};

ConnectionManager.prototype.onDisconnect = function(socket) {
  var userID = socket.meta.getUserID();
};

ConnectionManager.prototype.onSessionRequest = function(data) {
  var { teacherID, student } = data;
  var teacherSocket = this.getConnection(teacherID);

  if (teacherSocket) {
    teacherSocket.emit('session-request', {
      role: 'teacher',
      data: { student }
    });
  }
};

ConnectionManager.prototype.onSessionAccept = function(data) {
  var { teacherID, studentID } = data;
  var sessionID = Math.random().toString(36).substring(4, 9);
  var session = new Session(sessionID);
  this.sessions[sessionID] = session;

  var studentSocket = this.getConnection(studentID);
  var teacherSocket = this.getConnection(teacherID);

  studentSocket.meta.setCurrentSessionID(sessionID);
  teacherSocket.meta.setCurrentSessionID(sessionID);

  session.addStudent(studentSocket);
  session.addTeacher(teacherSocket);

  session.start(data.teacherID, data.studentID);
};

ConnectionManager.prototype.onSessionMessage = function(data) {
  var { sessionID, message } = data;
  var session = this.sessions[sessionID];
  session.emitMessage(message);
};

ConnectionManager.prototype.onSessionLeave = function(data) {
  var { sessionID, userID, name } = data;

  var session = this.sessions[sessionID];
  var leavingSocket = this.connections[userID];
  var message = {
    from: 'System',
    message: `${name} has left the session.`,
    announce: true
  };

  session.leave(leavingSocket);
  session.emitMessage(message);
};

ConnectionManager.prototype.syncTeacherSessionRequests = function(teacherID) {
  var socket = this.connections[teacherID]
  if (socket) socket.emit('session-requests-teacher-sync', teacherID);
};

ConnectionManager.prototype.syncStudentSessionRequests = function(studentID) {
  var socket = this.connections[studentID]
  if (socket) socket.emit('session-requests-student-sync', studentID);
};

module.exports = ConnectionManager;
