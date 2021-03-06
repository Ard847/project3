// packages
import React, { useState, useEffect, useContext } from 'react';
// styles
import './UserProfile.css';
//font awesome packages
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Image
import person from '../images/person.png';
import house from '../images/house.png';
// functions
import fetcher from '../functions/fetcher';
import getSession from '../functions/getSession';
// hooks
import useGetImages from '../hooks/useGetImages';
// context
import MembersContext from '../context/MembersContext';
//cloudinary
import { Image } from 'cloudinary-react';

const UserProfile = ({refresh}) => {
  // hooks
  const currentImage = useGetImages();
  // console.log('currentImage =', currentImage);
  // variables
  let token = getSession('token').split('"');
  token = token[1];
  const userID = getSession('id');
  const houseID = getSession('houseID');

  const { refreshMembers } = useContext(MembersContext);

  // state
  const [userPreviewSource, setUserPreviewSource] = useState('');
  const [housePreviewSource, setHousePreviewSource] = useState('');
  const [imageIds, setImageIds] = useState('');
  const [colour, setColourInput] = useState('');
  const [colourUpdateSuccess, setColourUpdateSuccess] = useState(false);
  const [houseUpdateSuccess, setHouseUpdateSuccess] = useState(false);
  // console.log('housePreviewSource =', housePreviewSource);
  const uploadUserImage = async (base64EncodedImage) => {
    //console.log(base64EncodedImage);
    try {
      const url = '/api/images/upload/user';
      const body = {
        data: base64EncodedImage,
        id: userID,
      };
      const fetch = await fetcher(url, 'PUT', body, token);
      // console.log('fetch =', fetch);
      if (fetch.message === 'success'){
        // console.log('success');
        refreshMembers();
      }
    } catch (e) {
      console.log("error image", e);
    }
  };
  const uploadHouseImage = async (base64EncodedImage) => {
    //console.log(base64EncodedImage);
    try {
      const url = '/api/images/upload/house';
      const body = {
        data: base64EncodedImage,
        id: houseID,
      };
      const fetch = await fetcher(url, 'PUT', body, token);
      if (fetch.message === 'success'){
        refresh();
        setHouseUpdateSuccess(true);
        setTimeout(() => {
          setHouseUpdateSuccess(false);
        }, 3000);
      }
    } catch (e) {
      console.log("error image", e);
    }
  };
  const handleSubmitUserFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadUserImage(userPreviewSource);
  };
  const previewUserFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setUserPreviewSource(reader.result);
    };
  };

  const handleUserFileInputChange = (e) => {
    const file = e.target.files[0];
    previewUserFile(file);
  }

  const handleSubmitHouseFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadHouseImage(housePreviewSource);
  };

  const handleColourChangeSave = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(colour);
    const body = {colour: colour};
    const updateColourResponse = await fetcher(`api/user/colour/${userID}`, 'PUT', body, token);
    // console.log('updateColourResponse =', updateColourResponse);
    if(updateColourResponse.message === 'success'){
      setColourUpdateSuccess(true);
        setTimeout(() => {
          setColourUpdateSuccess(false);
        }, 3000);
    }
  }

  const previewHouseFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setHousePreviewSource(reader.result);
    };
  };

  const handleHouseFileInputChange = (e) => {
    const file = e.target.files[0];
    previewHouseFile(file);
  }

  const colourInputChange = (event) => {
    // console.log('event.target.value =', event.target.value);
    setColourInput(event.target.value);
  }

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetcher(`/api/images/household/${houseID}`, 'GET', '', token);
      // console.log('fetch images response =', response);
      setImageIds(response[0]);
    }
    fetchImages();
  }, [userID, token, houseID]);

  useEffect(() => {
    const fetchColour = async () => {
      const response = await fetcher(`/api/user/colour/${userID}`, 'GET', '', token);
      // console.log('response =', response);
      if(response.message === 'success'){
        setColourInput(response.colour);
        
      }
    }
    fetchColour();
  }, [userID, token ]);


  useEffect(() => {refreshMembers()}, [refreshMembers]);


  return (
    <div id='user-profile-content'>
      <article id='profile-1'>
        <h3> User Profile </h3>
        {(userPreviewSource !== '')
          ? (
            <img
              className='user-img'
              src={userPreviewSource}
              alt="user"
            />
          ) : (currentImage ?
            <Image
              key={userID}
              className='user-img'
              cloudName='dii2emagu'
              alt='placeholder'
              publicID={currentImage}
            />
            :
            <img
              className='user-img'
              src={person}
              alt="user"
            />
          )
        }
        <form className='profile-form' onSubmit={handleSubmitUserFile}>
          <input id='update-user-image' className="chooseFile" type="file" name="image" onChange={handleUserFileInputChange} hidden />
          <label className='hover' htmlFor='update-user-image' ><FontAwesomeIcon className="dash-icon" icon={faCamera} />Upload image</label>
          <button className='profile-image-btn' type="submit">Save Profile Image</button>
          <input
                  id='colour-update'
                  className="inputBox"
                  type='color'
                  onChange={colourInputChange}
                  value={colour}
                />
                <button className='profile-image-btn' onClick={handleColourChangeSave} >Save Profile Colour</button>
        </form>
      </article>
      <article id='profile-2'>
        <h3> House Profile </h3>
        {(housePreviewSource !== '')
          ? (
            <img
              className='household-img'
              src={housePreviewSource}
              alt="house"
            />
          ) : (imageIds ?
            <Image
              key={houseID}
              className='household-img'
              cloudName='dii2emagu'
              alt='placeholder'
              publicID={imageIds}
            />
            :
            <img
              className='household-img'
              src={house}
              alt="generic house"
            />
          )
        }
        <form className='profile-form' onSubmit={handleSubmitHouseFile}>
          <input id='update-household-image' className="chooseFile" type="file" name="image" onChange={handleHouseFileInputChange} hidden />
          <label htmlFor='update-household-image' ><FontAwesomeIcon className="dash-icon" icon={faCamera} />Upload Image</label>
          <button className='profile-image-btn' type="submit">Save House Image</button>
        </form>
        {colourUpdateSuccess && <p className='success text-centre'>Your Colour has been updated</p> }
        {houseUpdateSuccess && <p className='success text-centre'>Your House Image has been updated</p> }
      </article>
    </div>
  );
}
export default UserProfile;