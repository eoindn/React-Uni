import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreathingCircle from "../Advanced/meditation_app";



function Meditate() {

    const navigate = useNavigate();

    const handleMeditateClick = () => {
        navigate("/meditation_app");
    };


    return (
        
      <div className="image_container_wrapper">
        <div className="image_container">
          <div className="image_placeholder left-image">
            <img className="med1_img" src="../images/MED.jpg" alt="Meditation"/>
            <div className="overlay">
              <button className="meditate_button" onClick={handleMeditateClick}>Meditate</button>
            </div>
          </div>
        </div>
        
        <div className="image_container">
          <div className="image_placeholder right-image">
            <img className="med2_img" src="../images/meditate2.jpg" alt="Meditation"/>
            <div className="overlay">
                <button className="meditate_button">Learn More
                    
                </button>
            </div>
          </div>
        </div>
      </div>
      
    );
  }

export default Meditate;