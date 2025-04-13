import React from 'react';

function HomePage() {
  return (
    
    <div className='title'>
      
    <div className='doctor-container'>
    <h1 className='titlename'>St Marys Medical Services</h1>
    <h3 className='slogan'>For free and For all</h3>
      <img className='doctor' src="../images/doctor.jpeg" alt="Doctor"/>

      <div className='title-paragraph'>
        
      </div>
    </div>
      
      <div className='boxes'>
        <div className='box box_1'>
          <h3>Diagnostics</h3>
          <p>Comprehensive health screenings and tests</p>
        </div>
        <div className='box box_2'>
          <h3>Wellness</h3>
          <p>Personalized wellness plans and support</p>
        </div>
        <div className='box box_3'>
          <h3>Community</h3>
          <p>Resources and support for all backgrounds</p>
        </div>
      </div>
      
      <header>
       
      </header>
      <div className="additional-resources">
        <h3 className='extra-links-mental-h1'>Additional Resources</h3>
        <div className="extra-links-mental">
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
  );
}

export default HomePage;