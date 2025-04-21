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
        
        <div className="boxes">
          <div className="box box_1 hidden">
            <h3>Diagnostics</h3>
            <p>Comprehensive health screenings and tests</p>
          </div>
          <div className="box box_2 hidden">
            <h3>Wellness</h3>
            <p>Personalized wellness plans and support</p>
          </div>
          <div className="box box_3 hidden">
            <h3>Community</h3>
            <p>Resources and support for all backgrounds</p>
          </div>
        </div>
        
        <div className="vertical-space">
          <section className="hidden section-content">
            <h1 className="section-title">Your Medical Health</h1>
            <p className="section-description">We provide comprehensive medical services to everyone</p>
          </section>
          <section className="hidden section-content">
            <h1 className="section-title">Expert Doctors</h1>
            <p className="section-description">Our team consists of experienced medical professionals</p>
          </section>
          <section className="hidden section-content">
            <h1 className="section-title">Modern Facilities</h1>
            <p className="section-description">State-of-the-art equipment and comfortable environments</p>
          </section>
          <section className="hidden section-content">
            <h1 className="section-title">Patient Care</h1>
            <p className="section-description">Personalized attention and compassionate service</p>
          </section>
          <section className="hidden section-content">
            <h1 className="section-title">Community Support</h1>
            <p className="section-description">We're dedicated to improving community health outcomes</p>
          </section>
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