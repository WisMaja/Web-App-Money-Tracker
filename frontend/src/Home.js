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

  //edytowanie expenses
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');

  //edytowanie income
  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [editedSource, setEditedSource] = useState('');
  const [editedAmountIncome, setEditedAmountIncome] = useState('');
  const [editedDateIncome, setEditedDateIncome] = useState('');
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

    //przyciski przychodów
    
    const handleDeleteIncome = (incomeId) => {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/api/incomes/${incomeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Błąd podczas usuwania przychodu');
          }
          return response.json();
        })
        .then(() => {
          setIncomes(incomes.filter(income => income.id !== incomeId));
          refreshData();
        })
        .catch(() => console.error('Błąd podczas usuwania przychodu'));
    };

    const handleEditIncome = (income) => {
      setEditingIncomeId(income.id);
      setEditedSource(income.source);
      setEditedAmountIncome(income.amount);
      setEditedDateIncome(income.date);
    };
  
    const handleSaveIncome = (incomeId) => {
      const token = localStorage.getItem('token');
      const updatedIncome = {
        source: editedSource,
        amount: parseFloat(editedAmountIncome),
        date: editedDateIncome,
      };
  
      fetch(`http://localhost:3000/api/incomes/${incomeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedIncome),
      })
        .then(response => response.json())
        .then(() => {
          setEditingIncomeId(null);
          refreshData();
        })
        .catch(() => console.error('Błąd podczas edytowania przychodu'));
    };

    //Przyciski wydatków

    const handleDeleteExpense = (expenseId) => {
      const token = localStorage.getItem('token');
    
      fetch(`http://localhost:3000/api/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Błąd podczas usuwania wydatku');
          }
          return response.json();
        })
        .then(() => {
          // Aktualizujemy stan po usunięciu wydatku
          setExpenses(expenses.filter(expense => expense.id !== expenseId));
          refreshData();
        })
        .catch(() => console.error('Błąd podczas usuwania wydatku'));
    };
    
    const handleEditExpense = (expense) => {
      setEditingExpenseId(expense.id);
      setEditedCategory(expense.category);
      setEditedAmount(expense.amount);
      setEditedDate(expense.date);
    };
    
    const handleSaveExpense = (expenseId) => {
      const token = localStorage.getItem('token');
    
      const updatedExpense = {
        category: editedCategory,
        amount: parseFloat(editedAmount),
        date: editedDate,
      };
    
      fetch(`http://localhost:3000/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      })
        .then(response => response.json())
        .then(() => {
          setEditingExpenseId(null); // Zakończenie edycji
          refreshData(); // Odświeżenie listy wydatków
        })
        .catch(() => console.error('Błąd podczas edytowania wydatku'));
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
            {editingExpenseId === expense.id ? (
              <>
                <input
                  type="text"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                />
                <input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                />
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
                <button onClick={() => handleSaveExpense(expense.id)}>Zapisz</button>
                <button onClick={() => setEditingExpenseId(null)}>Anuluj</button>
              </>
            ) : (
              <>
                {expense.category} | {expense.amount} zł | {formatDate(expense.date)}
                <button onClick={() => handleEditExpense(expense)}>Edytuj</button>
                <button onClick={() => handleDeleteExpense(expense.id)}>Usuń</button>
              </>
            )}
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
            {editingIncomeId === income.id ? (
              <>
                <input
                  type="text"
                  value={editedSource}
                  onChange={(e) => setEditedSource(e.target.value)}
                />
                <input
                  type="number"
                  value={editedAmountIncome}
                  onChange={(e) => setEditedAmountIncome(e.target.value)}
                />
                <input
                  type="date"
                  value={editedDateIncome}
                  onChange={(e) => setEditedDateIncome(e.target.value)}
                />
                <button onClick={() => handleSaveIncome(income.id)}>Zapisz</button>
                <button onClick={() => setEditingIncomeId(null)}>Anuluj</button>
              </>
            ) : (
              <>
                {income.source} | {income.amount} zł | {formatDate(income.date)}
                <button onClick={() => handleEditIncome(income)}>Edytuj</button>
                <button onClick={() => handleDeleteIncome(income.id)}>Usuń</button>
              </>
            )}
          </li>
        ))}
      </ul>
        </div>
      </div>
      </div>
    );
  }
export default Home;