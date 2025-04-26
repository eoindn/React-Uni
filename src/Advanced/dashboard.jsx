import React, { useState, useEffect } from 'react';
import { Bell, Droplet, Flame, Activity, Plus, Trash2, Check, X } from 'lucide-react';
import "../dash.css"

const HealthDashboard = () => {
  
  //set variables
  const[dailyData, setDailyData] = useSate({
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
      if(!NaN(value)){
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

  const tickmeds = (medId) => {
    setMeds(prev => prev.map(med=>
      med.id === medId ? {...med,takenToday:(true)} : med
    ));
  }

  const deleteMed = (medId) => {
    setMeds(prev =>(prev.filter(med.id !== medId)))
  }

  const reset = () => {
    dailyData({water:'',steps:'',calories:''});
    setMeds(prev => prev.map(med =>({...med, takenToday:(false)})));
  }


};
  
  export default HealthDashboard;



