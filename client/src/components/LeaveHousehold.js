// packages
import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

// styles
import './LeaveHousehold.css';

// Functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';


const LeaveHousehold = ({match}) => {

  console.log(match)

  const [ leaveHousehold , setLeaveHousehold ] = useState(false);

  const userID = getSession('id');
  const houseID = getSession('houseID');
  let token = getSession('token').split('"');
  token = token[1];

  const toggleLeave = async () => {
    console.log('leave');

    const url = `/api/household/leaveHousehold/${userID}/${houseID}`;
    const leaveHouseResponse = await fetcher(url, 'DELETE', '', token);
    if(leaveHouseResponse.message === 'success'){
      setLeaveHousehold(true);
      // window.location.reload();
    }
  }

  if (leaveHousehold){
    return (<Redirect from={`${match.url}`} to={`/home/${userID}`} />);
    
  } else {
    return (
      <div id='Leave-Household-content'>
        <h2>Are you sure you want to leave? </h2>
        <button onClick={toggleLeave}>Yes!</button>
      </div>
    );
  }
  
}

export default LeaveHousehold;
