import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = ({ updateBalance }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount) && description && date) {
      const expenseAmount = parseFloat(amount);
      updateBalance(-expenseAmount); 
      setAmount('');
      setDescription('');
      setDate('');
      navigate('/'); 
    }
  };

  return (
    <div>
      <h2>Dodaj wydatek</h2>
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
        <button type="submit">Dodaj wydatek</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
