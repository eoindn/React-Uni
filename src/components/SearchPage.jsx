import React, { useState } from 'react';
import Exercises from './Exercises';
import SearchExcersies from '../Advanced/SearchExercises'

const SearchPage = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <div>
      <SearchExcersies 
        setExercises={setExercises} 
        bodyPart={bodyPart} 
        setBodyPart={setBodyPart} 
      />
      <Exercises 
        exercises={exercises} 
        setExercises={setExercises} 
        bodyPart={bodyPart} 
      />
    </div>
  );
};

export default SearchPage;