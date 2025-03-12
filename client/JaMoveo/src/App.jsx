import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <h1>JaMoveo</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
