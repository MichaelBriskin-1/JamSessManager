import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(API_URL);
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [song, setSong] = useState(null);
  const [songSearch, setSongSearch] = useState('');
  const [songList, setSongList] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/songs`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSongList(res.data);
        } else {
          console.error('Error: Expected an array but got', res.data);
          setSongList([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
        setSongList([]);
      });

    socket.on('songUpdate', (newSong) => {
      if (newSong) {
        setSong(newSong);
        navigate('/live');
      }
    });

    return () => {
      socket.off('songUpdate');
    };
  }, [navigate]);

  const handleSearch = () => {
    if (!songSearch.trim()) return;

    if (!Array.isArray(songList)) {
      console.error('handleSearch Error: songList is not an array', songList);
      return;
    }

    setFilteredSongs(
      songList.filter((songName) =>
        songName.toLowerCase().includes(songSearch.toLowerCase())
      )
    );
  };

  const handleSelectSong = async (songName) => {
    try {
      const res = await axios.get(`/songs/${songName}.json`);
      const songData = res.data;
      await axios.post(`${API_URL}/api/songs/select`, songData);
      alert(`Song selected: ${songData.title}`);
    } catch (error) {
      alert('Error selecting song');
    }
  };

  return (
    <div className="main-container">
      <h1>Main Page</h1>

      {role === 'admin' ? (
        <>
          <h2>Song Selection</h2>
          <input
            type="text"
            placeholder="Search for a song..."
            value={songSearch}
            onChange={(e) => setSongSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <ul>
            {filteredSongs.map((song, index) => (
              <li key={index}>
                <strong>{song.title}</strong> by {song.artist}
                <button onClick={() => handleSelectSong(song)}>Select</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2>Waiting for next song...</h2>
      )}
    </div>
  );
}

export default MainPage;
