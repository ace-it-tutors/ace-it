function wrapSocket(socket) {
  socket.meta = {
    sessionID: null,
    userID: socket.handshake.query.userID,

    getUserID: function() {
      return socket.meta.userID;
    },

    getCurrentSessionID: function() {
      return socket.meta.sessionID;
    },

    setCurrentSessionID: function(sessionID) {
      socket.meta.sessionID = sessionID;
    },

    clearCurrentSessionID: function() {
      socket.meta.setCurrentSessionID(null);
    }
  };
}

module.exports = wrapSocket;
