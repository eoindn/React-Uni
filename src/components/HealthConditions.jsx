import React from 'react';

function HealthConditions() {
  const conditions = [
    {
      name: 'Common Cold',
      description: 'A viral infection of the nose and throat.',
      advice: 'Rest, drink fluids, and use over-the-counter medications.',
    },
    {
      name: 'Flu',
      description: 'A contagious respiratory illness caused by influenza viruses.',
      advice: 'Rest, drink fluids, and consult a doctor if symptoms worsen.',
    },
  
  ];

  return (
    <ul>
      {conditions.map((condition, index) => (
        <li key={index}>
          <h3 className='condition'>{condition.name}</h3>
          <p className='cond_description'>{condition.description}</p>
          <p className='cond_advice'>Advice: {condition.advice}</p>
        </li>
      ))}
    </ul>
  );
}

export default HealthConditions;