import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

  useEffect(() => {
   
    axios.get("http://localhost:5000/api/users/selected-song").then((res) => {
      if (res.data.song) {
        setSong(res.data.song);
        navigate("/live"); 
      }
    });

    const check = setInterval(() => {
      axios.get("http://localhost:5000/api/users/selected-song").then((res) => {
        if (res.data.song) {
          setSong(res.data.song);
          navigate("/live");
        }
      });
    }, 1000); 

    return () => clearInterval(check);
  }, [navigate]);

  return <h1>{song ? "Redirecting to Live Page..." : "Waiting for next song..."}</h1>;
}

export default MainPage;