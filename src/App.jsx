import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConditionsPage from './pages/ConditionsPage';
import BMIPage from "./pages/BMIPage";
import MentalHealth from './pages/MentalHealth';
import Meditate from './pages/meditate';
import BreathingCircle from './Advanced/meditation_app';
import './index.css';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className='navbar'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/conditions">Health Conditions</Link></li>
            <li><Link to="/bmi">BMI Calculator</Link></li>
            <li><Link to="/mentalhealth">Mental Health</Link></li>
            <li><Link to="/meditate">Meditate</Link></li>
            <li><Link to="/practice">Practice</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
          <form>
            <input className="search" type="text" placeholder="Search..." />
          </form>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="/bmi" element={<BMIPage />} />
          <Route path="/mentalhealth" element={<MentalHealth />} />
          <Route path='/meditate' element={<Meditate />} />
          <Route path="/meditation_app" element={<BreathingCircle/>} />
          <Route path="/practice" element={<div>Practice Page</div>} />
          <Route path='/search' element={<SearchPage />} /> {/* Use the new component */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;