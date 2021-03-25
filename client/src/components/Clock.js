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

const Clock = ({day, time}) => {

  const [ date , setDate] = useState(new Date());
  const [ dayString, setDayString ] = useState('');

  const dateObject = new Date();
  const d = dateObject.getDate();
  const today = days[dateObject.getDay()]; 
  const month = months[dateObject.getMonth()];
  // const year = dateObject.getFullYear();
  // const h = dateObject.getHours();
  // const m = dateObject.getMinutes();
  // const s = dateObject.getSeconds(); 
  // console.log(day)
 
  const tick = () => {
    setDate(dateObject);
  }
  
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    
    return () => {clearInterval(timer)};
  });

  useEffect(() => {
    if(day){
      setDayString(`${today} ${d} ${month}`);
    }
  }, [day, today, d, month])

  // console.log('dayString =', dayString);

  return (
    <div className='clock-content'>
      <p><strong>{day && dayString} {time && date.toLocaleTimeString()}</strong></p>
    </div>
  )
}

export default Clock;
