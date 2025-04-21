export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': 'dee0088be4msh686c72639dc0ff1p19596cjsn184d05ac3631', 
    },
  };
  
  export const fetchData = async (url, options) => {
    try {
      console.log(`Fetching data from: ${url}`);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status} for URL: ${url}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Data received from ${url}:`, data.length ? `${data.length} items` : data);
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      
      // return fallback data if needed
      if (url.includes('bodyPartList')) {
        return ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];
      }
      

      //error handling when api wasnt working properly
      if (url.toLowerCase().includes('deadlift') || url.toLowerCase().includes('dead lift')) {
        console.log('Providing fallback data for deadlift search');
        return [
          { 
            id: '0001', 
            name: 'Barbell Deadlift',
            bodyPart: 'back',
            target: 'lats', 
            equipment: 'barbell',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0002',
            name: 'Dumbbell Deadlift',
            bodyPart: 'back',
            target: 'spine',
            equipment: 'dumbbell',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0003',
            name: 'Sumo Deadlift',
            bodyPart: 'upper legs',
            target: 'glutes',
            equipment: 'barbell',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0004',
            name: 'Romanian Deadlift',
            bodyPart: 'upper legs',
            target: 'hamstrings',
            equipment: 'barbell',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0005',
            name: 'Trap Bar Deadlift',
            bodyPart: 'back',
            target: 'lats',
            equipment: 'trapbar',
            gifUrl: 'https://via.placeholder.com/200'
          }
        ];
      }
      
      // basic fallback for other exercises searches if api connection fails
      if (url.includes('exercises')) {
        return [
          { 
            id: '0001', 
            name: 'Barbell Deadlift',
            bodyPart: 'back',
            target: 'lats', 
            equipment: 'barbell',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0006',
            name: 'Push-up',
            bodyPart: 'chest',
            target: 'pectorals',
            equipment: 'body weight',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0007',
            name: 'Squat',
            bodyPart: 'upper legs',
            target: 'quads',
            equipment: 'body weight',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0008',
            name: 'Bench Press',
            bodyPart: 'chest',
            target: 'pectorals',
            equipment: 'barbell',
            gifUrl: 'https://via.placeholder.com/200'
          },
          {
            id: '0009',
            name: 'Pull-up',
            bodyPart: 'back',
            target: 'lats',
            equipment: 'body weight',
            gifUrl: 'https://via.placeholder.com/200'
          }
        ];
      }
      
      // default empty array if no specific fallback matches
      return [];
    }
  };


// 'dee0088be4msh686c72639dc0ff1p19596cjsn184d05ac3631'