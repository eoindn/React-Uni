import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import BodyPart from "./BodyPart";

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    
    if (current) {
      if (direction === 'left') {
        current.scrollLeft -= 300;
      } else {
        current.scrollLeft += 300;
      }
    }
  };

  return (
    <Box position="relative" width="100%">
      <Button 
        sx={{
          bgcolor: '#fff',
          color: '#FF2625',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          minWidth: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '24px'
        }}
        onClick={() => scroll('left')}
      >
        &lt;
      </Button>
      
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '20px',
          scrollbarWidth: 'none', // firefox
          '&::-webkit-scrollbar': { display: 'none' }, // chrome, Sasafari
          msOverflowStyle: 'none' // IEEdge
        }}
      >
        {data && data.map((item) => (
          <Box
            key={item.id || item}
            itemID={item.id || item}
            title={item.id || item}
            m="0 20px"
          >
            <BodyPart 
              item={item} 
              bodyPart={bodyPart} 
              setBodyPart={setBodyPart} 
            />
          </Box>
        ))}
      </Box>
      
      <Button 
        sx={{
          bgcolor: '#fff',
          color: '#FF2625',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          minWidth: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '24px'
        }}
        onClick={() => scroll('right')}
      >
        &gt;
      </Button>
    </Box>
  );
};

export default HorizontalScrollBar;
