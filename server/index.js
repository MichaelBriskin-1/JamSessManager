require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
// const { Server } = require('socket.io');
const connectDB = require('./configs/db');
const usersRoute = require('./routes/usersRoute');
const { initializeSocket } = require('./configs/socket'); // Import the socket initializer
const songsRoute = require('./routes/songsRoute');

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

initializeSocket(server); // Initialize Socket.IO with the server
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.options(
  '*',
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use('/api/users', usersRoute);
app.use('/api/songs', songsRoute);

server.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
