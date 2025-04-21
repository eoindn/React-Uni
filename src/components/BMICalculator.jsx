import React, { useState } from 'react';
import '../index.css';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));
      
      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue < 25) {
        setCategory('Normal weight');
      } else if (bmiValue < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    }
  };

  // gt  name based on BMI category
  const getCategoryClass = () => {
    if (category === 'Underweight') return 'category-underweight';
    if (category === 'Normal weight') return 'category-normal';
    if (category === 'Overweight') return 'category-overweight';
    if (category === 'Obese') return 'category-obese';
    return '';
  };

  return (
    <div className="bmi-calculator">
      <div className="calculator-header">
        <h1>BMI Calculator</h1>
        <p>Check your Body Mass Index</p>
      </div>
      
      <div className="input-container">
        <div className="input-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label>Height (cm)</label>
          <input
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        
        <button onClick={calculateBMI}>
          Calculate BMI
        </button>
      </div>
      
      {bmi && (
        <div className="results">
          <h2>Your Results</h2>
          <div className="results-details">
            <p>Your BMI: <span className="bmi-value">{bmi}</span></p>
            <p>Category: <span className={getCategoryClass()}>{category}</span></p>
          </div>
        </div>
      )}
      
      <div className="bmi-info">
        <p>BMI Categories:</p>
        <ul>
          <li><span className="category-underweight">Underweight</span>: BMI less than 18.5</li>
          <li><span className="category-normal">Normal weight</span>: BMI 18.5 to 24.9</li>
          <li><span className="category-overweight">Overweight</span>: BMI 25 to 29.9</li>
          <li><span className="category-obese">Obese</span>: BMI 30 or higher</li>
        </ul>
      </div>
    </div>
  );
}

export default BMICalculator;