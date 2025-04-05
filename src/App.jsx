import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConditionsPage from './pages/ConditionsPage';
import BMIPage from "./pages/BMIPage";
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <nav className='navbar'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/conditions">Health Conditions</Link>
            </li>
            <li>
              <Link to="/bmi">BMI Calculator</Link>
            </li>
          </ul>
          <form>
            <input className="search" type="text" placeholder="Search..." />
          </form>
          
          
          
        </nav>
      

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="/bmi" element={<BMIPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;