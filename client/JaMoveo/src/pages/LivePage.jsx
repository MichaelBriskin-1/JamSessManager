import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './styles/LivePage.css';

const socket = io(import.meta.env.VITE_BACKEND_URL);

function LivePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const [songData, setSongData] = useState([]);
  const [songName, setSongName] = useState('');
  const songContainerRef = useRef(null);

  const role = localStorage.getItem('role');
  const instrument = localStorage.getItem('instrument');

  useEffect(() => {
    if (location.state?.songData) {
      console.log('Received songData:', location.state.songData);
      console.log('Received songName:', location.state.songName);
      setSongName(
        location.state.songName
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      );
      setSongData(location.state.songData);
      localStorage.setItem('songData', JSON.stringify(location.state.songData));
      localStorage.setItem('songName', JSON.stringify(location.state.songName));
    } else {
      const storedData = localStorage.getItem('songData');
      if (storedData) {
        setSongData(JSON.parse(storedData));
      }
    }

    socket.on('songUpdate', (newSong) => {
      if (newSong) {
        console.log('Received song update:', newSong);

        // Ensure correct updates
        setSongData(newSong.songData);
        setSongName(newSong.songName);

        // Store in localStorage for persistence
        localStorage.setItem('songData', JSON.stringify(newSong.songData));
        localStorage.setItem('songName', JSON.stringify(newSong.songName));
      } else {
        navigate('/main');
      }
    });

    socket.on('quitSong', () => {
      navigate('/main');
    });
  }, [location.state]);

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

  let lineWords = '';
  let lineChords = '';
  return songData ? (
    <div className="live-container">
      <h1 className="song-title">{songName}</h1>

      <div ref={songContainerRef} className="song-content">
        {songData.map((line, lineIndex) => {
          let lineWords = '';
          let lineChords = '';
          let chordPosition = 0; // Tracks the current position in the lineChords

          line.forEach((word) => {
            const wordLength = word.lyrics.length;
            let spacesToAdd = wordLength; // Default spacing

            if (word.chords) {
              // Ensure chords align above lyrics by adding required spaces
              const spaceDifference = Math.max(
                0,
                wordLength - word.chords.length
              );
              spacesToAdd = spaceDifference;

              // Add spaces to match alignment with lyrics
              lineChords += ' '.repeat(chordPosition) + word.chords;
            }

            // Append lyrics and move position forward
            lineWords += word.lyrics + ' ';
            chordPosition += wordLength + 1; // Move forward considering spaces
          });

          console.log(`Line ${lineIndex} Chords:`, lineChords);
          console.log(`Line ${lineIndex} Words:`, lineWords);

          return (
            <div key={lineIndex} className="song-line">
              {/* Chords line (only shown if not vocals) */}
              {instrument !== 'vocals' && (
                <div className="chords-line">{lineChords}</div>
              )}

              {/* Lyrics line */}
              <div className="lyrics-line">{lineWords}</div>
            </div>
          );
        })}
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
