import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';

function App() {
  const [balance, setBalance] = useState(1000); 

  const updateBalance = (amount) => {
    setBalance(prevBalance => prevBalance + amount);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard balance={balance} />} />
        <Route path="/add-expense" element={<ExpenseForm updateBalance={updateBalance} />} />
        <Route path="/add-income" element={<IncomeForm updateBalance={updateBalance} />} />
      </Routes>
    </Router>
  );
}

export default App;
