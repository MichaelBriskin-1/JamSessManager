import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', {
        username,
        password,
        instrument,
      });
      console.log(res.data);
      alert('User created successfully');
      navigate('/');
    } catch (error) {
      console.error(error.response?.data);
      alert('Error creating user');
    }
  };

  return (
    <div>
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
      <button onClick={handleSignup}>Create User</button>
    </div>
  );
}

export default Signup;
