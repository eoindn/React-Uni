import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9);

  // get current exercises based on pgination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

 
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  // reset hen exercises change
  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

 
  useEffect(() => {
    const fetchExercisesByBodyPart = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        try {
        
          exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        } catch (error) {
          console.error('Error fetching all exercises:', error);
          // sse exercises already in state as fallback
          return;
        }
      } else {
        try {
        
          exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        } catch (error) {
          console.error(`Error fetching exercises for ${bodyPart}:`, error);
          
         
          if (exercises.length > 0) {
            const filteredExercises = exercises.filter(ex => ex.bodyPart === bodyPart);
            
            if (filteredExercises.length > 0) {
              setExercises(filteredExercises);
              return;
            }
          }
          
          //empty array as fallback
          exercisesData = [];
        }
      }

      setExercises(exercisesData);
    };

    
    if (bodyPart) {
      fetchExercisesByBodyPart();
    }
  }, [bodyPart, setExercises]);

  return (
    <Box id="exercises" sx={{ mt: { lg: '110px' } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      
      {exercises.length > 0 ? (
        <>
          <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
            {currentExercises.map((exercise, index) => (
              <Box key={exercise.id || index} sx={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '10px',
                width: '300px',
                padding: '20px',
                margin: '10px',
                background: '#fff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <img 
                  src={exercise.gifUrl || '/api/placeholder/200/200'} 
                  alt={exercise.name} 
                  loading="lazy"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <Typography variant="h6" mt={2}>{exercise.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Body Part: {exercise.bodyPart}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Equipment: {exercise.equipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Target: {exercise.target}
                </Typography>
              </Box>
            ))}
          </Stack>
          
         
          {exercises.length > exercisesPerPage && (
            <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            </Stack>
          )}
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <Typography variant="h6" color="text.secondary">
            No exercises found. Try a different search term or body part.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Exercises;