import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ balance }) => {
  return (
    <div className="dashboard">
      <h1>Stan konta: {balance} PLN</h1>
      <div>
        <Link to="/add-expense">
          <button>Dodaj wydatek</button>
        </Link>
      </div>
      <div>
        <Link to="/add-income">
          <button>Dodaj przychód</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
