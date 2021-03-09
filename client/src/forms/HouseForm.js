// packages
import React, { useState } from 'react';

// styles
import './HouseForm.css';


const HouseForm = ({userID, type}) => {
  console.log('HouseForm, userID =', userID);
  console.log('HouseForm, type =', type);

  const [ houseInput, setHouseInput ] = useState('');

  console.log('HouseForm, houseInput =', houseInput);

  const houseInputChange = (event) => {
    setHouseInput(event.target.value);
  }

  return(
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

          <input type='submit' />
    </form>
  )

}

export default HouseForm;