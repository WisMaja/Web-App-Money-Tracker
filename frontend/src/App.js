import React, { useState } from 'react';
import './App.css';

function App() {
  // Definicja stanu do przechowywania tekstu
  const [message, setMessage] = useState('Witaj w aplikacji!');

  // Funkcja, która zmienia tekst po kliknięciu przycisku
  const changeMessage = () => {
    setMessage('Dziękujemy za kliknięcie!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <button onClick={changeMessage}>Kliknij mnie!</button>
      </header>
    </div>
  );
}

export default App;
