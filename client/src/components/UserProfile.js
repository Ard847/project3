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


const UserProfile = () => {
  const { members,refreshMembers,userImage,setUserImage } = useContext(MembersContext);
  // hooks
  const currentImage = useGetImages();
  // console.log('currentImage =', currentImage);

  // variables
  let token = getSession('token').split('"');
  token = token[1];
  const userID = getSession('id');
  const houseID = getSession('houseID');
  
  // state
  const [userPreviewSource, setUserPreviewSource] = useState('');
  const [housePreviewSource, setHousePreviewSource] = useState('');
  const [imageIds, setImageIds] = useState('');
  const [userImageUpdate,setUserImageUpdate] = useState(false);
  const [hasImageUser, sethasImageUser] = useState(true);
  const [houseImageUpdate,sethouseImageUpdate] = useState(false);
  const [hasImageHouse, sethasImageHouse] = useState(true);

  const uploadUserImage = async (base64EncodedImage) => {
    //console.log(base64EncodedImage);
    if(base64EncodedImage === ''){
      sethasImageUser(false);
      return;
    }
    sethasImageUser(true)
    
    try {
      const url = '/api/images/upload/user';
      const body = {
        data : base64EncodedImage,
        id: userID,
      };
      setUserImage((state) => !state);
      setUserImageUpdate(true)
      //window.location.reload();
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
    if(base64EncodedImage === ''){
      sethasImageHouse(false);
      return;
    }
    sethasImageHouse(true)
    try {
      const url = '/api/images/upload/house';
      const body = {
        data: base64EncodedImage,
        id: houseID,
      };
      sethasImageHouse(true)
      await fetcher(url, 'PUT', body, token);
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

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetcher(`/api/images/household/${userID}`, 'GET', '', token);
      setImageIds(response);
    }
    fetchImages();
  }, [userID, token]);

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
          ) : (currentImage !== null ?
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
          <input id='update-user-image' className="chooseFile" type="file" name="image" onChange={handleUserFileInputChange} hidden/>
          <label className='hover' htmlFor='update-user-image' ><FontAwesomeIcon className="dash-icon" icon={faCamera} />Upload image</label>
          <button className='profile-image-btn' type="submit">Save Profile Image</button>
          {hasImageUser && userImageUpdate && (<p className='success text-centre'>Your image was updated and this page will refresh</p>) }
          {hasImageUser === false &&  (<p className='error text-centre'>Please upload an image</p>) }
        </form>

      </article>
      <article id='profile-2'>
        <h3> House Profile </h3>

        {imageIds && (imageIds[0] === null || housePreviewSource !== '')
          ? (
            <img
              className='household-img'
              src={housePreviewSource === '' ? {house} :housePreviewSource}
              alt='generic house'
            />
          ) : (<Image
            cloudName='dii2emagu'
            publicId={imageIds && imageIds.length > 0 ? imageIds[0] : imageIds}
            className='household-img'
          />)}

        <form className='profile-form' onSubmit={handleSubmitHouseFile}>
          <input id='update-household-image' className="chooseFile" type="file" name="image" onChange={handleHouseFileInputChange} hidden/>
          <label htmlFor='update-household-image' ><FontAwesomeIcon className="dash-icon" icon={faCamera} />Upload Image</label>
          <button className='profile-image-btn' type="submit">Save House Image</button>
          {hasImageHouse && houseImageUpdate && (<p className='success text-centre'>Your house image was successfully updated</p>) }
          {hasImageHouse === false &&  (<p className='error text-centre'>Please upload an image</p>) }
        </form>
      </article>

    </div>
  );
}

export default UserProfile;