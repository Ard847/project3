// packages
import React, { useState } from 'react';

// styles
import './HouseForm.css';

// functions 
import fetcher from '../../functions/fetcher';


const HouseForm = ({ userID, type }) => {
  // console.log('HouseForm, userID =', userID);
  // console.log('HouseForm, type =', type);

  const [houseInput, setHouseInput] = useState('');
  // console.log('HouseForm, houseInput =', houseInput);

  const houseInputChange = (event) => {
    setHouseInput(event.target.value);
  }

  const createNewHousehold = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // console.log('createNewHousehold');
    const url = `/api/household/createNew/${userID}`;
    await fetcher (url, 'POST', {name: houseInput});
    
  }

  const joinExistingHousehold = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // console.log('joinExistingHousehold');
    const url = `/api/household/join/${userID}`;
    await fetcher(url, 'POST', {householdID: houseInput});
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