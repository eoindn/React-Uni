import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';

// fallback data in case the api doesn't return results
const fallbackExercises = [
  // some deadlift variations for dummy data
  { id: 'dl001', name: 'Barbell Deadlift', bodyPart: 'back', target: 'lats', equipment: 'barbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'dl002', name: 'Dumbbell Deadlift', bodyPart: 'back', target: 'spine', equipment: 'dumbbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'dl003', name: 'Sumo Deadlift', bodyPart: 'upper legs', target: 'glutes', equipment: 'barbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'dl004', name: 'Romanian Deadlift', bodyPart: 'upper legs', target: 'hamstrings', equipment: 'barbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'dl005', name: 'Trap Bar Deadlift', bodyPart: 'back', target: 'lats', equipment: 'trapbar', gifUrl: '/api/placeholder/200/200' },
  
  // same with squats
  { id: 'sq001', name: 'Bodyweight Squat', bodyPart: 'upper legs', target: 'quads', equipment: 'body weight', gifUrl: '/api/placeholder/200/200' },
  { id: 'sq002', name: 'Barbell Squat', bodyPart: 'upper legs', target: 'quads', equipment: 'barbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'sq003', name: 'Front Squat', bodyPart: 'upper legs', target: 'quads', equipment: 'barbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'sq004', name: 'Goblet Squat', bodyPart: 'upper legs', target: 'quads', equipment: 'dumbbell', gifUrl: '/api/placeholder/200/200' },
  
  //some with some other exercises
  { id: 'bp001', name: 'Bench Press', bodyPart: 'chest', target: 'pectorals', equipment: 'barbell', gifUrl: '/api/placeholder/200/200' },
  { id: 'pu001', name: 'Pull Up', bodyPart: 'back', target: 'lats', equipment: 'body weight', gifUrl: '/api/placeholder/200/200' },
  { id: 'pp001', name: 'Push Up', bodyPart: 'chest', target: 'pectorals', equipment: 'body weight', gifUrl: '/api/placeholder/200/200' },
  { id: 'lu001', name: 'Lunge', bodyPart: 'upper legs', target: 'quads', equipment: 'body weight', gifUrl: '/api/placeholder/200/200' },
];

// fallback body parts
const fallbackBodyParts = ['all', 'back', 'chest', 'upper legs', 'lower legs', 'arms', 'shoulders', 'cardio', 'waist'];

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState(['all']);
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all exercises and body parts when component loads
  useEffect(() => {
    const fetchExercisesData = async () => {
      setLoading(true);
      
      try {
        // get ll body parts from API
        let bodyPartsData;
        try {
          bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
          setBodyParts(['all', ...bodyPartsData]);
        } catch (error) {
          console.error('Error fetching body parts, using fallback:', error);
          setBodyParts(fallbackBodyParts);
        }
        
        // all exercises from API
        try {
          const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
          setAllExercises(exercisesData);
        } catch (error) {
          console.error('Error fetching exercises, using fallback:', error);
          setAllExercises(fallbackExercises);
        }
      } catch (error) {
        console.error('Unexpected error in fetchExercisesData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, []);

  // search bar functionality
  const handleSearch = () => {
    if (search) {
      console.log(`Searching for: ${search}`);
      setLoading(true);
      
      // first try API endpoint 
      const searchWithAPI = async () => {
        try {
          // try to use the name search endpoint
          const searchUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${search}`;
          console.log('Trying API endpoint:', searchUrl);
          
          const searchResults = await fetchData(searchUrl, exerciseOptions);
          
          if (searchResults && searchResults.length > 0) {
            console.log(`API returned ${searchResults.length} results`);
            setExercises(searchResults);
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('API search failed:', error);
          return false;
        } finally {
          setLoading(false);
        }
      };
      
      // fallback search using local data filtering
      const searchLocally = () => {
        console.log('Using local search with term:', search);
        const searchTerm = search.toLowerCase().trim();
        
        // filter exercises based on search term
        const filteredExercises = allExercises.filter(exercise => 
          exercise.name?.toLowerCase().includes(searchTerm) ||
          exercise.bodyPart?.toLowerCase().includes(searchTerm) ||
          exercise.target?.toLowerCase().includes(searchTerm) ||
          exercise.equipment?.toLowerCase().includes(searchTerm)
        );
        
        // if nothin happnens check fallback data
        if (filteredExercises.length === 0) {
          console.log('No results in existing data, checking fallback data');
          
          const fallbackResults = fallbackExercises.filter(exercise => 
            exercise.name?.toLowerCase().includes(searchTerm) ||
            exercise.bodyPart?.toLowerCase().includes(searchTerm) ||
            exercise.target?.toLowerCase().includes(searchTerm) ||
            exercise.equipment?.toLowerCase().includes(searchTerm)
          );
          
          console.log(`Found ${fallbackResults.length} results in fallback data`);
          setExercises(fallbackResults);
        } else {
          console.log(`Found ${filteredExercises.length} results locally`);
          setExercises(filteredExercises);
        }
        
        setLoading(false);
      };
      
      // try ap first  then fall back to local search if needed
      searchWithAPI().then(success => {
        if (!success) {
          searchLocally();
        }
      });
      
      setSearch('');
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="50px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>
      
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <Typography variant="h5" mb="20px">
          Filter by body part:
        </Typography>
        
        <div className="body-parts-container" style={{ display: 'flex', overflowX: 'auto', gap: '10px', padding: '10px 0' }}>
          {bodyParts.map((item) => (
            <Button
              key={item}
              onClick={() => {
                setBodyPart(item);
                
                // If "all" is selected show all exercises
                if (item === 'all') {
                  // api first
                  if (allExercises.length > 0) {
                    setExercises(allExercises);
                  } else {
                    // hardcode fallbacl
                    setExercises(fallbackExercises);
                  }
                } else {
                  // filter exercises by body part
                  const bodyPartExercises = allExercises.length > 0
                    ? allExercises.filter(ex => ex.bodyPart === item)
                    : fallbackExercises.filter(ex => ex.bodyPart === item);
                    
                  setExercises(bodyPartExercises);
                }
                
                window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
              }}
              style={{
                background: bodyPart === item ? '#ff2625' : '#fff',
                color: bodyPart === item ? '#fff' : '#000',
                textTransform: 'capitalize',
                minWidth: '100px',
                padding: '10px',
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              {item}
            </Button>
          ))}
        </div>
      </Box>
    </Stack>
  );
};

export default SearchExercises;