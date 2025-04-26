import React, { useEffect } from 'react';
import '../HomePage.css';

function HomePage() {
  useEffect(() => {
    //  handle scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // clean up observer on component unmount
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-body">
      <div className="title">
        <div className="doctor-container">
          <h1 className="titlename">St Marys Medical Services</h1>
          <h3 className="slogan hidden">For free and For all</h3>
          <img className="doctor hidden" src="../images/doctor.jpeg" alt="Doctor" />
          <div className="title-paragraph hidden"></div>
        </div>
        
        
        
        
        <div className="additional-resources">
          <h3 className="extra-links-mental-h1 hidden">Additional Resources</h3>
          <div className="extra-links-mental hidden">
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">NHS</a></li>
              <li><a href="#">Finding a Therapist</a></li>
              <li><a href="#">Mental Health Apps</a></li>
              <li><a href="#">Health Support for young people</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;