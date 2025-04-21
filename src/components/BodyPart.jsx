import { Stack, Typography, Box } from "@mui/material";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? '4px solid #FF2625' : '',
        backgroundColor: '#fff',
        borderBottomLeftRadius: '20px',
        width: '200px',
        height: '210px',
        cursor: 'pointer',
        gap: '47px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        }
      }}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      }}
    >
     
      <Box 
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffebed',
          color: '#FF2625',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
      >
        {item.charAt(0).toUpperCase()}
      </Box>
      <Typography 
        fontSize="24px" 
        fontWeight="bold" 
        textTransform="capitalize"
        color="#3A1212"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;