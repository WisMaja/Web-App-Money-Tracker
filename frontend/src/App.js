import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} /> {/* Nowa ścieżka */}
        <Route path="/" element={<Login />} /> {/* Domyślnie kieruje na login */}
      </Routes>
    </Router>
  );
}

export default App;
