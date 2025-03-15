const express = require('express');
const fs = require('fs');
const { getIO } = require('../configs/socket');

const path = require('path');
const cwd = process.cwd();

const router = express.Router();
const songsPath = path.join(cwd, './songs');

const getAllSongs = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(songsPath, (err, files) => {
      if (err) {
        return reject('Error reading songs folder');
      }

      const songList = files
        .filter((file) => file.endsWith('.json'))
        .map((file) => file.replace('.json', '').replace('_', ' '));

      resolve(songList);
    });
  });
};

router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.query ? req.query.query.toLowerCase() : '';
    const songsList = await getAllSongs();

    const matchingSongs = songsList.filter((songTitle) =>
      songTitle.toLowerCase().includes(searchQuery)
    );

    res.json(matchingSongs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs', error });
  }
});

router.get('/:searchSong', async (req, res) => {
  try {
    const searchSong = req.params.searchSong;
    const songsList = await getAllSongs();

    const matchingSongs = songsList.filter((songTitle) =>
      songTitle.toLowerCase().includes(searchSong)
    );

    res.json(matchingSongs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs', error });
  }
});

router.get('/select/:songName', async (req, res) => {
  try {
    const songName = decodeURIComponent(req.params.songName);
    const formattedSongName = songName.replace(' ', '_');
    const songPath = path.join(songsPath, `${formattedSongName}.json`);

    if (!fs.existsSync(songPath)) {
      return res.json({ message: 'Song not found' });
    }

    const songData = JSON.parse(fs.readFileSync(songPath, 'utf8'));

    const data = { "songData":songData,"songName": songName };
    // Emit the song data to all connected clients
    getIO().emit('songUpdate', data);

    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Invalid song request', error });
  }
});

module.exports = router;
