// packages
import React, { useState } from 'react';

// styles
import './UserProfile.css';

// functions
import fetcher from '../functions/fetcher';
import getSession from '../functions/getSession';

// hooks
import useGetImages from '../hooks/useGetImages';

//cloudinary
import { Image } from 'cloudinary-react';


const UserProfile = () => {

  // hooks
  const currentImage = useGetImages().toString();
  console.log('currentImage =', currentImage);

  // variables
  let token = getSession('token').split('"');
  token = token[1];
  const userID = getSession('id');
  const houseID = getSession('houseID');

  // state
  const [userPreviewSource, setUserPreviewSource] = useState('');
  const [housePreviewSource, setHousePreviewSource] = useState('');
  // const [selectedFile, setSelectedFile] = useState('');
  // const [fileInputState, setFileInputState] = useState('');
  // console.log('previewSource =', previewSource);

  const uploadUserImage = async (base64EncodedImage) => {
    // console.log(base64EncodedImage);
    try {
      const url = '/api/images/upload/user';
      const body = {
        data: base64EncodedImage,
        id: userID,
      };
      await fetcher(url, 'PUT', body, token);
      //createNewHousehold(base64EncodedImage)
    } catch (e) {
      console.log("error image", e);
    }
  };

  const uploadHouseImage = async (base64EncodedImage) => {
    // console.log(base64EncodedImage);
    try {
      const url = '/api/images/upload/house';
      const body = {
        data: base64EncodedImage,
        id: houseID,
      };
      await fetcher(url, 'PUT', body, token);
      //createNewHousehold(base64EncodedImage)
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
          ) : (
            <Image
              key={userID}
              className='user-img'
              cloudName='dii2emagu'
              alt='placeholder'
              publicID={currentImage}
            />
          )
        }

        <form className='profile-form' onSubmit={handleSubmitUserFile}>
          <input type="file" name="image" onChange={handleUserFileInputChange} />
          <button className='profile-image-btn' type="submit">Save Profile Image</button>
        </form>

      </article>
      <article id='profile-2'>
        <h3> House Profile </h3>

        {(housePreviewSource !== '')
          ? (
            <img
              className='user-img'
              src={housePreviewSource}
              alt="house"
            />
          ) : (
            <img
              className='user-img'
              src=''
              alt='placeholder'
            />
          )
        }

        <form className='profile-form' onSubmit={handleSubmitHouseFile}>
          <input type="file" name="image" onChange={handleHouseFileInputChange} />
          <button className='profile-image-btn' type="submit">Save House Image</button>
        </form>
      </article>

    </div>
  );
}

export default UserProfile;