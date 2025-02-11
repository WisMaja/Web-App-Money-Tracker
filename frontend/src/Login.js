import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
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
        body: JSON.stringify({ nickName: login, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Błąd logowania');
      }

      localStorage.setItem('token', data.token);
      navigate('/home', { state: { userId: data.userId } }); // Przekazanie userId do Home
    } catch (error) {
      setError(error.message);
    }

  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/guest'); // Pobiera ID Gościa z bazy
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Nie udało się zalogować jako gość');
      }
  
      localStorage.setItem('userId', data.id); // Zapisujemy ID użytkownika Gość
      navigate('/home', { state: { userId: data.id } });
  
    } catch (error) {
      console.error('Błąd logowania jako gość:', error);
    }
  };
  

  return (
    <div>
      <h2>Logowanie</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login:</label>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
        </div>
        <div>
          <label>Hasło:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="SubmitButton" onSubmit={handleSubmit}>Zaloguj się</button>
      </form>
      <p>Nie masz konta?</p>
      <button onClick={() => navigate('/register')} className="SubmitButton">Załóż konto</button>
      <button onClick={handleGuestLogin} className="SubmitButton">Zaloguj jako gość</button>
    </div>
  );
};

export default Login;
