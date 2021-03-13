// packages
import React, { useEffect, useState } from 'react';

// styles
import './Clock.css';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December",
];

const Clock = (date, time) => {

  const [ clockDate , setClockDate] = useState(new Date());
  const [ clockDay, setClockDay ] =  useState('');
  const [ clockTime, setClockTime]

  const dateObject = new Date();
  const d = dateObject.getDate();
  const day = days[dateObject.getDay()]; 
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  const h = dateObject.getHours();
  const m = dateObject.getMinutes();
  const s = dateObject.getSeconds(); 
  // console.log(day)
  let dateOutput = [];
  if(time){
    dateOutput.push(`${h}:${m}:${s}`);
  }

  const tick = () => {
    setDate(dateOutput);
  }
  
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);

    return () => {clearInterval(timer)};
  });


  return (
    <div className='clock-content'>
      <h4>{date.toLocaleString()}</h4>
    </div>
  )
}

export default Clock;
