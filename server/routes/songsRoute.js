const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const songsPath = path.join(__dirname, '../public/songs');

  fs.readdir(songsPath, (err, files) => {
    if (err) {
      return res.json({ message: 'Error reading songs folder' });
    }

    const songList = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));

    res.json(songList);
  });
});

router.get('/:songName', (req, res) => {
  const songName = req.params.songName;
  const songPath = path.join(__dirname, '../public/songs', `${songName}.json`);

  if (!fs.existsSync(songPath)) {
    return res.json({ message: 'Song not found' });
  }

  fs.readFile(songPath, 'utf8', (err, data) => {
    if (err) {
      return res.json({ message: 'Error reading song file' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
