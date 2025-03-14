import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './LivePage.css';

const socket = io(import.meta.env.VITE_BACKEND_URL);


function LivePage() {
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const songContainerRef = useRef(null);

  const role = localStorage.getItem('role');
  const instrument = localStorage.getItem('instrument');

  useEffect(() => {
    socket.on('songUpdate', (newSong) => {
      if (newSong) {
        setSong(newSong);
      } else {
        navigate('/main');
      }
    });

    socket.on('quitSong', () => {
      navigate('/main');
    });

    return () => {
      socket.off('songUpdate');
      socket.off('quitSong');
    };
  }, [navigate]);

  useEffect(() => {
    let scrollInterval;
    if (isScrolling) {
      scrollInterval = setInterval(() => {
        if (songContainerRef.current) {
          songContainerRef.current.scrollBy({ top: 1, behavior: 'smooth' });
        }
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [isScrolling]);

  const handleQuit = () => {
    socket.emit('quitSong');
    navigate('/main');
  };

  return song ? (
    <div className="live-container">
      <h1 className="song-title">
        {song.title} - {song.artist}
      </h1>

      <div ref={songContainerRef} className="song-content">
        {song.map((line, lineIndex) => (
          <div key={lineIndex} className="song-line">
            {line.map((word, wordIndex) => (
              <span key={wordIndex} className="word">
                {instrument !== 'vocals' && word.chords && (
                  <span className="chords">{word.chords} </span>
                )}
                <span className="lyrics">{word.lyrics} </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <button
        className="scroll-button"
        onClick={() => setIsScrolling(!isScrolling)}
      >
        {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
      </button>

      {role === 'admin' && (
        <button className="quit-button" onClick={handleQuit}>
          Quit
        </button>
      )}
    </div>
  ) : (
    <h1 className="loading">Loading song...</h1>
  );
}

export default LivePage;
