// packages
import React, { useState } from 'react';

// styles
import './HouseForm.css';


const HouseForm = ({ userID, type }) => {
  // console.log('HouseForm, userID =', userID);
  // console.log('HouseForm, type =', type);

  const [houseInput, setHouseInput] = useState('');

  // console.log('HouseForm, houseInput =', houseInput);

  const houseInputChange = (event) => {
    setHouseInput(event.target.value);
  }

  const createNewHousehold = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // console.log('createNewHousehold');
    const url = `/api/household/createNew/${userID}`;
    fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        name: houseInput,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const joinExistingHousehold = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('joinExistingHousehold');
    const url = `/api/household/join/${userID}`;
    fetch(url, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        householdID: houseInput,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

    </form>
  )

}

export default HouseForm;