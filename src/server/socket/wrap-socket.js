var _ = require('lodash');

function wrapSocket(socket) {
  socket.meta = {
    sessionID: null,

    getUserID: function() {
      return socket.handshake.query.userID;
    },

    getCurrentSessionID: function() {
      return socket.meta.sessionID;
    },

    setCurrentSessionID: function(sessionID) {
      socket.meta.sessionID = sessionID;
    }
  }

}

module.exports = wrapSocket;
