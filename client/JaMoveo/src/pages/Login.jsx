import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  

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
