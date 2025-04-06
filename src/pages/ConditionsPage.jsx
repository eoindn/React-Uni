import React from 'react';
import HealthConditions from '../components/HealthConditions.jsx';
import Carousel from './Carousel.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Slide } from '@mui/material';

const slides = ["../images/health1.jpg", "../images/health2.jpg", "../images/health3.jpg", "../images/health4.jpg", "../images/health5.jpg"];



function ConditionsPage() {

  const settings = {
    dots : true,
    infinite : true,
    speed : 1500,
    slidesToShow : 1,
    slidesToScroll : 1,
    autoplaySpeed : 2000,
  };

  return(
    <main className='conditions'>
      <div className='max-w-lg'></div>
      <Slider 
        {...settings} 
        className="pics"
        slidesToShow={1}   
        slidesToScroll={1}
      >
        {slides.map((slide, index) => (
          <div key={index} className='slide'>
            <img 
              src={slide} 
              alt={`Slide ${index + 1}`} 
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                marginTop: "200px",
              }}
            />
          </div>
        ))}
      </Slider>
    </main>
  )
}

export default ConditionsPage;