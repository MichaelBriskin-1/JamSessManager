require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./configs/db');
const usersRoute = require('./routes/usersRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/users', usersRoute);

let selectedSong = null;
io.on('connection', (socket) => {
  console.log('A user connected!');

  socket.emit('songUpdate', selectedSong);

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

app.get('/api/users/selected-song', (req, res) => {
  res.json({ song: selectedSong });
});

app.post('/api/users/select-song', (req, res) => {
  const { title, artist, lyrics, chords } = req.body;
  if (!title || !artist || !lyrics) {
    return res.status(400).json({ message: 'Song data is incomplete' });
  }

  selectedSong = { title, artist, lyrics, chords };

  io.emit('songUpdate', selectedSong);

  res.json({ message: 'Song selected successfully', song: selectedSong });
});

server.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
