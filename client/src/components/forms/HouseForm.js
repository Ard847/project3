// packages
import React, { useState } from 'react';
// styles
import './HouseForm.css';
//font awesome packages
import { faCamera, faSignInAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// images
import house from '../../images/house.png'
// functions 
import fetcher from '../../functions/fetcher';
import getSession from "../../functions/getSession";


const HouseForm = ({ userID, type }) => {
  // console.log('HouseForm, userID =', userID);
  // console.log('HouseForm, type =', type);

  let token = getSession('token').split('"');
  token = token[1];

  const [previewSource, setPreviewSource] = useState('');
  const [houseInput, setHouseInput] = useState('');
  // console.log('HouseForm, houseInput =', houseInput);
  const [houseCreated, setHouseCreated] = useState(false);
  const [houseJoined, setHouseJoined] = useState(false);

  const houseInputChange = (event) => {
    setHouseInput(event.target.value);
  }

  const createNewHousehold = async (base64EncodedImage) => {

    const url = `/api/household/createNew/${userID}`

    const createHouseholdResponse = await fetcher(url, 'POST', { name: houseInput, data: base64EncodedImage }, token);
    // console.log('createHouseholdResponse =', createHouseholdResponse);
    if (createHouseholdResponse.message === 'success') {
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
    const joinHouseholdResponse = await fetcher(url, 'POST', { householdID: houseInput }, token);
    // console.log('joinHouseholdResponse =', joinHouseholdResponse);
    if (joinHouseholdResponse.message === 'success') {
      setHouseJoined(true);
    }
  }

  //Image handlers
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    //if(!previewSource) return;
    uploadImage(previewSource)
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      createNewHousehold(base64EncodedImage);
    } catch (e) {
      console.log("error image", e);
    }
  }

  return (
    <form className='create-household'>
      {type === 'create' && (
        <div id='create-household'>
          {previewSource ? (
            <img
              className='household-img'
              src={previewSource}
              alt="chosen"
            />) : (
            <img
              className='household-img'
              src={house}
              alt='generic house'
            />
          )}
          <div className='file-upload'>
            <input id='create-household-input' className="chooseFile" type="file" name="image" onChange={handleFileInputChange} hidden />
            <label htmlFor='create-household-input' ><FontAwesomeIcon className="dash-icon" icon={faCamera} />Upload image</label>
          </div>
        </div>
      )}

      <input
        className='house-name'
        type='text'
        placeholder={
          type === 'create'
            ? 'Enter Household Name' : 'Enter Household ID'
        }
        onChange={houseInputChange}
      />

      {type === 'create' ? (

        <button className="user-btn" onClick={(e) => { handleSubmitFile(e); }} ><FontAwesomeIcon className="dash-icon" icon={faPlus} /> Create </button>

      ) : (
        <button onClick={joinExistingHousehold} ><FontAwesomeIcon className="dash-icon" icon={faSignInAlt} /> Join </button>
      )}

      {houseCreated && <p className='success text-centre'>Household created, go back to households to enter the manager. </p>}
      {houseJoined && <p className='success text-centre'>Household Joined, go back to households to enter the manager. </p>}
    </form>
  )

}

export default HouseForm;

