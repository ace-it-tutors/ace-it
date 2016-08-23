var ConnectionManager = require('./connection-manager');
var wrapSocket = require('./wrap-socket');

var connectionManager = new ConnectionManager();

function initSocket(io) {
  io.on('connection', function(socket) {
    var userID = socket.handshake.query.userID;

    wrapSocket(socket);

    connectionManager.onConnect(socket);

    socket.on('disconnect', function() {
      connectionManager.onDisconnect(socket);
    });

    socket.on('session-request', connectionManager.onSessionRequest);
    socket.on('session-accept', connectionManager.onSessionAccept);
    socket.on('session-message', connectionManager.onSessionMessage);
    socket.on('session-leave', connectionManager.onSessionLeave);

    // tell the client to update their requests
    socket.emit('session-requests-student-sync', userID);
    socket.emit('session-requests-teacher-sync', userID);
  });

  return connectionManager;
}

module.exports = initSocket;
