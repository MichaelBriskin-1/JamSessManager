import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MainPage  from "./pages/MainPage";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <h1>JaMoveo</h1>
      <Routes>
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
