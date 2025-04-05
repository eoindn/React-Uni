import React from 'react';

function HomePage() {
  return (
    <div className='title'>
      <div className="doctor-container">
        <img src='/images/doctors.jpg' alt='doctor' className='doctor'/>
        <div className='info_box'>
          <h2>Donaz Health and Wellbeing</h2>
          <p>Important details about your health and wellness journey. Supporting those from all backgrounds since 2019 providing free and comprehensive tailored health care and diagnostics</p>
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
    
    </div>
  );
}

export default HomePage;