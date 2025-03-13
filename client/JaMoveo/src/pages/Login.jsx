import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/users/login', {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate(res.data.user.role === "admin" ? "/main/admin" : "/main");
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
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
      <button>Login</button>
      <Link to={'/signup'}>
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default Login;
