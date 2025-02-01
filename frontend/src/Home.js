import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setMessage(`Witaj, ${data.name}!`))
      .catch(() => navigate('/login'));
  }, [navigate, userId]);

  return (
    <div>
      <h2>Panel użytkownika {userId}</h2>
      <p>{message}</p>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Wyloguj</button>
    </div>
  );
}

export default Home;