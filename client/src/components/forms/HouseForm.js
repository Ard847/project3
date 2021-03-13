// packages
import React, { useState } from 'react';

// styles
import './HouseForm.css';

// functions 
import fetcher from '../../functions/fetcher';
import getSession from "../../functions/getSession";


const HouseForm = ({ userID, type }) => {
  // console.log('HouseForm, userID =', userID);
  // console.log('HouseForm, type =', type);

  const [houseInput, setHouseInput] = useState('');
  // console.log('HouseForm, houseInput =', houseInput);
  const [houseCreated, setHouseCreated] = useState(false);
  const [houseJoined, setHouseJoined] = useState(false);

  const houseInputChange = (event) => {
    setHouseInput(event.target.value);
  }


  const createNewHousehold = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let token = getSession('token').split('"')
    token = token[1]
    // console.log('createNewHousehold');
    const url = `/api/household/createNew/${userID}`;
    const createHouseholdResponse = await fetcher (url, 'POST', {name: houseInput},token);
    console.log('createHouseholdResponse =', createHouseholdResponse);
    if(createHouseholdResponse.message === 'success'){
      setHouseCreated(true);
    }
    
  }

  const joinExistingHousehold = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let token = getSession('token').split('"')
    token = token[1]
    // console.log('joinExistingHousehold');
    const url = `/api/household/join/${userID}`;
    const joinHouseholdResponse = await fetcher(url, 'POST', {householdID: houseInput},token);
    console.log('joinHouseholdResponse =', joinHouseholdResponse);
    if(joinHouseholdResponse.message === 'success'){
      setHouseJoined(true);
    }
  }

  return (
    <form>
      <label htmlFor='house-name'>{
        type === 'create'
          ? 'Household Name' : 'Household ID'
      }</label>
      <input
        id='house-name'
        type='text'
        placeholder={
          type === 'create'
            ? 'Enter Household Name' : 'Enter Household ID'
        }
        onChange={houseInputChange}
      />

      {type === 'create' ? (
        <button onClick={createNewHousehold} > Create </button>
      ) : (
        <button onClick={joinExistingHousehold} > Join </button>
      )}

      {houseCreated && <p>Household created, go back to households to enter the manager. </p>}
      {houseJoined && <p>Household Joined, go back to households to enter the manager. </p>}

    </form>
  )

}

export default HouseForm;