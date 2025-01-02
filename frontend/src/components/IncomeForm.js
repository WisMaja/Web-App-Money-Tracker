import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IncomeForm = ({ updateBalance }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount) && description && date) {
      const incomeAmount = parseFloat(amount);
      updateBalance(incomeAmount); 
      setAmount('');
      setDescription('');
      setDate('');
      navigate('/'); 
    }
  };

  return (
    <div>
      <h2>Dodaj przychód</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kwota:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Opis:</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Data:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Dodaj przychód</button>
      </form>
    </div>
  );
};

export default IncomeForm;
