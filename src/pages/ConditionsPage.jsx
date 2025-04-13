import React from 'react';
import HealthConditions from '../components/HealthConditions.jsx';
import Carousel from './Carousel.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Slide } from '@mui/material';

const slides = [
  {
    image: "../images/health1.jpg",
    link: "/pages/MentalHealth.jsx",
    text: "Learn about Diabetes Management"
  },
  {
    image: "../images/health2.jpg",
    link: "/condition/heart-disease",
    text: "Heart Disease Prevention"
  },
  {
    image: "../images/health3.jpg",
    link: "/MentalHealth",
    text: "Mental Health Resources"
  },
  {
    image: "../images/health4.jpg",
    link: "/condition/nutrition",
    text: "Nutrition & Wellness Tips"
  },
  {
    image: "../images/health5.jpg",
    link: "/condition/fitness",
    text: "Fitness Programs"
  }
];

function ConditionsPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };

  return (
    <main className="conditions">
      <div className="max-w-lg"></div>
      <Slider
        {...settings}
        className="pics"
        slidesToShow={1}
        slidesToScroll={1}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  marginTop: "200px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-60 px-6 py-4 rounded-lg">
                  <a
                    href={slide.link}
                    className="text-white text-2xl font-bold hover:text-blue-300 transition-colors"
                  >
                    {slide.text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </main>
  );
}

export default ConditionsPage;