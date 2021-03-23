// packages
import React, { useState, useEffect } from 'react';

// styles
import './UserProfile';

// functions
import fetcher from '../functions/fetcher';
import getSession from '../functions/getSession';



const UserProfile = ({ }) => {

  // state
  const [selectedFile, setSelectedFile] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  let token = getSession('token').split('"');
  token = token[1];
  const userID = getSession('id');

  const uploadImage = async (base64EncodedImage) => {
    //console.log(base64EncodedImage)
    try {
      const url = '/api/images/upload';
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

  const handleSubmitFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadImage(previewSource);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  }

  return (
    <div id='user-profile'>
      <h3> user Profile</h3>

      {previewSource
        ? (
          <img
            className='user-img'
            src={previewSource}
            alt="chosen"
          />
        ) : (
          <img
            className='user-img'
            src=''
            alt="chosen"
          />
        )
      }

      <form onSubmit={handleSubmitFile}>
        <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} />
        <button type="submit">Save Profile Image</button>
      </form>
    </div>
  );
}

export default UserProfile;