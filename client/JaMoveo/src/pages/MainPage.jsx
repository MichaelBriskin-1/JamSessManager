import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function MainPage() {
  const navigate = useNavigate();
  const [song, setSong] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [instrument, setInstrument] = useState(
    localStorage.getItem('instrument')
  );
  const [songSearch, setSongSearch] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    axios.get('/songs.json').then((res) => {
      setSongs(res.data);
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
    if (!songSearch) return;
    setFilteredSongs(
      songs.filter(
        (song) =>
          song.title.toLowerCase().includes(songSearch.toLowerCase()) ||
          song.artist.toLowerCase().includes(songSearch.toLowerCase())
      )
    );
  };

  const handleSelectSong = async (song) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`localhost:5000/api/users/select-song`, {
        ...song,
        token,
      });

      alert(`Song selected: ${song.title}`);
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
