function initSocket(io) {
  io.on('connection', function(socket) {
    socket.emit('message', { hi: 'mom' });
  });
}

module.exports = initSocket;
