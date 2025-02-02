import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  //top bedzie potem na stronie Expenses.js
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  //to jest do Income
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!userId) {
      navigate('/login');
      return;
    }

    // Pobieranie danych użytkownika
    fetch(`http://localhost:3000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setMessage(`Witaj, ${data.nickName}!`))
      .catch(() => navigate('/login'));

    // Pobieranie balansu użytkownika
    fetch(`http://localhost:3000/api/users/balance/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setBalance(data))
      .catch(() => setBalance('Błąd pobierania balansu'));

    
    // Pobranie listy wydatków zobaczymy czy sie przyda
    fetch(`http://localhost:3000/api/expenses/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(() => console.error('Błąd pobierania wydatków'));


    // Pobranie listy przychodów
    fetch(`http://localhost:3000/api/incomes/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setIncomes(data))
      .catch(() => console.error('Błąd pobierania przychodów'));
    }, [navigate, userId]);
    

    const handleAddExpense = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
  
      const newExpense = {
        userId,
        category,
        amount: parseFloat(amount),
        date,
      };
  
      fetch('http://localhost:3000/api/expenses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExpense),
      })
        .then(response => response.json())
        .then(() => {
          setCategory('');
          setAmount('');
          setDate('');
          refreshData();})
        .catch(() => console.error('Błąd dodawania wydatku'));
    };

    const handleAddIncome = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
  
      const newIncome = {
        userId,
        source: incomeSource,
        amount: parseFloat(incomeAmount),
        date: incomeDate,
      };
  
      fetch('http://localhost:3000/api/incomes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newIncome),
      })
        .then(response => response.json())
        .then(() => {
          setIncomeSource('');
          setIncomeAmount('');
          setIncomeDate('');
          refreshData();
        })
        .catch(() => console.error('Błąd dodawania przychodu'));
    };

    const refreshData = () => {
      const token = localStorage.getItem('token');
  
      // Aktualizacja balansu
      fetch(`http://localhost:3000/api/users/balance/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => setBalance(data));
  
      // Aktualizacja listy wydatków
      fetch(`http://localhost:3000/api/expenses/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => setExpenses(data));
  
      // Aktualizacja listy przychodów
      fetch(`http://localhost:3000/api/incomes/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => setIncomes(data));
    };

    return (
      <div>
        <h2>Panel użytkownika {userId}</h2>
        <p>{message}</p>
        <p>Aktualny balans: {balance !== null ? `${balance} PLN` : 'Ładowanie...'}</p>
  
        {/* Formularz dodawania wydatku */}
        <h3>Dodaj wydatek</h3>
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            placeholder="Kategoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Kwota"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit">Dodaj wydatek</button>
        </form>
  
        {/* Formularz dodawania przychodu */}
        <h3>Dodaj przychód</h3>
        <form onSubmit={handleAddIncome}>
          <input
            type="text"
            placeholder="Źródło"
            value={incomeSource}
            onChange={(e) => setIncomeSource(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Kwota"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            required
          />
          <input
            type="date"
            value={incomeDate}
            onChange={(e) => setIncomeDate(e.target.value)}
            required
          />
          <button type="submit">Dodaj przychód</button>
        </form>
  
        {/* Lista wydatków */}
        <h3>Twoje wydatki</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.date} - {expense.category}: {expense.amount} PLN
            </li>
          ))}
        </ul>
  
        {/* Lista przychodów */}
        <h3>Twoje przychody</h3>
        <ul>
          {incomes.map((income) => (
            <li key={income.id}>
              {income.date} - {income.source}: {income.amount} PLN
            </li>
          ))}
        </ul>
  
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Wyloguj</button>
      </div>
    );
  }
export default Home;