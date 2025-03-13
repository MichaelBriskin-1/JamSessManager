import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.includes('admin');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');

  const handleSignup = async () => {
    if (!username || !password || !instrument) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', {
        username,
        password,
        instrument,
        role: isAdmin ? 'admin' : 'player',
      });
      console.log(res.data);
      // TO DO - ALERT FOR USERNAME ALREADY IN USE
      alert('User created successfully');
      navigate('/');
    } catch (error) {
      console.error(error.response?.data);
      alert('Error creating user');
    }
  };

  return (
    <div>
      <h2>{isAdmin ? 'Admin Signup' : 'Player Signup'}</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <select
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
      >
        <option value="">choose instrument</option>
        <option value="drums">drums</option>
        <option value="guitar">guitar</option>
        <option value="bass">bass</option>
        <option value="saxophone">saxophone</option>
        <option value="keyboard">keyboard</option>
        <option value="vocals">vocals</option>
      </select>
      <br />
      <button onClick={handleSignup}>{isAdminSignup ? "Create Admin Account" : "Create Player Account"}</button>
    </div>
  );
}

export default Signup;
