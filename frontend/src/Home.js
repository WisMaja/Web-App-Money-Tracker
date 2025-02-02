import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  //top bedzie potem na stronie Expenses.js
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenceDate, setExpenceDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  //to jest do Income
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [incomes, setIncomes] = useState([]);

  //formatowanie daty
  const formatDate = (isoDate) =>
  {
    if (!isoDate) return '';

    const date = new Date(isoDate);
    return new
    Intl.DateTimeFormat('pl-PL').format( date);
  };

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
      .then(data => setMessage(`${data.nickName}`))
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
        date: expenceDate,
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
          setExpenceDate('');
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
      <div className = "window">
        <h2>Panel użytkownika  {message}</h2>
        <h1>Aktualny balans: {balance !== null ? `${balance} zł` : 'Ładowanie...'}</h1>
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Wyloguj</button>
      <div className = "container">
        {/* Formularz dodawania wydatku */}
        <div className="expenses">
        <h3>Dodaj wydatek</h3>
        <form onSubmit={handleAddExpense}>
          <div>
          Nazwa: 
          <input
            type="text"
            placeholder="Kategoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          </div>
          <div>
          Kwota: 
          <input
            type="number"
            placeholder="Kwota"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          </div>
          <div>
          Data: 
          <input
            type="date"
            value={expenceDate}
            onChange={(e) => setExpenceDate(e.target.value)}
            required
          />
          </div>
          <button type="submit" className="SubmitButton">Dodaj wydatek</button>
        </form>

        {/* Lista wydatków */}
        <h3>Twoje wydatki</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.category} | {expense.amount} zł | {formatDate(expense.date)} 
              <button>Edytuj</button> 
              <button>Usuń</button>
            </li>
          ))}
        </ul>
  
        </div>

        <div className = "incomes">
        {/* Formularz dodawania przychodu */}
        <h3>Dodaj przychód</h3>
        <form onSubmit={handleAddIncome}>
          <div>
          Nazwa: 
          <input
            type="text"
            placeholder="Źródło"
            value={incomeSource}
            onChange={(e) => setIncomeSource(e.target.value)}
            required
          />
          </div>
          <div>
            Kwota: 
            <input
            type="number"
            placeholder="Kwota"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            required
          />
          </div>
          <div>
            Data: 
            <input
            type="date"
            value={incomeDate}
            onChange={(e) => setIncomeDate(e.target.value)}
            required
          />
          </div>
          <button type="submit" className="SubmitButton">Dodaj przychód</button>
        </form>
  
        {/* Lista przychodów */}
        <h3>Twoje przychody</h3>
        <ul>
          {incomes.map((income) => (
            <li key={income.id}>
              {income.source} | {income.amount} zł | {formatDate(income.date)} 
              <button>Edytuj</button> 
              <button>Usuń</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
      </div>
    );
  }
export default Home;