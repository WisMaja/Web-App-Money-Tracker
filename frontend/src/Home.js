import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3000/api/status', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(() => navigate('/login'));
  }, [navigate]);

  return (
    <div>
      <h2>Panel użytkownika</h2>
      <p>{message}</p>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Wyloguj</button>
    </div>
  );
}

export default Home;
