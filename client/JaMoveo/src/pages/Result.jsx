import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/Result.css';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(API_URL);

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    setSongList(location.state?.songList || []);
  }, [location.state]);

  const handleSelectSong = async (songName) => {
    try {
      const encodedSongName = encodeURIComponent(songName);
      const res = await axios.get(
        `${API_URL}/api/songs/select/${encodedSongName}`
      );

      if (res.data.message === 'Song not found') {
        alert('Song not found. Please try another.');
        return;
      }

      await axios.post(`${API_URL}/api/songs/select`, res.data);
      socket.emit('songUpdate', res.data);
      navigate('/livepage');
    } catch (error) {
      alert('Error selecting song.');
    }
  };
  return (
    <div className="results-container">
      <h1>Search Results</h1>

      <ul>
        {songList.map((song, index) => (
          <li
            key={index}
            className="song-item"
            onClick={() => handleSelectSong(song)}
          >
            <h3>{song}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsPage;
