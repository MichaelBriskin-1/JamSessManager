import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(API_URL);
import './styles/MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [song, setSong] = useState(null);
  const [songSearch, setSongSearch] = useState('');
  const [songList, setSongList] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  
  const handleSearch = () => {
    if (!songSearch.trim()) 
      return;

    axios
      .get(`${API_URL}/api/songs/${songSearch}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSongList(res.data);
          console.log(`Songs List: ${songList}`);
        
          navigate('/result',{ state: { songList: res.data } });
        } else {
          alert("No songs found! Try a different search term."); // Show an alert
        }
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
        setSongList([]);
      });
    
  };

  const navigateToLive = (songObject) => {
    navigate('/livepage', { state: { songData: songObject.songData,songName: songObject.songName } });
  }

  socket.on("songUpdate", (songData) => {
    console.log("Received song update:", songData);
    navigateToLive(songData); // Call your function with the received data
  });


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

        </>
      ) : (
        <h2>Waiting for next song...</h2>
      )}
    </div>
  );
}

export default MainPage;
