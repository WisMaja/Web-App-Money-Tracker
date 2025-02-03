import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [startingBalance, setStartingBalance] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const requestBody = {
    nickName: nickName,
    password : password,
    email: email.trim() === '' ? null : email,
    firstName: firstName.trim() === '' ? null : firstName,
    lastName: lastName.trim() === '' ? null : lastName,
    balance: startingBalance
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Hasła nie są zgodne');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Rejestracja nie powiodła się');
      }
      
      navigate('/login', { state: { message: 'Rejestracja udana! Zaloguj się.' } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
    <h2>Rejestracja</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
    <div className="container">

      <div className="Obowiazkowe">
        <h2>Obowiązkowe pola</h2>
        <div>
          <label>Login</label>
          <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} required/>
        </div>
        <div>
          <label>Hasło:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Potwierdź hasło:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        </div>
      
        <div className= "Nieobowiazkowe">
        <h2>Nieobowiazkowe pola</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Imie</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div>
          <label>Nazwisko</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div>
          <label>Balans na start:</label>
          <input 
            type="number" 
            value={startingBalance} 
            onChange={(e) => setStartingBalance(Number(e.target.value))} 
            required 
          />
        </div>
        </div>

    </div>
    <br/>
    <button type="submit" className="SubmitButton" onSubmit={handleSubmit}>Zarejestruj się</button>
    </form>
    </div>

  );
};

export default Register;
