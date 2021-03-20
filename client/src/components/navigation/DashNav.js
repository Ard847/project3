// packages
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher'

// styles
import './DashNav.css'

//cloudinary
import {Image} from 'cloudinary-react';

const DashNav = ({match, currentUser, toggelModal}) => {
  // console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);
const [fileInputState,setFileInputState] = useState('')
const [selectedFile, setSelectedFile] = useState('')
const [previewSource,setPreviewSource] = useState('')
const [imageIds,setImageIds] = useState()
const houseID = getSession('houseID')
const userID = getSession('id')
let token = getSession('token').split('"')
token = token[1]

// images handler ---------------------------------------------------------------
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
    //const reader = new FileReader();
   // reader.
  }

  const uploadImage = async (base64EncodedImage) => {
    
    console.log(base64EncodedImage)
    try{
      await fetcher('/api/images/upload','Post',{data :base64EncodedImage, id : houseID},token)
      //createNewHousehold(base64EncodedImage)
    }catch(e){
      console.log("error image",e)
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      console.log('here')
      const response = await fetcher(`/api/images/user/${houseID}&${userID}`,'Get','',token)
      console.log(response)
      setImageIds(response.currentUser)
      //const currentUser = await response.find( member => member === userID);
      //console.log(currentUser)
    } 
    fetchImages()
  },[])


  return (
    <nav id='dash-nav'>

      <div id='user-profile'>
        <h1>Here</h1>
    <form onSubmit = {handleSubmitFile}>
      {previewSource ? (
      <img
        className='user-img'
        src = {previewSource}
        alt = "chosen"
      />) : <Image
      key = {userID} 
      cloudName = 'dii2emagu'
      publicId = {imageIds}
      className='user-img'
    />}
                      
      <input type = "file" name = "image" onChange = {handleFileInputChange} value = {fileInputState}/>
      <button type= "submit">Create</button>
    </form>
        {
          (currentUser) &&
          (<p id='user-name' className='text-centre'>{`${currentUser.firstName} ${currentUser.lastName}`}</p>)
        }
      </div>

      <ul>
        <li className='nav-item'>
          <NavLink to={`${match.url}`}>Dashboard Home</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to={`${match.url}/task-manager`}>Task Manager</NavLink>
        </li>
        <li className='nav-item'>
          <button onClick={toggelModal}>Create Task</button>
        </li>
      </ul>
    </nav>
  )
}

export default DashNav;