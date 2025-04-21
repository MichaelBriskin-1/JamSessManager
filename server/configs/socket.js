const { Server } = require('socket.io');

let io; 
let selectedSong = null;
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
      methods: ['GET', 'POST'],
    },
  });
  console.log('CORS Allowed Origins:', process.env.FRONTEND_URL, 'http://localhost:5173');


  io.on('connection', (socket) => {
    console.log('A user connected!');
    // socket.emit('songUpdate', selectedSong);

    socket.on('quitSong', () => {
      selectedSong = null;
      io.emit('quitSong');
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO };
