import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
const API_URL = import.meta.env.VITE_BACKEND_URL;

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('instrument', res.data.user.instrument);
      setCurrentUser(res.data.user);

      navigate('/main');
    } catch (error) {
      alert('Invalid username or password');
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <Link to={'/signup'}>
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default Login;
