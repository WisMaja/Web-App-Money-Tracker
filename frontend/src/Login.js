import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', 
      {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Błąd logowania');
      }

      localStorage.setItem('token', data.token);
      navigate('/home'); // Przekierowanie do panelu użytkownika
    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <div>
      <h2>Logowanie</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Hasło:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
      <p>Nie masz konta?</p>
      <button onClick={() => navigate('/register')}>Załóż konto</button>
    </div>
  );
};

export default Login;
