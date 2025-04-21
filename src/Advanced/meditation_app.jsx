import { useState, useEffect } from 'react';
import '../index.css'; 


export default function BreathingCircle() {
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // breathing timing values
  const breathInTime = 4000; 
  const holdTime = 2000;
  const breathOutTime = 6000;
  const pauseTime = 2000; 



  
  
  // animation cycle
  useEffect(() => {
    if (isPaused) return;
    
    let timer;
    
    if (breathPhase === 'inhale') {
      // during inhale 
      timer = setTimeout(() => {
        setBreathPhase('hold');
      }, breathInTime);
    } 
    else if (breathPhase === 'hold') {
      // during hold 
      timer = setTimeout(() => {
        setBreathPhase('exhale');
      }, holdTime);
    }
    else if (breathPhase === 'exhale') {
      // during exhale 
      timer = setTimeout(() => {
        setBreathPhase('pause');
      }, breathOutTime);
    }
    else if (breathPhase === 'pause') {
      // during pause 
      timer = setTimeout(() => {
        setBreathPhase('inhale');
        setBreathCount(prev => prev + 1);
      }, pauseTime);
    }
    
    return () => clearTimeout(timer);
  }, [breathPhase, isPaused]);
  
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const animateText = () => {
    return !isPaused ? 'animate-circle-text' : '';
  };
  
  
  const getCircleClass = () => {
    if (isPaused) return 'breathing-circle paused';
    return `breathing-circle ${breathPhase}`;
  };
  
  // text instructions
  const getInstructionText = () => {
    if (isPaused) return "Paused";
    if (breathPhase === 'inhale') return "Breathe In";
    if (breathPhase === 'hold') return "Hold";
    if (breathPhase === 'exhale') return "Breathe Out";
    return "Pause";
  };
  
  return (
    <div className="breathing-container" id='app'>
      <h1 className="breathing-title">Breathing Meditation</h1>
      
      <div className="circle-container">
        {/* outer static circle which contains the breathing cirlce*/}
        <div className="outer-circle"></div>
        
        {/* animated breathing circle */}
        <div className={getCircleClass()}>
          <div className={`instruction-text ${animateText()}`}>{getInstructionText()}</div>
        </div>
      </div>
      
      <div className="breath-count">Breath count: {breathCount}</div>
      
      <button
        onClick={togglePause}
        className="control-button"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
      
      <div className="instructions">
        <p>4-2-6-2 Breathing Pattern:</p>
        <p>Inhale for 4 seconds, hold for 2 seconds,</p>
        <p>exhale for 6 seconds, pause for 2 seconds</p>
      </div>
    </div>
  );
}