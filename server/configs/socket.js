const { Server } = require('socket.io');

let io; // Define io outside to be accessible in other modules
let selectedSong = null;
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
        },
    });

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
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIO };
