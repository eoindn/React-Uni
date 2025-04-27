import React, { useState, useEffect } from 'react';
import { Bell, Droplet, Flame, Activity, Plus, Trash2, Check, X } from 'lucide-react';
import "../dash.css"
import { div } from 'framer-motion/client';
import { alignProperty } from '@mui/material/styles/cssUtils';

const HealthDashboard = () => {
  
  //set variables
  const[dailyData, setDailyData] = useState({
    waterIntake : 0, 
    calories: 0 , 
    steps : 0 ,
  })
  const[meds, setMeds] = useState([]);
  const[showMedForm, setShowMedFrom] = useState(false);
  const [newMedication , setNewMedication]= useState({
    name : '',
    time : '',
    dose:'',
    frequency: '',
  })

  //daily data unputs 
  const [quickInputs, setQuickInputs] = useState({
    water: '',
    calories: '',
    frequency: ''
  })


  //medicaiton reminders
  useEffect(() =>{
    const checkReminders = setInterval(() => {
      const now = new Date();
      const currentTime = now.getHours() + ':' + now.getMinutes().toString()
      meds.forEach(med => {
        if(med.time === currentTime && !med.takenToday){
          alert(`Time to take ${med.name} - ${med.dosage}`);
        }
      });

    },60000);
    return() => clearInterval(checkReminders);
  },[meds]);

  const handleQuickInput = (type) => {
    if (quickInputs[type]){
      const value = parseInt(quickInputs[type]);
      if(!isNaN (value)){
        setDailyData(prev =>({
          ...prev,
          [type === 'water' ? waterIntake : value] :prev[type === 'water' ? waterIntake : type] + value
        }));
        setQuickInputs(prev =>({...prev,[type]:''}))
      }
    }
  };

  const handlemedadd = (e) => {
    e.preventDefault();
    if(newMedication.name && newMedication.dose && newMedication.time){
      setmeds(prev => [...prev,{...newMedication, id: Date.now(),takenToday:false}]);
      setNewMedication({name:'',dose:'',time:'',frequency:''});
      setShowMedFrom:(false);
    }
  }

  const tickMeds = (medId) => {
    if(!medId){
        throw new Error("No medication id")
        return;
    }
    try{
        setmeds(prev=>{
            const checkMed = prev.some(med => med.id === medId);
            if(!checkMed){
                throw new Error(`medication id with id ${medId} not found`)
            }
            return prev.map(med=>
                med.id == medId ? {...med,takenToday:true} : med
            );
        });
    }catch(error){
        onsole.error("Couldnt mark medications as taken")
    }
        };
    

  const deleteMed = (medId) => {
    setMeds(prev =>(prev.filter(med.id !== medId)))
  }

  const reset = () => {
    dailyData({water:'',steps:'',calories:''});
    setMeds(prev => prev.map(med =>({...med, takenToday:(false)})));
  }




return(
  <div className='dashboard-container'>
    <div className='titl'>
      <h1>Personal Health Tracker</h1>
      <div className='title-divider'>
        <div className='card-container'>


          <div className='card'>
          <div className='icon-container green-icon-bg'>
            <Activity className='steps-icon ' size={24}/>
          </div>
            <h1>Steps</h1>
          
          <div className='input'>
            <label className='card-prompt'>Add steps</label>
            <div className='input-button'>
              <input
              type='number'
              value={quickInputs.steps}
              onChange={e => setQuickInputs({...quickInputs, steps : e.target.value})}
              placeholder='enter steps'
              />
              <button onClick={() => handleQuickInput('steps')}>Add</button>
              <div className='progress-container'>
                <div className='progress-bar steps-progress'
                style={{width:`${Math.min((dailyData.waterIntake / 10000) * 100,100)}%`}} 
                />
              </div>
              <div className='prog-label'>
                <p className='minimum-progress'>0</p>
                <p className='goal stepsgoal'>10000</p>
              </div>
          </div>
          </div>
          </div>
          


          <div className='card'>
          <div className='icon-container droplet-icon-bg'>
              <Droplet className='water-icon' size={24}/>
            </div>
            <h1>Water</h1>
            
            <div className='input'> 
              <label className='card-prompt'>Add water (ml)</label>
              <div className='input-button'>
                <input
                  type='number'
                  value={quickInputs.water}
                  onChange={e => setQuickInputs({...quickInputs, water: e.target.value})}
                  placeholder='Enter ml'/>
                <button className='button-s' onClick={() => handleQuickInput('water')}>Add</button>
                <div className='progress-container'>
                  <div className='progress-bar water-progress'
                  style={{width: `${Math.min((dailyData.waterIntake / 2000) * 100,100)}%` }}/>
                </div>
                <div className='prog-label'>
                  <p className='minimum-progress'>0ml</p>
                  <p className='goal water-goal'>3000</p>
                </div>
              </div>
          

            </div>
          </div>
          <div className='card'>
          <div className='icon-container flame-icon-bg'>
              <Flame className='calories-icon' size={24}/>
            </div>
            <h1>Calories</h1>
            
            <div className='input'>
              <label className='card-prompt'>Add calroies</label>
              <div className='input-button'>
                <input
                type='number'
                value={quickInputs.calories}
                onChange={e => setQuickInputs({...quickInputs, calories : e.target.value})}
                placeholder="Enter calories"
              />
              <button onClick={() => handleQuickInput('calories')}>Add</button>
              <div className='progress-container'>
                <div className='progress-bar calories-progress'
                style={{width:`${Math.min((dailyData.calories / 2500) * 100,100)}%`}}>

                </div>
                <div className='prog-label'>
                  <p className='minimum-progress'>0</p>
                  <p className='goal calorie-goal '>2500</p>
                </div>

                
              </div>
              </div>
            </div>
          </div>

       

        </div>
        <div className='card'>
        <div className='icon-container med-icon-bg'>
        <Bell className='med-icon' size={24}/>
      </div>
      <h1>Medications</h1>
      
      
      <div className='med-list'>
        {meds.length > 0 ? (
          meds.map(med => (
            <div key={med.id} className={`med-item ${med.takenToday ? 'taken' : ''}`}>
              <div className='med-info'>
                <h3>{med.name}</h3>
                <p>{med.dose} - {med.time}</p>
              </div>
              <div className='med-actions'>
                <button 
                  onClick={() => tickMeds(med.id)}
                  disabled={med.takenToday}
                  className={med.takenToday ? 'btn-taken' : 'btn-take'}
                >
                  {med.takenToday ? <Check size={16} /> : 'Take'}
                </button>
                <button onClick={() => deleteMed(med.id)} className='btn-delete'>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='no-meds'>No medications added yet</p>
        )}
      </div>
      
      <div className='med-controls'>
        <button onClick={() => setShowMedFrom(true)} className='btn-add-med'>
          <Plus size={16} /> Add Medication
        </button>
      </div>
      
      {showMedForm && (
        <div className='med-form'>
          <form onSubmit={handlemedadd}>
            <div className='form-group'>
              <label>Medication Name</label>
              <input 
                type='text'
                value={newMedication.name}
                onChange={e => setNewMedication({...newMedication, name: e.target.value})}
                placeholder='Enter medication name'
                required
              />
            </div>
            <div className='form-group'>
              <label>Dosage</label>
              <input 
                type='text'
                value={newMedication.dose}
                onChange={e => setNewMedication({...newMedication, dose: e.target.value})}
                placeholder='Enter dosage'
                required
              />
            </div>
            <div className='form-group'>
              <label>Time</label>
              <input 
                type='time'
                value={newMedication.time}
                onChange={e => setNewMedication({...newMedication, time: e.target.value})}
                required
              />
            </div>
            <div className='form-group'>
              <label>Frequency</label>
              <select
                value={newMedication.frequency}
                onChange={e => setNewMedication({...newMedication, frequency: e.target.value})}
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="twice">Twice Daily</option>
                <option value="asneeded">As Needed</option>
              </select>
            </div>
            <div className='form-actions'>
              <button type='submit' className='btn-submit'>Add</button>
              <button type='button' onClick={() => setShowMedFrom(false)} className='btn-cancel'>
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>

      </div>
    </div>
  </div>
);
}

  
  export default HealthDashboard;





